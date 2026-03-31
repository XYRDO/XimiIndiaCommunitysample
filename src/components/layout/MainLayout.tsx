import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { useUIStore } from '@/store';
import { cn } from '@/lib/utils';

export function MainLayout() {
  const { sidebarOpen } = useUIStore();
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={cn("transition-all duration-300 min-h-screen", "lg:ml-20", sidebarOpen && "lg:ml-64")}>
        <div className="max-w-7xl mx-auto p-4 lg:p-6 pb-24 lg:pb-6">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
