import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, TrendingUp, Clock, ArrowBigUp, ArrowBigDown, MessageCircle, Share2, Bookmark, MoreHorizontal, Sparkles, MapPin, Smartphone } from 'lucide-react';
import { useFeedStore } from '@/store';
import { postsApi } from '@/lib/api/mockData';
import { images } from '@/config/images';
import type { Post } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const sortOptions = [
  { value: 'hot', label: 'Hot', icon: Flame },
  { value: 'top', label: 'Top', icon: TrendingUp },
  { value: 'new', label: 'New', icon: Clock },
] as const;

function PostCard({ post, imageIndex }: { post: Post; imageIndex: number }) {
  const navigate = useNavigate();
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [bookmarked, setBookmarked] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvoted(!upvoted);
    setUpvotes(upvoted ? upvotes - 1 : upvotes + 1);
  };

  // Map each post to unique images - NO REPEATS!
  const postImageMap: Record<number, string> = {
    0: images.posts.post1,
    1: images.posts.post2,
    2: images.posts.post3,
    3: images.posts.post4,
  };

  const configImage = postImageMap[imageIndex] || images.posts.post1;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50" onClick={() => navigate(`/p/${post.id}`)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate(`/u/${post.author?.id}`); }}>
              <AvatarImage src={post.author?.avatar} />
              <AvatarFallback>{post.author?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm hover:underline cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate(`/u/${post.author?.id}`); }}>{post.author?.name}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                  <Sparkles className="w-3 h-3 mr-0.5 text-[#FACC15]" />
                  Lvl {post.author?.level}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                {post.xfcCity && (<><span>•</span><span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{post.xfcCity}</span></>)}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Hide</DropdownMenuItem>
              <DropdownMenuItem>Block user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
        {post.isAiSummarized && post.aiSummary && (
          <div className="mb-3">
            <Badge className="bg-gradient-to-r from-[#FF6900] to-[#FACC15] text-white border-0 text-xs">
              <Sparkles className="w-3 h-3 mr-1" /> AI Summary
            </Badge>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.aiSummary}</p>
          </div>
        )}
        {!post.isAiSummarized && <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.content}</p>}
        {post.images && post.images.length > 0 && (
          <div className={cn("grid gap-2 rounded-xl overflow-hidden mb-3", post.images.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
            {post.images.slice(0, 4).map((image, idx) => {
              return (
                <div key={idx} className={cn("relative overflow-hidden bg-muted", post.images.length === 3 && idx === 0 ? "row-span-2" : "aspect-video")}>
                  <img 
                    src={configImage}
                    alt={`Post image ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        )}
        {post.deviceTag && (
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="cursor-pointer hover:bg-[#FF6900]/10 hover:text-[#FF6900] transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/product/${post.deviceTag}`); }}>
              <Smartphone className="w-3 h-3 mr-1" />{post.deviceTag}
            </Badge>
            <Badge variant="outline" className="text-xs"><Camera className="w-3 h-3 mr-1" />{post.category}</Badge>
          </div>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className={cn("h-8 px-2 gap-1", upvoted && "text-[#FF6900] bg-[#FF6900]/10")} onClick={handleUpvote}>
              <ArrowBigUp className={cn("w-5 h-5", upvoted && "fill-current")} />
              <span className="text-sm font-medium">{upvotes}</span>
            </Button>
            <Button variant="ghost" size="sm"><ArrowBigDown className="w-5 h-5" /></Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1"><MessageCircle className="w-4 h-4" /><span className="text-sm">{post.commentCount}</span></Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); navigator.share?.({ title: post.title, url: window.location.origin + '/p/' + post.id }); }}><Share2 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className={cn("h-8 w-8", bookmarked && "text-[#FF6900]")} onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}>
              <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Camera(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>; }

export function Home() {
  const { posts, sortBy, setSortBy, isLoading, setLoading, setPosts } = useFeedStore();
  const [activeTab, setActiveTab] = useState<'all' | 'following' | 'xfc'>('all');

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await postsApi.getFeed({ sort: sortBy, limit: 10 });
      setPosts(response.posts);
    } catch (error) { console.error('Failed to load posts:', error); }
    finally { setLoading(false); }
  }, [sortBy, setPosts, setLoading]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Community Feed</h1>
          <p className="text-muted-foreground">Discover the latest from Mi fans across India</p>
        </div>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="bg-muted"><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="following">Following</TabsTrigger><TabsTrigger value="xfc">My XFC</TabsTrigger></TabsList>
        </Tabs>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {sortOptions.map((option) => (
          <Button key={option.value} variant={sortBy === option.value ? 'default' : 'outline'} size="sm" className={cn("gap-2", sortBy === option.value && "bg-[#FF6900] hover:bg-[#E55D00]")} onClick={() => setSortBy(option.value)}>
            <option.icon className="w-4 h-4" />{option.label}
          </Button>
        ))}
      </div>
      <div className="space-y-4">
        {isLoading ? (<><Skeleton className="h-64" /><Skeleton className="h-64" /></>) : posts.length > 0 ? posts.map((post, idx) => <PostCard key={post.id} post={post} imageIndex={idx} />) : (
          <div className="text-center py-12"><Flame className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>No posts yet</p></div>
        )}
      </div>
    </div>
  );
}
