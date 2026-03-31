import { useEffect, useState, useRef } from 'react';
import { Search, Send, Smile, Paperclip, MoreVertical, CheckCheck } from 'lucide-react';
import { chatApi } from '@/lib/api/mockData';
import type { ChatChannel, ChatMessage } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

const emojiReactions = ['👍', '❤️', '😂', '😮', '🎉', '🔥'];

function MessageBubble({ message, isOwn }: { message: ChatMessage; isOwn: boolean }) {
  const [showReactions, setShowReactions] = useState(false);
  return (
    <div className={cn("flex gap-3 group", isOwn && "flex-row-reverse")} onMouseEnter={() => setShowReactions(true)} onMouseLeave={() => setShowReactions(false)}>
      {!isOwn && <Avatar className="w-8 h-8 flex-shrink-0"><AvatarImage src={message.sender?.avatar} /><AvatarFallback>{message.sender?.name[0]}</AvatarFallback></Avatar>}
      <div className={cn("max-w-[70%] space-y-1", isOwn && "items-end")}>
        {!isOwn && <span className="text-xs text-muted-foreground ml-1">{message.sender?.name}</span>}
        <div className={cn("relative px-4 py-2 rounded-2xl", isOwn ? "bg-[#FF6900] text-white rounded-br-md" : "bg-muted rounded-bl-md")}>
          <p className="text-sm">{message.content}</p>
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-1 flex-wrap">
              {message.reactions.map((r, i) => <span key={i} className="text-xs bg-background/50 px-1.5 py-0.5 rounded-full">{r.emoji} {r.userIds.length}</span>)}
            </div>
          )}
        </div>
        <div className={cn("flex items-center gap-1 text-[10px] text-muted-foreground", isOwn && "justify-end")}>
          <span>{format(new Date(message.createdAt), 'h:mm a')}</span>
          {isOwn && <CheckCheck className="w-3 h-3 text-blue-500" />}
        </div>
      </div>
      {showReactions && (
        <div className={cn("absolute -top-8 bg-background border rounded-full shadow-lg px-2 py-1 flex gap-1 z-10", isOwn ? "right-12" : "left-12")}>
          {emojiReactions.map((e) => <button key={e} className="hover:scale-125 transition-transform text-sm">{e}</button>)}
        </div>
      )}
    </div>
  );
}

function AvatarImage({ src }: { src?: string }) { return src ? <img src={src} alt="" className="w-full h-full object-cover" /> : null; }

export function Chat() {
  const [channels, setChannels] = useState<ChatChannel[]>([]);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    chatApi.getChannels().then(data => { setChannels(data); if (data.length > 0 && !activeChannel) setActiveChannel(data[0].id); });
  }, []);

  useEffect(() => {
    if (activeChannel) chatApi.getMessages(activeChannel).then(setMessages);
  }, [activeChannel]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeChannel) return;
    const newMessage = await chatApi.sendMessage(activeChannel, messageText);
    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const filteredChannels = channels.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const currentChannel = channels.find(c => c.id === activeChannel);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      <Card className={cn("w-full md:w-80 flex flex-col overflow-hidden", isMobile && activeChannel && "hidden")}>
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search channels..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredChannels.map((channel) => (
              <button key={channel.id} onClick={() => setActiveChannel(channel.id)}
                className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left", activeChannel === channel.id ? "bg-[#FF6900]/10" : "hover:bg-muted")}>
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarFallback className={cn(channel.type === 'official' && "bg-blue-500 text-white", channel.type === 'xfc' && "bg-[#FF6900] text-white", channel.type === 'interest' && "bg-green-500 text-white")}>{channel.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between"><span className="font-medium truncate">{channel.name}</span></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground truncate">{channel.lastMessage?.content || 'No messages'}</span>
                    {channel.unreadCount > 0 && <Badge className="bg-[#FF6900] text-white text-xs min-w-[20px] h-5">{channel.unreadCount}</Badge>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>
      <Card className={cn("flex-1 flex flex-col overflow-hidden", isMobile && !activeChannel && "hidden")}>
        {activeChannel && currentChannel ? (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={cn(currentChannel.type === 'official' && "bg-blue-500 text-white", currentChannel.type === 'xfc' && "bg-[#FF6900] text-white")}>{currentChannel.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{currentChannel.name}</h3>
                  <p className="text-xs text-muted-foreground">{currentChannel.memberCount.toLocaleString()} members</p>
                </div>
              </div>
              <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((m) => <MessageBubble key={m.id} message={m} isOwn={m.senderId === '1'} />)}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="flex-shrink-0"><Paperclip className="w-5 h-5" /></Button>
                <div className="flex-1 relative">
                  <Input placeholder="Type a message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())} className="pr-10" />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2"><Smile className="w-5 h-5" /></Button>
                </div>
                <Button className="bg-[#FF6900] hover:bg-[#E55D00] flex-shrink-0" onClick={handleSendMessage} disabled={!messageText.trim()}><Send className="w-4 h-4 mr-2" />Send</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground"><p>Select a channel to start chatting</p></div>
        )}
      </Card>
    </div>
  );
}
