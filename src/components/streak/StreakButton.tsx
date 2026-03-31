import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flame, Zap } from 'lucide-react';
import { useStreakStore } from '@/store/streakStore';
import { useAuthStore } from '@/store';
import { cn } from '@/lib/utils';
import { StreakWidget } from '@/components/streak/StreakWidget';

export function StreakButton() {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const { currentStreak, hasCheckedInToday, initializeStreak } = useStreakStore();

  useEffect(() => {
    if (user) {
      initializeStreak(user.lastLogin, user.streakDays || 0);
    }
  }, [user, initializeStreak]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "gap-2 px-4 py-2 h-auto border-2 transition-all hover:scale-105",
            hasCheckedInToday 
              ? "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800" 
              : "border-red-300 bg-red-50 text-red-600 animate-pulse hover:bg-red-100"
          )}
        >
          <div className="relative">
            <Flame className={cn(
              "w-5 h-5",
              hasCheckedInToday ? "text-orange-500" : "text-red-500"
            )} />
            {!hasCheckedInToday && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            )}
          </div>
          <span className="font-bold text-lg">{currentStreak}</span>
          <span className="text-xs font-medium opacity-80 hidden sm:inline">
            {hasCheckedInToday ? 'Day Streak' : 'Claim!'}
          </span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-transparent">
        <div className="bg-white rounded-lg overflow-hidden">
          <StreakWidget inModal={true} onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}