// Centralized image configuration with fallbacks
export const images = {
  logo: "/logo.png",
  
  fallbacks: {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    post: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
    product: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    placeholder: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop",
  },

  posts: {
    post1: "/images/posts/gsmarena_001.jpg",
    post2: "/images/posts/gsmarena_002.jpg",
    post3: "/images/posts/post3.png",
    post4: "/images/posts/post4.jpg",
  },

  products: {
    xiaomi14: "/images/products/xiaomi-14.jpg",
    xiaomi14Ultra: "/images/products/xiaomi-14-ultra.jpg",
    xiaomiWatch: "/images/products/xiaomi-watch.jpg",
  },

  store: {
    featured1: "/images/store/featured-1.jpg",
    featured2: "/images/store/featured-2.jpg",
  },

  xfc: {
    mumbai: "/images/xfc/mumbai-badge.png",
    delhi: "/images/xfc/delhi-badge.png",
    bangalore: "/images/xfc/bangalore-badge.png",
  },

  // Helper function to safely get image with fallback
  getImage: (path?: string, category: keyof typeof images.fallbacks = 'placeholder') => {
    if (!path) return images.fallbacks[category];
    // If it's a full URL, return as-is
    if (path.startsWith('http')) return path;
    // Otherwise prepend /images/ if needed
    return path.startsWith('/') ? path : `/images/${path}`;
  }
};