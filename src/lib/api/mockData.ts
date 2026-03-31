import type { User, Post, Comment, XFCClub, ChatChannel, ChatMessage, Product, Event, RedeemReward, Notification } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    firebaseUid: 'uid_1',
    email: 'rahul.sharma@email.com',
    name: 'Rahul Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
    xfcCity: 'Mumbai',
    xfcJoinedAt: new Date('2024-01-15'),
    points: 12500,
    level: 15,
    badges: [
      { type: 'early_adopter', earnedAt: new Date('2024-01-15'), category: 'activity' },
      { type: 'top_contributor', earnedAt: new Date('2024-03-01'), category: 'quality' },
    ],
    streakDays: 45,
    lastLogin: new Date(),
    registeredDevices: [{ model: 'Xiaomi 14 Ultra', imei: '123456789012345', registeredAt: new Date('2024-01-15') }],
    preferences: { language: 'en', notifications: { push: true, email: true, marketing: false }, privacy: { showEmail: false, showDevices: true } },
    role: 'user',
    strikes: 0,
    isBanned: false,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    firebaseUid: 'uid_2',
    email: 'priya.patel@email.com',
    name: 'Priya Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    xfcCity: 'Delhi',
    xfcJoinedAt: new Date('2024-02-01'),
    points: 8900,
    level: 12,
    badges: [{ type: 'photography_pro', earnedAt: new Date('2024-02-15'), category: 'quality' }],
    streakDays: 23,
    lastLogin: new Date(),
    registeredDevices: [{ model: 'Redmi Note 13 Pro+', registeredAt: new Date('2024-02-01') }],
    preferences: { language: 'en', notifications: { push: true, email: false, marketing: true }, privacy: { showEmail: true, showDevices: true } },
    role: 'moderator',
    strikes: 0,
    isBanned: false,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    firebaseUid: 'uid_3',
    email: 'arun.kumar@email.com',
    name: 'Arun Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arun',
    xfcCity: 'Bangalore',
    points: 15200,
    level: 18,
    badges: [{ type: 'tech_guru', earnedAt: new Date('2024-01-20'), category: 'quality' }],
    streakDays: 67,
    lastLogin: new Date(),
    registeredDevices: [{ model: 'Xiaomi Pad 6', registeredAt: new Date('2024-01-20') }],
    preferences: { language: 'en', notifications: { push: true, email: true, marketing: true }, privacy: { showEmail: false, showDevices: false } },
    role: 'user',
    strikes: 0,
    isBanned: false,
    createdAt: new Date('2024-01-20'),
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    author: mockUsers[0],
    title: 'Xiaomi 14 Ultra Camera Review: 1-inch Sensor Magic!',
    content: 'Just spent a week with the Xiaomi 14 Ultra and I\'m blown away by the camera performance. The 1-inch Sony LYT-900 sensor delivers incredible detail and dynamic range.',
    images: [
      { width: 800, height: 600 },
      { width: 800, height: 600 },
    ],
    category: 'photography',
    tags: ['xiaomi14ultra', 'camerareview', 'leica'],
    deviceTag: 'Xiaomi 14 Ultra',
    xfcCity: 'Mumbai',
    upvotes: 342,
    downvotes: 12,
    views: 5200,
    commentCount: 56,
    isAiSummarized: true,
    aiSummary: 'User reviews Xiaomi 14 Ultra camera with 1-inch sensor, praising night mode and Leica color science.',
    contentQualityScore: 95,
    isFeatured: true,
    featuredAt: new Date('2024-03-25'),
    isFlagged: false,
    moderationStatus: 'approved',
    createdAt: new Date('2024-03-24T10:30:00'),
    updatedAt: new Date('2024-03-24T10:30:00'),
  },
  {
    id: '2',
    authorId: '2',
    author: mockUsers[1],
    title: 'HyperOS Tips & Tricks: Hidden Features You Need to Know',
    content: 'HyperOS is packed with hidden features that most users don\'t know about. Here are my top 10 tips to get the most out of your Xiaomi device.',
    images: [{ width: 800, height: 600 }],
    category: 'tips',
    tags: ['hyperos', 'tips', 'tricks'],
    deviceTag: 'Redmi Note 13 Pro+',
    xfcCity: 'Delhi',
    upvotes: 528,
    downvotes: 8,
    views: 8900,
    commentCount: 89,
    isAiSummarized: true,
    aiSummary: 'Top 10 HyperOS hidden features including double-tap to lock, AI subtitles, memory extension.',
    contentQualityScore: 92,
    isFeatured: true,
    featuredAt: new Date('2024-03-26'),
    isFlagged: false,
    moderationStatus: 'approved',
    createdAt: new Date('2024-03-23T14:15:00'),
    updatedAt: new Date('2024-03-23T14:15:00'),
  },
  {
    id: '3',
    authorId: '3',
    author: mockUsers[2],
    title: 'Delhi XFC Meetup - March 2024 Photos & Recap',
    content: 'What an incredible turnout at yesterday\'s Delhi XFC meetup! Over 150 Mi fans joined us at Cyber Hub.',
    images: [
      { width: 800, height: 600 },
      { width: 800, height: 600 },
    ],
    category: 'events',
    tags: ['delhi', 'xfc', 'meetup'],
    deviceTag: 'Xiaomi Pad 6',
    xfcCity: 'Delhi',
    upvotes: 267,
    downvotes: 3,
    views: 4100,
    commentCount: 42,
    isAiSummarized: true,
    aiSummary: 'Recap of Delhi XFC meetup with 150+ attendees, featuring Xiaomi 14 Ultra demos.',
    contentQualityScore: 88,
    isFeatured: false,
    isFlagged: false,
    moderationStatus: 'approved',
    createdAt: new Date('2024-03-22T09:00:00'),
    updatedAt: new Date('2024-03-22T09:00:00'),
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    authorId: '2',
    author: mockUsers[1],
    content: 'Amazing review! The night mode samples look stunning.',
    upvotes: 24,
    isHelpful: true,
    isDeleted: false,
    createdAt: new Date('2024-03-24T11:00:00'),
    updatedAt: new Date('2024-03-24T11:00:00'),
  },
  {
    id: '2',
    postId: '1',
    authorId: '3',
    author: mockUsers[2],
    content: 'The Leica color science is what sold me. Great shots!',
    upvotes: 18,
    isHelpful: false,
    isDeleted: false,
    createdAt: new Date('2024-03-24T12:30:00'),
    updatedAt: new Date('2024-03-24T12:30:00'),
  },
];

export const mockXFCClubs: XFCClub[] = [
  { id: '1', cityName: 'Mumbai', region: 'West', memberCount: 12500, postCount: 3420, moderators: ['1'], leaderboard: [], activeEvents: ['1', '2'], createdAt: new Date('2023-06-01') },
  { id: '2', cityName: 'Delhi', region: 'North', memberCount: 15800, postCount: 4890, moderators: ['2'], leaderboard: [], activeEvents: ['3'], createdAt: new Date('2023-06-01') },
  { id: '3', cityName: 'Bangalore', region: 'South', memberCount: 18200, postCount: 5670, moderators: ['3'], leaderboard: [], activeEvents: ['4', '5'], createdAt: new Date('2023-06-01') },
  { id: '4', cityName: 'Chennai', region: 'South', memberCount: 8900, postCount: 2340, moderators: ['10'], leaderboard: [], activeEvents: [], createdAt: new Date('2023-07-01') },
  { id: '5', cityName: 'Hyderabad', region: 'South', memberCount: 7600, postCount: 1890, moderators: ['11'], leaderboard: [], activeEvents: [], createdAt: new Date('2023-07-15') },
  { id: '6', cityName: 'Pune', region: 'West', memberCount: 6200, postCount: 1560, moderators: ['12'], leaderboard: [], activeEvents: [], createdAt: new Date('2023-08-01') },
];

export const mockChatChannels: ChatChannel[] = [
  { id: '1', name: 'General', type: 'official', memberCount: 125000, unreadCount: 5 },
  { id: '2', name: 'Mumbai XFC', type: 'xfc', memberCount: 12500, unreadCount: 12 },
  { id: '3', name: 'Photography', type: 'interest', memberCount: 45000, unreadCount: 0 },
  { id: '4', name: 'Xiaomi 14 Ultra', type: 'interest', memberCount: 28000, unreadCount: 3 },
];

export const mockChatMessages: ChatMessage[] = [
  { id: '1', channelId: '1', senderId: '2', sender: mockUsers[1], content: 'Hey everyone! How\'s your day going?', isPinned: false, reactions: [{ emoji: '👋', userIds: ['1', '3'] }], isDeleted: false, createdAt: new Date('2024-03-27T10:00:00') },
  { id: '2', channelId: '1', senderId: '1', sender: mockUsers[0], content: 'Pretty good! Just got my Xiaomi 14 Ultra delivered 📱', isPinned: false, reactions: [{ emoji: '🎉', userIds: ['2'] }], isDeleted: false, createdAt: new Date('2024-03-27T10:05:00') },
  { id: '3', channelId: '1', senderId: '3', sender: mockUsers[2], content: 'Nice! You\'re going to love the camera.', isPinned: false, reactions: [], isDeleted: false, createdAt: new Date('2024-03-27T10:10:00') },
];

export const mockProducts: Product[] = [
  { id: '1', productId: 'XIAOMI-14-ULTRA', name: 'Xiaomi 14 Ultra', category: 'Smartphones', currentPrice: 99999, marketingPrice: 109999, discountPercent: 9, imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop', specs: { display: '6.73" AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP Quad' }, communityRating: 4.8, reviewCount: 2340, lastSynced: new Date() },
  { id: '2', productId: 'REDMI-NOTE-13-PRO-PLUS', name: 'Redmi Note 13 Pro+', category: 'Smartphones', currentPrice: 29999, marketingPrice: 34999, discountPercent: 14, imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop', specs: { display: '6.67" AMOLED', processor: 'Dimensity 7200', camera: '200MP' }, communityRating: 4.6, reviewCount: 5670, lastSynced: new Date() },
  { id: '3', productId: 'XIAOMI-PAD-6', name: 'Xiaomi Pad 6', category: 'Tablets', currentPrice: 26999, marketingPrice: 32999, discountPercent: 18, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', specs: { display: '11" 2.8K', processor: 'Snapdragon 870' }, communityRating: 4.7, reviewCount: 1890, lastSynced: new Date() },
  { id: '4', productId: 'REDMI-BUDS-5-PRO', name: 'Redmi Buds 5 Pro', category: 'Audio', currentPrice: 4999, marketingPrice: 5999, discountPercent: 17, imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop', specs: { type: 'TWS', anc: '52dB' }, communityRating: 4.5, reviewCount: 3200, lastSynced: new Date() },
  { id: '5', productId: 'MI-WATCH-2', name: 'Mi Watch 2', category: 'Wearables', currentPrice: 9999, marketingPrice: 12999, discountPercent: 23, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', specs: { display: '1.43" AMOLED', battery: '14 days' }, communityRating: 4.4, reviewCount: 1560, lastSynced: new Date() },
  { id: '6', productId: 'XIAOMI-SMART-BAND-8', name: 'Xiaomi Smart Band 8', category: 'Wearables', currentPrice: 2999, marketingPrice: 3499, discountPercent: 14, imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop', specs: { display: '1.62" AMOLED', battery: '16 days' }, communityRating: 4.6, reviewCount: 8900, lastSynced: new Date() },
];

export const mockEvents: Event[] = [
  { id: '1', title: 'Mumbai XFC Tech Talk', description: 'Join us for an exclusive session on HyperOS features.', eventType: 'offline', xfcCity: 'Mumbai', date: new Date('2024-04-15T18:00:00'), venue: 'Xiaomi Experience Store, Phoenix Marketcity', maxCapacity: 100, attendees: [], createdBy: '1', status: 'upcoming', createdAt: new Date('2024-03-20') },
  { id: '2', title: 'Delhi Photography Walk', description: 'Capture the beauty of Delhi with fellow Mi fans.', eventType: 'offline', xfcCity: 'Delhi', date: new Date('2024-04-20T07:00:00'), venue: 'India Gate, New Delhi', maxCapacity: 50, attendees: [], createdBy: '2', status: 'upcoming', createdAt: new Date('2024-03-22') },
  { id: '3', title: 'Bangalore Gaming Tournament', description: 'PUBG Mobile tournament with amazing prizes!', eventType: 'offline', xfcCity: 'Bangalore', date: new Date('2024-04-10T14:00:00'), venue: 'Gaming Arena, Koramangala', maxCapacity: 64, attendees: [], createdBy: '3', status: 'upcoming', createdAt: new Date('2024-03-21') },
];

export const mockRewards: RedeemReward[] = [
  { id: '1', name: '₹500 Mi Store Coupon', description: 'Valid on all products above ₹5000', coinCost: 2500, imageUrl: '', type: 'coupon', stock: 100 },
  { id: '2', name: 'Redmi Buds 5 Pro', description: 'Premium TWS earbuds with 52dB ANC', coinCost: 25000, imageUrl: '', type: 'merchandise', stock: 20 },
  { id: '3', name: 'Xiaomi T-Shirt', description: 'Exclusive Mi Fan Club merchandise', coinCost: 5000, imageUrl: '', type: 'merchandise', stock: 50 },
  { id: '4', name: 'Premium Profile Badge', description: 'Exclusive animated badge for 30 days', coinCost: 1000, imageUrl: '', type: 'premium', stock: 999 },
  { id: '5', name: 'Mi Store Early Access', description: '24-hour early access to flash sales', coinCost: 3000, imageUrl: '', type: 'premium', stock: 200 },
  { id: '6', name: '₹2000 Mi Store Coupon', description: 'Valid on all products above ₹15000', coinCost: 8000, imageUrl: '', type: 'coupon', stock: 50 },
];

export const mockNotifications: Notification[] = [
  { id: '1', userId: '1', type: 'like', title: 'New upvote on your post', body: 'Priya Patel upvoted your post', data: { postId: '1' }, isRead: false, createdAt: new Date('2024-03-27T10:00:00') },
  { id: '2', userId: '1', type: 'comment', title: 'New comment on your post', body: 'Arun Kumar commented on your post', data: { postId: '1' }, isRead: false, createdAt: new Date('2024-03-27T09:30:00') },
  { id: '3', userId: '1', type: 'badge', title: 'New badge earned!', body: 'You earned the Top Contributor badge', data: {}, isRead: true, createdAt: new Date('2024-03-26T15:00:00') },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const postsApi = {
  getFeed: async (_params?: any) => {
    await delay(500);
    return { posts: mockPosts, nextCursor: null, hasMore: false };
  },
  getPost: async (postId: string) => {
    await delay(300);
    const post = mockPosts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');
    return { ...post, comments: mockComments.filter(c => c.postId === postId) };
  },
  createPost: async (data: any) => {
    await delay(500);
    return { id: String(mockPosts.length + 1), ...data, author: mockUsers[0], createdAt: new Date(), updatedAt: new Date() };
  },
  upvotePost: async (_postId: string) => ({ upvotes: 343, downvotes: 12 }),
  downvotePost: async (_postId: string) => ({ upvotes: 342, downvotes: 13 }),
};

export const commentsApi = {
  createComment: async (data: any) => {
    await delay(300);
    return { id: String(mockComments.length + 1), ...data, author: mockUsers[0], upvotes: 0, isHelpful: false, isDeleted: false, createdAt: new Date(), updatedAt: new Date() };
  },
};

export const xfcApi = {
  getClubs: async () => {
    await delay(300);
    return mockXFCClubs;
  },
  getGlobalLeaderboard: async () => {
    await delay(200);
    return mockXFCClubs.sort((a, b) => b.memberCount - a.memberCount);
  },
};

export const chatApi = {
  getChannels: async () => {
    await delay(300);
    return mockChatChannels;
  },
  getMessages: async (channelId: string) => {
    await delay(200);
    return mockChatMessages.filter(m => m.channelId === channelId);
  },
  sendMessage: async (channelId: string, content: string) => {
    await delay(200);
    return { id: String(Date.now()), channelId, senderId: '1', sender: mockUsers[0], content, isPinned: false, reactions: [], isDeleted: false, createdAt: new Date() };
  },
};

export const productsApi = {
  getProducts: async () => {
    await delay(300);
    return mockProducts;
  },
  getFeaturedProducts: async () => {
    await delay(200);
    return mockProducts.slice(0, 3);
  },
};

export const authApi = {
  login: async (_email: string, _password: string) => {
    await delay(500);
    return { user: mockUsers[0], token: 'mock_token' };
  },
  googleLogin: async (_token: string) => {
    await delay(500);
    return { user: mockUsers[0], token: 'mock_token' };
  },
};
