import { useStreakStore } from '@/store/streakStore';
import { CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, subDays, isSameDay, isToday } from 'date-fns';

export function StreakCalendar() {
  const { lastCheckIn, currentStreak, hasCheckedInToday } = useStreakStore();
  
  // Generate last 6 days + today
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return date;
  });

  const getDayStatus = (date: Date) => {
    if (isToday(date)) {
      return hasCheckedInToday ? 'completed' : 'pending';
    }
    
    // Check if date is within streak range from lastCheckIn
    if (lastCheckIn && currentStreak > 0) {
      const lastCheckDate = new Date(lastCheckIn);
      const diffTime = lastCheckDate.getTime() - date.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays < currentStreak) {
        return 'completed';
      }
    }
    
    return 'missed';
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
      <h4 className="text-sm font-bold text-gray-700 mb-4 text-center">Last 7 Days</h4>
      <div className="flex justify-between items-center">
        {days.map((date, index) => {
          const status = getDayStatus(date);
          const dayName = weekDays[date.getDay()];
          const isTodayDate = isToday(date);
          
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <span className={cn(
                "text-xs font-medium",
                isTodayDate ? "text-orange-600 font-bold" : "text-gray-500"
              )}>
                {dayName}
              </span>
              
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                status === 'completed' 
                  ? "bg-gradient-to-br from-green-400 to-green-600 border-green-500 text-white shadow-lg scale-110"
                  : status === 'pending'
                    ? "bg-white border-orange-400 text-orange-500 animate-pulse shadow-md"
                    : "bg-gray-200 border-gray-300 text-gray-400"
              )}>
                {status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : status === 'pending' ? (
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                ) : (
                  <X className="w-4 h-4 opacity-50" />
                )}
              </div>
              
              <span className={cn(
                "text-xs font-bold",
                isTodayDate ? "text-orange-600" : "text-gray-400"
              )}>
                {format(date, 'd')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}