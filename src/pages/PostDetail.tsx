import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowBigUp, ArrowBigDown, MessageCircle, Share2, Bookmark, MoreHorizontal, Sparkles, MapPin, Clock, Send, CornerDownRight } from 'lucide-react';
import { postsApi, commentsApi } from '@/lib/api/mockData';
import type { Post, Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

function CommentItem({ comment, replies }: { comment: Comment; replies: Comment[] }) {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0"><AvatarImage src={comment.author?.avatar} /><AvatarFallback>{comment.author?.name[0]}</AvatarFallback></Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{comment.author?.name}</span>
            <Badge variant="secondary" className="text-[10px] h-4">Lvl {comment.author?.level}</Badge>
            <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <button onClick={() => { setHasUpvoted(!hasUpvoted); setUpvotes(hasUpvoted ? upvotes - 1 : upvotes + 1); }} className={cn("flex items-center gap-1 text-xs text-muted-foreground hover:text-[#FF6900]", hasUpvoted && "text-[#FF6900]")}>
              <ArrowBigUp className={cn("w-4 h-4", hasUpvoted && "fill-current")} />{upvotes}
            </button>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><MessageCircle className="w-4 h-4" />Reply</button>
          </div>
        </div>
      </div>
      {replies.length > 0 && (
        <div className="ml-11 space-y-3 border-l-2 border-border pl-4">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <CornerDownRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-6 h-6"><AvatarImage src={reply.author?.avatar} /><AvatarFallback className="text-xs">{reply.author?.name[0]}</AvatarFallback></Avatar>
                  <span className="font-semibold text-sm">{reply.author?.name}</span>
                  <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</span>
                </div>
                <p className="text-sm">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<(Post & { comments: Comment[] }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [upvoted, setUpvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) return;
      setIsLoading(true);
      try {
        const data = await postsApi.getPost(postId);
        setPost(data);
      } catch (error) { console.error('Failed to load post:', error); }
      finally { setIsLoading(false); }
    };
    loadPost();
  }, [postId]);

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !postId) return;
    try {
      await commentsApi.createComment({ postId, content: commentText });
      setCommentText('');
      const data = await postsApi.getPost(postId);
      setPost(data);
    } catch (error) { console.error('Failed to post comment:', error); }
  };

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-10 w-24" /><Card><CardContent className="p-6 space-y-4"><Skeleton className="h-6 w-3/4" /><Skeleton className="h-32 w-full" /></CardContent></Card></div>;
  if (!post) return <div className="text-center py-12"><h2 className="text-xl font-semibold">Post not found</h2><Button onClick={() => navigate('/')} className="mt-4">Go Back Home</Button></div>;

  const topLevelComments = post.comments.filter(c => !c.parentCommentId);
  const getReplies = (commentId: string) => post.comments.filter(c => c.parentCommentId === commentId);

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2"><ArrowLeft className="w-4 h-4" />Back</Button>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 cursor-pointer" onClick={() => navigate(`/u/${post.author?.id}`)}>
                <AvatarImage src={post.author?.avatar} /><AvatarFallback>{post.author?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold cursor-pointer hover:underline" onClick={() => navigate(`/u/${post.author?.id}`)}>{post.author?.name}</span>
                  <Badge variant="secondary" className="text-[10px]"><Sparkles className="w-3 h-3 mr-0.5 text-[#FACC15]" />Lvl {post.author?.level}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  {post.xfcCity && (<><span>•</span><span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{post.xfcCity}</span></>)}
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end"><DropdownMenuItem>Report</DropdownMenuItem><DropdownMenuItem>Save</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          {post.isAiSummarized && post.aiSummary && (
            <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-[#FF6900]/10 to-[#FACC15]/10 border border-[#FF6900]/20">
              <Badge className="mb-2 bg-gradient-to-r from-[#FF6900] to-[#FACC15] text-white border-0"><Sparkles className="w-3 h-3 mr-1" />AI Summary</Badge>
              <p className="text-sm text-muted-foreground">{post.aiSummary}</p>
            </div>
          )}
          <div className="prose prose-sm max-w-none mb-6">{post.content.split('\n\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}</div>
          {post.images && post.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-6">
              {post.images.map((img, i) => <div key={i} className="aspect-video rounded-xl overflow-hidden bg-muted"><img src={img.url} alt={`${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform cursor-zoom-in" /></div>)}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.deviceTag && <Badge variant="secondary">{post.deviceTag}</Badge>}
            {post.tags.map((t, i) => <Badge key={i} variant="outline">#{t}</Badge>)}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className={cn("gap-2", upvoted && "bg-[#FF6900]/10 text-[#FF6900] border-[#FF6900]")} onClick={() => setUpvoted(!upvoted)}>
                <ArrowBigUp className={cn("w-5 h-5", upvoted && "fill-current")} />{post.upvotes + (upvoted ? 1 : 0)}
              </Button>
              <Button variant="outline" size="sm"><ArrowBigDown className="w-5 h-5" /></Button>
            </div>
            <Button variant="outline" size="sm" className="gap-2"><MessageCircle className="w-4 h-4" />{post.commentCount}</Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}><Share2 className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon" className={cn("h-9 w-9", bookmarked && "text-[#FF6900]")} onClick={() => setBookmarked(!bookmarked)}>
                <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Comments ({post.commentCount})</h2>
          <div className="flex gap-3 mb-6">
            <Avatar className="w-10 h-10 flex-shrink-0"><AvatarImage src={post.author?.avatar} /><AvatarFallback>You</AvatarFallback></Avatar>
            <div className="flex-1">
              <Textarea placeholder="Add a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} className="mb-2 resize-none" rows={3} />
              <div className="flex justify-end">
                <Button onClick={handleSubmitComment} disabled={!commentText.trim()} className="bg-[#FF6900] hover:bg-[#E55D00]"><Send className="w-4 h-4 mr-2" />Post Comment</Button>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-6">
            {topLevelComments.length > 0 ? topLevelComments.map((c) => <CommentItem key={c.id} comment={c} replies={getReplies(c.id)} />) : (
              <div className="text-center py-8 text-muted-foreground"><MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>No comments yet. Be the first!</p></div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
