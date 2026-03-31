import { NavLink, useLocation } from 'react-router-dom';
import { Home, MapPin, PlusCircle, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/xfc', icon: MapPin, label: 'XFC' },
  { path: '/create-post', icon: PlusCircle, label: 'Create', isCenter: true },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const location = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          if (item.isCenter) {
            return (
              <NavLink key={item.path} to={item.path} className="relative -top-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6900] to-[#FACC15] flex items-center justify-center shadow-lg shadow-[#FF6900]/30 active:scale-95 transition-transform">
                  <PlusCircle className="w-7 h-7 text-white" />
                </div>
              </NavLink>
            );
          }
          return (
            <NavLink key={item.path} to={item.path}
              className={cn("flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all duration-200 text-xs", isActive ? "text-[#FF6900]" : "text-muted-foreground")}>
              <item.icon className={cn("w-6 h-6 transition-all duration-200", isActive && "stroke-[2.5px]")} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
