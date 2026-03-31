import { useState } from 'react';
import { Trophy, Flame, Star, Target, CheckCircle2, Circle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const badges = [
  { id: 'welcome', name: 'Welcome', description: 'Joined the Mi Community', icon: Star, color: '#FACC15', earned: true },
  { id: 'early_adopter', name: 'Early Adopter', description: 'Joined in the first month', icon: Trophy, color: '#FF6900', earned: true },
  { id: 'top_contributor', name: 'Top Contributor', description: '100+ helpful posts', icon: Target, color: '#FACC15', earned: true },
  { id: 'streak_master', name: 'Streak Master', description: '60-day login streak', icon: Flame, color: '#EF4444', earned: false },
];

const rewards = [
  { id: '1', name: '₹500 Mi Store Coupon', cost: 2500, emoji: '🎫', stock: 100 },
  { id: '2', name: 'Redmi Buds 5 Pro', cost: 25000, emoji: '🎧', stock: 20 },
  { id: '3', name: 'Xiaomi T-Shirt', cost: 5000, emoji: '👕', stock: 50 },
  { id: '4', name: 'Premium Badge', cost: 1000, emoji: '🏅', stock: 999 },
];

const dailyTasks = [
  { id: '1', name: 'Daily Login', points: 50, completed: true },
  { id: '2', name: 'Create a Post', points: 100, completed: false },
  { id: '3', name: 'Comment on 3 Posts', points: 75, completed: false },
  { id: '4', name: 'Upvote 5 Posts', points: 50, completed: true },
];

function StreakCalendar() {
  return (
    <div className="grid grid-cols-7 gap-1">
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="text-center text-xs text-muted-foreground py-1">{d}</div>)}
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className={cn("aspect-square rounded-md flex items-center justify-center text-xs font-medium", i < 25 ? "bg-[#FF6900] text-white" : "bg-muted text-muted-foreground")}>{i + 1}</div>
      ))}
    </div>
  );
}

export function Gamification() {
  // const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const userStats = { points: 12500, level: 15, streakDays: 45, nextLevelPoints: 15000 };
  const progressPercent = (userStats.points / userStats.nextLevelPoints) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rewards & Gamification</h1>
          <p className="text-muted-foreground">Earn Mi Coins and unlock exclusive rewards</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="col-span-2 bg-gradient-to-br from-[#FF6900] to-[#FACC15] text-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-sm">Your Mi Coins</p>
                <p className="text-4xl font-bold">{userStats.points.toLocaleString()}</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1"><span>Level {userStats.level}</span><span>Level {userStats.level + 1}</span></div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} /></div>
                  <p className="text-xs text-white/80 mt-1">{userStats.nextLevelPoints - userStats.points} more to level up</p>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"><Trophy className="w-8 h-8" /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><Flame className="w-5 h-5 text-orange-500" /></div>
              <div><p className="text-2xl font-bold">{userStats.streakDays}</p><p className="text-xs text-muted-foreground">Day Streak</p></div>
            </div>
            <StreakCalendar />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center"><Star className="w-5 h-5 text-yellow-500" /></div>
              <div><p className="text-2xl font-bold">3/4</p><p className="text-xs text-muted-foreground">Badges Earned</p></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.filter(b => b.earned).slice(0, 3).map((b) => <div key={b.id} className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${b.color}20` }}><b.icon className="w-5 h-5" style={{ color: b.color }} /></div>)}
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-[#FF6900]" />Daily Tasks</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyTasks.map((t) => (
                  <div key={t.id} className={cn("flex items-center justify-between p-3 rounded-xl", t.completed ? "bg-green-500/10" : "bg-muted")}>
                    <div className="flex items-center gap-3">
                      {t.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-muted-foreground" />}
                      <span className={cn(t.completed && "line-through text-muted-foreground")}>{t.name}</span>
                    </div>
                    <Badge variant="secondary">+{t.points} coins</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rewards" className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((r) => (
              <Card key={r.id} className="overflow-hidden group">
                <div className="h-32 bg-gradient-to-br from-[#FF6900]/10 to-[#FACC15]/10 flex items-center justify-center text-6xl">{r.emoji}</div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{r.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3"><span className="text-[#FF6900] font-semibold">{r.cost.toLocaleString()}</span><span>Mi Coins</span></div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{r.stock} left</Badge>
                    <Button size="sm" className="bg-[#FF6900] hover:bg-[#E55D00]" disabled={userStats.points < r.cost}>{userStats.points >= r.cost ? 'Redeem' : 'Locked'}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="badges" className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((b) => (
              <Card key={b.id} className={cn("overflow-hidden transition-all", !b.earned && "opacity-60")}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${b.color}20` }}>
                      <b.icon className="w-8 h-8" style={{ color: b.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1"><h3 className="font-semibold">{b.name}</h3>{b.earned && <CheckCircle2 className="w-4 h-4 text-green-500" />}</div>
                      <p className="text-sm text-muted-foreground">{b.description}</p>
                      {!b.earned && <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground"><Lock className="w-4 h-4" /><span>Locked</span></div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-[#FACC15]" />Global Leaderboard</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[{ name: 'Arun Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arun', level: 18, points: 15200 }, { name: 'Rahul Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', level: 15, points: 12500 }, { name: 'Vikram Singh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram', level: 14, points: 9800 }].map((u, i) => (
                  <div key={i} className={cn("flex items-center gap-4 p-4 rounded-xl", i < 3 && "bg-gradient-to-r from-[#FF6900]/5 to-[#FACC15]/5")}>
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", i === 0 && "bg-[#FACC15] text-yellow-800", i === 1 && "bg-gray-300 text-gray-700", i === 2 && "bg-amber-600 text-white", i > 2 && "bg-muted text-muted-foreground")}>{i + 1}</div>
                    <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-1"><div className="font-semibold">{u.name}</div><div className="text-sm text-muted-foreground">Level {u.level}</div></div>
                    <div className="text-right"><div className="font-bold text-[#FF6900]">{u.points.toLocaleString()}</div><div className="text-xs text-muted-foreground">Mi Coins</div></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
