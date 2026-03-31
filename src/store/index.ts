import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Post, Notification } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setLoading: (value) => set({ isLoading: value }),
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => set({ user: null, isAuthenticated: false, accessToken: null }),
    }),
    { name: 'auth-storage', partialize: (state) => ({ accessToken: state.accessToken }) }
  )
);

interface FeedStore {
  posts: Post[];
  sortBy: 'hot' | 'top' | 'new';
  isLoading: boolean;
  hasMore: boolean;
  setPosts: (posts: Post[]) => void;
  addPosts: (posts: Post[]) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  setSortBy: (sort: 'hot' | 'top' | 'new') => void;
  setLoading: (value: boolean) => void;
  setHasMore: (value: boolean) => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  posts: [],
  sortBy: 'hot',
  isLoading: false,
  hasMore: true,
  setPosts: (posts) => set({ posts }),
  addPosts: (posts) => set((state) => ({ posts: [...state.posts, ...posts] })),
  updatePost: (postId, updates) => set((state) => ({
    posts: state.posts.map((p) => (p.id === postId ? { ...p, ...updates } : p)),
  })),
  setSortBy: (sortBy) => set({ sortBy }),
  setLoading: (isLoading) => set({ isLoading }),
  setHasMore: (hasMore) => set({ hasMore }),
}));

interface UIStore {
  sidebarOpen: boolean;
  bottomNavVisible: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (value: boolean) => void;
  setBottomNavVisible: (value: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  bottomNavVisible: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setBottomNavVisible: (bottomNavVisible) => set({ bottomNavVisible }),
}));

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  setUnreadCount: (count: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) => set({ notifications }),
  setUnreadCount: (unreadCount) => set({ unreadCount }),
}));
