import { NavLink } from 'react-router-dom';
import { Home, Compass, MapPin, MessageSquare, Trophy, ShoppingBag, User, Bell, PlusCircle, Zap, Flame } from 'lucide-react';
import { useAuthStore, useNotificationStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const mainNavItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/explore', icon: Compass, label: 'Explore' },
  { path: '/xfc', icon: MapPin, label: 'XFC Clubs' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/gamification', icon: Trophy, label: 'Rewards' },
  { path: '/store', icon: ShoppingBag, label: 'Mi Store' },
];

export function Sidebar({ className }: { className?: string }) {
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const { sidebarOpen } = useUIStore();

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6900] to-[#FACC15] flex items-center justify-center overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-6 h-6 object-contain"
          />
        </div>
        {sidebarOpen && (
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight">Mi Community</span>
            <span className="text-xs text-muted-foreground">India</span>
          </div>
        )}
      </div>

      <div className="px-4 mb-4">
        <NavLink to="/create-post">
          <Button className={cn("w-full bg-[#FF6900] hover:bg-[#E55D00] text-white font-semibold", !sidebarOpen && "px-2")}>
            <PlusCircle className="w-5 h-5" />
            {sidebarOpen && <span className="ml-2">Create Post</span>}
          </Button>
        </NavLink>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {mainNavItems.map((item) => (
          <NavLink key={item.path} to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
              isActive ? "bg-[#FF6900]/10 text-[#FF6900] font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              !sidebarOpen && "justify-center px-2"
            )}>
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-border">
        <NavLink to="/notifications"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mb-1",
            isActive ? "bg-[#FF6900]/10 text-[#FF6900] font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            !sidebarOpen && "justify-center px-2"
          )}>
          <div className="relative">
            <Bell className="w-5 h-5 flex-shrink-0" />
            {unreadCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 text-[10px]">{unreadCount}</Badge>
            )}
          </div>
          {sidebarOpen && <span>Notifications</span>}
        </NavLink>

        {user ? (
          <NavLink to={`/u/${user.id}`}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
              isActive ? "bg-[#FF6900]/10 text-[#FF6900]" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              !sidebarOpen && "justify-center px-2"
            )}>
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-sm truncate">{user.name}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#FF6900]" />
                  {user.points.toLocaleString()} Mi Coins
                </span>
              </div>
            )}
          </NavLink>
        ) : (
          <NavLink to="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground">
            <User className="w-5 h-5" />
            {sidebarOpen && <span>Sign In</span>}
          </NavLink>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside className={cn("hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-background border-r border-border z-40 transition-all duration-300", sidebarOpen ? "w-64" : "w-20", className)}>
        <NavContent />
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-foreground rounded-full" />
              <span className="w-4 h-0.5 bg-foreground rounded-full" />
              <span className="w-full h-0.5 bg-foreground rounded-full" />
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6900] to-[#FACC15] flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">Mi Community</span>
                <span className="text-xs text-muted-foreground">India</span>
              </div>
            </div>
            <div className="px-4 mb-4">
              <NavLink to="/create-post">
                <Button className="w-full bg-[#FF6900] hover:bg-[#E55D00] text-white font-semibold">
                  <PlusCircle className="w-5 h-5 mr-2" /> Create Post
                </Button>
              </NavLink>
            </div>
            <nav className="flex-1 px-2 space-y-1">
              {mainNavItems.map((item) => (
                <NavLink key={item.path} to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    isActive ? "bg-[#FF6900]/10 text-[#FF6900] font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
