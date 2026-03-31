import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import confetti from 'canvas-confetti';

interface StreakTask {
  id: string;
  type: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  icon: string;
}

interface StreakStore {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date | null;
  todayTasks: StreakTask[];
  totalPointsToday: number;
  isLoading: boolean;
  hasCheckedInToday: boolean;
  streakBroken: boolean;
  initializeStreak: (lastLogin: Date | null, currentStreak: number) => void;
  checkIn: () => Promise<{ success: boolean; points: number; bonusPoints: number; newStreak: number }>;
  completeTask: (taskId: string) => Promise<{ points: number; taskCompleted: boolean }>;
}

const getTodayTasks = (): StreakTask[] => [
  { id: '1', type: 'login', title: 'Daily Login', description: 'Open the app today', points: 10, completed: false, icon: 'log-in' },
  { id: '2', type: 'read_article', title: 'Read Article', description: 'Read any article', points: 10, completed: false, icon: 'book-open' },
  { id: '3', type: 'comment', title: 'Comment on Post', description: 'Leave a comment', points: 15, completed: false, icon: 'message-circle' },
  { id: '4', type: 'share', title: 'Share Content', description: 'Share a post', points: 5, completed: false, icon: 'share-2' },
  { id: '5', type: 'react', title: 'Like/Upvote', description: 'Like 3 posts', points: 5, completed: false, icon: 'heart' },
];

const checkStreakLogic = (lastLogin: Date | null, currentStreak: number) => {
  if (!lastLogin) return { canCheckIn: true, newStreak: 1, streakBroken: false };
  
  const last = new Date(lastLogin);
  const today = new Date();
  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return { canCheckIn: false, newStreak: currentStreak, streakBroken: false };
  } else if (diffDays === 1) {
    return { canCheckIn: true, newStreak: currentStreak + 1, streakBroken: false };
  } else {
    return { canCheckIn: true, newStreak: 1, streakBroken: true };
  }
};

export const useStreakStore = create<StreakStore>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastCheckIn: null,
      todayTasks: getTodayTasks(),
      totalPointsToday: 0,
      isLoading: false,
      hasCheckedInToday: false,
      streakBroken: false,

      initializeStreak: (lastLogin, currentStreak) => {
        const { canCheckIn, newStreak, streakBroken } = checkStreakLogic(lastLogin, currentStreak);
        const tasks = getTodayTasks();
        const hasCheckedInToday = lastLogin 
          ? new Date(lastLogin).toDateString() === new Date().toDateString()
          : false;
        
        if (hasCheckedInToday) {
          tasks[0].completed = true;
        }

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(get().longestStreak, newStreak),
          todayTasks: tasks,
          hasCheckedInToday,
          streakBroken,
          lastCheckIn: lastLogin,
        });
      },

      checkIn: async () => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const state = get();
        const { newStreak } = checkStreakLogic(state.lastCheckIn, state.currentStreak);
        const tasks = [...state.todayTasks];
        tasks[0].completed = true;

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastCheckIn: new Date(),
          todayTasks: tasks,
          hasCheckedInToday: true,
          totalPointsToday: state.totalPointsToday + 10,
          isLoading: false,
        });

        // Celebration confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff6b6b', '#ffa502', '#ff4757']
        });

        return { 
          success: true, 
          points: 10, 
          bonusPoints: 0, 
          newStreak 
        };
      },

      completeTask: async (taskId) => {
        const state = get();
        const task = state.todayTasks.find(t => t.id === taskId);
        
        if (!task || task.completed) {
          return { points: 0, taskCompleted: false };
        }

        await new Promise(resolve => setTimeout(resolve, 300));

        const updatedTasks = state.todayTasks.map(t => 
          t.id === taskId ? { ...t, completed: true } : t
        );

        set({
          todayTasks: updatedTasks,
          totalPointsToday: state.totalPointsToday + task.points,
        });

        return { 
          points: task.points, 
          taskCompleted: true 
        };
      },
    }),
    { 
      name: 'streak-storage',
      partialize: (state) => ({ 
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        lastCheckIn: state.lastCheckIn,
      })
    }
  )
);