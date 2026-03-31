import type { StreakTask, StreakMilestone } from '@/types';

export const STREAK_TASKS = {
  LOGIN: { type: 'login' as const, title: 'Daily Login', points: 10, icon: 'log-in' },
  READ_ARTICLE: { type: 'read_article' as const, title: 'Read Article', points: 10, icon: 'book-open' },
  COMMENT: { type: 'comment' as const, title: 'Comment on Post', points: 15, icon: 'message-circle' },
  SHARE: { type: 'share' as const, title: 'Share Content', points: 5, icon: 'share-2' },
  REACT: { type: 'react' as const, title: 'Like/Upvote', points: 5, icon: 'heart' },
};

export const STREAK_MILESTONES: StreakMilestone[] = [
  { days: 3, reward: 'Bronze Streaker', bonusPoints: 50, badge: 'streak_bronze' },
  { days: 7, reward: 'Silver Streaker', bonusPoints: 100, badge: 'streak_silver' },
  { days: 14, reward: 'Gold Streaker', bonusPoints: 250, badge: 'streak_gold' },
  { days: 30, reward: 'Diamond Streaker', bonusPoints: 500, badge: 'streak_diamond' },
  { days: 100, reward: 'Legendary Mi Fan', bonusPoints: 2000, badge: 'streak_legend' },
];

export const getTodayTasks = (): StreakTask[] => {
  return [
    { id: '1', ...STREAK_TASKS.LOGIN, description: 'Open the app today', completed: false },
    { id: '2', ...STREAK_TASKS.READ_ARTICLE, description: 'Read any article for 30+ seconds', completed: false },
    { id: '3', ...STREAK_TASKS.COMMENT, description: 'Leave a comment on any post', completed: false },
    { id: '4', ...STREAK_TASKS.SHARE, description: 'Share a post with friends', completed: false },
    { id: '5', ...STREAK_TASKS.REACT, description: 'Like or upvote 3 posts', completed: false },
  ];
};

export const checkStreakStatus = (lastLogin: Date | null, currentStreak: number) => {
  if (!lastLogin) return { canCheckIn: true, newStreak: 1, streakBroken: false };
  
  const last = new Date(lastLogin);
  const now = new Date();
  
  const lastDate = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = todayDate.getTime() - lastDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return { canCheckIn: false, newStreak: currentStreak, streakBroken: false };
  } else if (diffDays === 1) {
    return { canCheckIn: true, newStreak: currentStreak + 1, streakBroken: false };
  } else {
    return { canCheckIn: true, newStreak: 1, streakBroken: true };
  }
};

export const getMilestoneProgress = (currentStreak: number) => {
  const nextMilestone = STREAK_MILESTONES.find(m => m.days > currentStreak);
  const lastMilestone = [...STREAK_MILESTONES].reverse().find(m => m.days <= currentStreak);
  
  return {
    nextMilestone,
    lastMilestone,
    progress: nextMilestone 
      ? (currentStreak / nextMilestone.days) * 100 
      : 100,
  };
};

export const checkMilestoneBonus = (newStreak: number): number => {
  const milestone = STREAK_MILESTONES.find(m => m.days === newStreak);
  return milestone ? milestone.bonusPoints : 0;
};

export const getWeeklyCalendar = (last7Days: boolean[]) => {
  const today = new Date();
  const calendar = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    calendar.push({
      date,
      completed: last7Days[6 - i] || false,
      points: last7Days[6 - i] ? 50 : 0, // Adjust points as needed
    });
  }
  
  return calendar;
};