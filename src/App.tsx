import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { PostDetail } from '@/pages/PostDetail';
import { CreatePost } from '@/pages/CreatePost';
import { XFC } from '@/pages/XFC';
import { Chat } from '@/pages/Chat';
import { Gamification } from '@/pages/Gamification';
import { Store } from '@/pages/Store';
import { Profile } from '@/pages/Profile';
import { useAuthStore } from '@/store';
import { useEffect } from 'react';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } } });

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#FF6900] border-t-transparent rounded-full" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#FF6900] border-t-transparent rounded-full" /></div>;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppContent() {
  const { setLoading } = useAuthStore();
  useEffect(() => { setTimeout(() => setLoading(false), 500); }, [setLoading]);
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Home />} />
        <Route path="/p/:postId" element={<PostDetail />} />
        <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/xfc" element={<XFC />} />
        <Route path="/xfc/:cityId" element={<XFC />} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/chat/:channelId" element={<Chat />} />
        <Route path="/gamification" element={<Gamification />} />
        <Route path="/leaderboard" element={<Gamification />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<Store />} />
        <Route path="/u/:userId" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Profile />} />
        <Route path="/notifications" element={<Home />} />
        <Route path="/deals" element={<Store />} />
        <Route path="/redeem" element={<Gamification />} />
        <Route path="/wallet" element={<Gamification />} />
        <Route path="/search" element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
