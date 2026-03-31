export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  avatar: string;
  xfcCity?: string;
  xfcJoinedAt?: Date;
  points: number;
  level: number;
  badges: Badge[];
  streakDays: number;
  lastLogin?: Date;
  registeredDevices: Device[];
  preferences: UserPreferences;
  role: 'user' | 'moderator' | 'admin';
  strikes: number;
  isBanned: boolean;
  createdAt: Date;
}

export interface Badge {
  type: string;
  earnedAt: Date;
  category: 'activity' | 'quality' | 'xfc' | 'device';
}

export interface Device {
  model: string;
  imei?: string;
  registeredAt: Date;
}

export interface UserPreferences {
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    marketing: boolean;
  };
  privacy: {
    showEmail: boolean;
    showDevices: boolean;
  };
}

export interface Post {
  id: string;
  authorId: string;
  author?: User;
  title: string;
  content: string;
  images: PostImage[];
  category: string;
  tags: string[];
  deviceTag?: string;
  xfcCity?: string;
  upvotes: number;
  downvotes: number;
  views: number;
  commentCount: number;
  isAiSummarized: boolean;
  aiSummary?: string;
  contentQualityScore?: number;
  isFeatured: boolean;
  featuredAt?: Date;
  isFlagged: boolean;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface PostImage {
  url: string;
  width: number;
  height: number;
  exif?: Record<string, any>;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: User;
  content: string;
  parentCommentId?: string;
  replies?: Comment[];
  upvotes: number;
  isHelpful: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface XFCClub {
  id: string;
  cityName: string;
  region: 'North' | 'South' | 'East' | 'West';
  memberCount: number;
  postCount: number;
  moderators: string[];
  leaderboard: XFCLeaderboardEntry[];
  activeEvents: string[];
  createdAt: Date;
}

export interface XFCLeaderboardEntry {
  userId: string;
  user?: User;
  points: number;
  rank: number;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'official' | 'xfc' | 'interest' | 'dm';
  icon?: string;
  memberCount: number;
  lastMessage?: ChatMessage;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  sender?: User;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'file';
  isPinned: boolean;
  repliedTo?: string;
  reactions: MessageReaction[];
  isDeleted: boolean;
  createdAt: Date;
}

export interface MessageReaction {
  emoji: string;
  userIds: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: 'online' | 'offline';
  xfcCity: string;
  date: Date;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  venue?: string;
  maxCapacity?: number;
  attendees: EventAttendee[];
  createdBy: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface EventAttendee {
  userId: string;
  user?: User;
  rsvpAt: Date;
  attended?: boolean;
  verified?: boolean;
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  category: string;
  currentPrice: number;
  marketingPrice: number;
  discountPercent: number;
  imageUrl: string;
  specs: Record<string, any>;
  communityRating: number;
  reviewCount: number;
  lastSynced: Date;
}

export interface RedeemReward {
  id: string;
  name: string;
  description: string;
  coinCost: number;
  imageUrl: string;
  type: 'coupon' | 'merchandise' | 'premium';
  stock: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'badge' | 'event' | 'announcement';
  title: string;
  body: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}
// Add these to your existing types/index.ts file

export interface StreakTask {
  id: string;
  type: 'login' | 'read_article' | 'comment' | 'share' | 'react';
  title: string;
  description: string;
  points: number;
  completed: boolean;
  completedAt?: Date;
  icon: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date | null;
  todayTasks: StreakTask[];
  weeklyCalendar: {
    date: Date;
    completed: boolean;
    points: number;
  }[];
  totalPointsToday: number;
}

export interface StreakMilestone {
  days: number;
  reward: string;
  bonusPoints: number;
  badge?: string;
}