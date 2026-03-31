import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, X, Sparkles, MapPin, Hash, Send, Loader2 } from 'lucide-react';
import { postsApi } from '@/lib/api/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';

const categories = ['General', 'Photography', 'Tips & Tricks', 'Reviews', 'Comparison', 'Events', 'Support'];
const devices = ['Xiaomi 14 Ultra', 'Xiaomi 14', 'Redmi Note 13 Pro+', 'Xiaomi Pad 6', 'Redmi Buds 5 Pro', 'Other'];

export function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [deviceTag, setDeviceTag] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setImages(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (i: number) => setImages(prev => prev.filter((_, idx) => idx !== i));
  const addTag = () => { if (tagInput.trim() && !tags.includes(tagInput.trim())) { setTags([...tags, tagInput.trim()]); setTagInput(''); } };
  const removeTag = (t: string) => setTags(tags.filter(x => x !== t));

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsSubmitting(true);
    try {
      const post = await postsApi.createPost({ title, content, category: category || 'General', deviceTag, tags, images: images.map(url => ({ url, width: 800, height: 600 })), xfcCity: user?.xfcCity });
      navigate(`/p/${post.id}`);
    } catch (e) { console.error(e); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5" /></Button>
          <h1 className="text-xl font-bold">Create Post</h1>
        </div>
        <Button className="bg-[#FF6900] hover:bg-[#E55D00]" disabled={!title.trim() || !content.trim() || isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Posting...</> : <><Send className="w-4 h-4 mr-2" />Post</>}
        </Button>
      </div>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="What's on your mind?" value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg font-medium" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Content</Label>
              {content.length > 500 && <Badge variant="secondary" className="gap-1"><Sparkles className="w-3 h-3 text-[#FF6900]" />AI Summary Available</Badge>}
            </div>
            <Textarea id="content" placeholder="Share your thoughts..." value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[200px] resize-none" />
            <p className="text-xs text-muted-foreground text-right">{content.length} characters</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Device (Optional)</Label>
              <Select value={deviceTag} onValueChange={setDeviceTag}>
                <SelectTrigger><SelectValue placeholder="Tag your device" /></SelectTrigger>
                <SelectContent>{devices.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input placeholder="Add tags (press Enter)" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <Button type="button" variant="outline" onClick={addTag}><Hash className="w-4 h-4" /></Button>
            </div>
            {tags.length > 0 && <div className="flex flex-wrap gap-2 mt-2">{tags.map(t => <Badge key={t} variant="secondary" className="gap-1">#{t}<button onClick={() => removeTag(t)}><X className="w-3 h-3" /></button></Badge>)}</div>}
          </div>
          <div className="space-y-2">
            <Label>Images (Optional)</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={img} alt={`${i}`} className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"><X className="w-3 h-3" /></button>
                </div>
              ))}
              {images.length < 10 && (
                <button onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 hover:border-[#FF6900] hover:text-[#FF6900] transition-colors">
                  <ImageIcon className="w-6 h-6" /><span className="text-xs">Add Photo</span>
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            <p className="text-xs text-muted-foreground">You can upload up to 10 images</p>
          </div>
          {user?.xfcCity && <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /><span>Posting from {user.xfcCity} XFC</span></div>}
        </CardContent>
      </Card>
    </div>
  );
}
