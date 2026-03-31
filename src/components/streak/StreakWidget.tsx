import { useEffect } from 'react';
import { useStreakStore } from '@/store/streakStore';
import { useAuthStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Flame, LogIn, BookOpen, MessageCircle, Share2, Heart, CheckCircle2, Trophy, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const taskIcons: Record<string, React.ComponentType<{className?: string}>> = {
  'log-in': LogIn,
  'book-open': BookOpen,
  'message-circle': MessageCircle,
  'share-2': Share2,
  'heart': Heart,
};

const milestones = [
  { days: 3, reward: 'Bronze', bonusPoints: 50 },
  { days: 7, reward: 'Silver', bonusPoints: 100 },
  { days: 14, reward: 'Gold', bonusPoints: 250 },
  { days: 30, reward: 'Diamond', bonusPoints: 500 },
  { days: 100, reward: 'Legend', bonusPoints: 2000 },
];

interface StreakWidgetProps {
  inModal?: boolean;
  onClose?: () => void;
}

export function StreakWidget({ inModal = false, onClose }: StreakWidgetProps) {
  const { user } = useAuthStore();
  const { currentStreak, longestStreak, todayTasks, totalPointsToday, hasCheckedInToday, isLoading, initializeStreak, checkIn, completeTask } = useStreakStore();

  useEffect(() => {
    if (user && user.streakDays !== undefined) {
      initializeStreak(user.lastLogin || null, user.streakDays);
    }
  }, [user, initializeStreak]);

  const handleCheckIn = async () => {
    const result = await checkIn();
    if (result.success) {
      // Optional: toast notification here
      console.log(`Checked in! +${result.points} points`);
      if (inModal && onClose) {
        setTimeout(onClose, 800);
      }
    }
  };

  const handleTask = async (taskId: string) => {
    if (!hasCheckedInToday) {
      alert('Check in first to start earning points!');
      return;
    }
    const result = await completeTask(taskId);
    if (result.taskCompleted) {
      console.log(`Task completed! +${result.points} points`);
    }
  };

  const nextMilestone = milestones.find(m => m.days > currentStreak);
  const progress = nextMilestone ? (currentStreak / nextMilestone.days) * 100 : 100;
  const completedCount = todayTasks.filter(t => t.completed).length;

  return (
    <div className={cn("space-y-4", inModal && "p-0")}>
      <Card className={cn("border-orange-200 overflow-hidden shadow-xl", inModal && "border-none shadow-none")}>
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white relative">
          {inModal && (
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Flame className="w-12 h-12 text-yellow-300 drop-shadow-lg" />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-orange-700 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                  {currentStreak}
                </span>
              </div>
              <div>
                <CardTitle className="text-white text-2xl font-bold">
                  {currentStreak} Day Streak!
                </CardTitle>
                <p className="text-orange-100 text-sm mt-1">
                  Longest: {longestStreak} days • {totalPointsToday} pts today
                </p>
              </div>
            </div>
            
            {!hasCheckedInToday ? (
              <Button 
                onClick={handleCheckIn} 
                disabled={isLoading}
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-lg border-0"
              >
                {isLoading ? '...' : 'Claim +10'}
              </Button>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Claimed
              </div>
            )}
          </div>

          {nextMilestone && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex justify-between text-xs text-orange-100 mb-1">
                <span className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Next: {nextMilestone.reward}
                </span>
                <span>+{nextMilestone.bonusPoints} pts</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
              <div className="text-xs text-orange-200 mt-1 text-center">
                {nextMilestone.days - currentStreak} days to unlock
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              Today's Missions
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                {completedCount}/{todayTasks.length}
              </span>
            </h3>
            <span className="text-sm text-gray-500 font-medium">+{totalPointsToday} pts</span>
          </div>
          
          <Progress value={(completedCount / todayTasks.length) * 100} className="h-1.5 bg-gray-100" />

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {todayTasks.map((task) => {
              const Icon = taskIcons[task.icon] || CheckCircle2;
              const canComplete = hasCheckedInToday && !task.completed && task.type !== 'login';
              const isLoginTask = task.type === 'login';
              
              return (
                <div
                  key={task.id}
                  onClick={() => canComplete && handleTask(task.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border-2 transition-all",
                    task.completed 
                      ? "bg-green-50 border-green-200" 
                      : canComplete 
                        ? "bg-white border-gray-200 hover:border-orange-400 cursor-pointer active:scale-[0.98]"
                        : isLoginTask && !hasCheckedInToday
                          ? "bg-orange-50 border-orange-200 animate-pulse"
                          : "bg-gray-50 border-gray-100 opacity-60"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    task.completed 
                      ? "bg-green-500 text-white" 
                      : canComplete || (isLoginTask && !hasCheckedInToday)
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-200 text-gray-400"
                  )}>
                    {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={cn("font-bold text-sm", task.completed && "text-green-700")}>
                      {task.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{task.description}</p>
                  </div>

                  <div className="text-right">
                    <div className={cn(
                      "font-bold",
                      task.completed ? "text-green-600" : "text-orange-600"
                    )}>
                      +{task.points}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!hasCheckedInToday && (
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center text-sm text-orange-800">
              <Flame className="w-4 h-4 inline mr-1 animate-pulse" />
              Check in daily to keep your streak alive!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones */}
      <div className="grid grid-cols-5 gap-2 px-1">
        {milestones.map((m) => {
          const achieved = currentStreak >= m.days;
          return (
            <div key={m.days} className={cn(
              "flex flex-col items-center p-2 rounded-lg border transition-all",
              achieved
                ? "bg-gradient-to-b from-yellow-50 to-orange-50 border-orange-300 shadow-sm"
                : "bg-gray-50 border-gray-200 opacity-50 grayscale"
            )}>
              <div className="text-lg mb-0.5">{achieved ? '🔥' : '🔒'}</div>
              <div className="text-[10px] font-bold text-gray-900 leading-tight text-center">{m.days}d</div>
              <div className="text-[8px] text-gray-600 text-center leading-tight">{m.reward}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}