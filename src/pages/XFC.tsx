import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Trophy, Calendar, Flame, Plus } from 'lucide-react';
import { xfcApi } from '@/lib/api/mockData';
import type { XFCClub } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const regions = ['All', 'North', 'South', 'East', 'West'];

function CityCard({ club, onClick }: { club: XFCClub; onClick: () => void }) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group overflow-hidden" onClick={onClick}>
      <div className="relative h-32 bg-gradient-to-br from-[#FF6900]/20 to-[#FACC15]/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-[#FF6900]/40 group-hover:scale-110 transition-transform" />
        </div>
        <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">{club.region}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{club.cityName}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="w-4 h-4" />{club.memberCount.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function XFC() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState<XFCClub[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [, setIsLoading] = useState(true);
  const [globalLeaderboard, setGlobalLeaderboard] = useState<XFCClub[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [clubsData, leaderboardData] = await Promise.all([xfcApi.getClubs(), xfcApi.getGlobalLeaderboard()]);
        setClubs(clubsData);
        setGlobalLeaderboard(leaderboardData);
      } catch (error) { console.error('Failed to load XFC data:', error); }
      finally { setIsLoading(false); }
    };
    loadData();
  }, []);

  const filteredClubs = selectedRegion === 'All' ? clubs : clubs.filter(c => c.region === selectedRegion);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">XFC Clubs</h1>
          <p className="text-muted-foreground">Join your city's Xiaomi Fan Club community</p>
        </div>
        <Button className="bg-[#FF6900] hover:bg-[#E55D00] gap-2"><Plus className="w-4 h-4" />Find My City</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#FF6900]/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-[#FF6900]" /></div><div><div className="text-2xl font-bold">24</div><div className="text-xs text-muted-foreground">Cities</div></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#FACC15]/10 flex items-center justify-center"><Users className="w-5 h-5 text-[#FACC15]" /></div><div><div className="text-2xl font-bold">125K+</div><div className="text-xs text-muted-foreground">Members</div></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><Calendar className="w-5 h-5 text-green-500" /></div><div><div className="text-2xl font-bold">48</div><div className="text-xs text-muted-foreground">Events</div></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Trophy className="w-5 h-5 text-blue-500" /></div><div><div className="text-2xl font-bold">₹2.5M</div><div className="text-xs text-muted-foreground">Rewards</div></div></CardContent></Card>
      </div>
      <Tabs defaultValue="clubs" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="clubs">All Clubs</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="clubs" className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => <Button key={region} variant={selectedRegion === region ? 'default' : 'outline'} size="sm" onClick={() => setSelectedRegion(region)} className={cn(selectedRegion === region && "bg-[#FF6900] hover:bg-[#E55D00]")}>{region}</Button>)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClubs.map((club) => <CityCard key={club.id} club={club} onClick={() => navigate(`/xfc/${club.cityName.toLowerCase()}`)} />)}
          </div>
        </TabsContent>
        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-[#FACC15]" />Top Cities</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {globalLeaderboard.slice(0, 10).map((club, idx) => (
                  <div key={club.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", idx === 0 && "bg-[#FACC15] text-yellow-800", idx === 1 && "bg-gray-300 text-gray-700", idx === 2 && "bg-amber-600 text-white", idx > 2 && "bg-muted text-muted-foreground")}>{idx + 1}</div>
                    <div className="flex-1"><div className="font-medium">{club.cityName}</div><div className="text-xs text-muted-foreground">{club.region} Region</div></div>
                    <div className="text-right"><div className="font-semibold text-[#FF6900]">{club.memberCount.toLocaleString()}</div><div className="text-xs text-muted-foreground">members</div></div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Flame className="w-5 h-5 text-[#FF6900]" />Top Contributors</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[{ name: 'Arun Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arun', level: 18, points: 15200 }, { name: 'Rahul Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', level: 15, points: 12500 }, { name: 'Vikram Singh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram', level: 14, points: 9800 }].map((user, idx) => (
                  <div key={idx} className={cn("flex items-center gap-4 p-3 rounded-xl", idx < 3 && "bg-gradient-to-r from-[#FF6900]/5 to-[#FACC15]/5")}>
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", idx === 0 && "bg-[#FACC15] text-yellow-800", idx === 1 && "bg-gray-300 text-gray-700", idx === 2 && "bg-amber-600 text-white", idx > 2 && "bg-muted text-muted-foreground")}>{idx + 1}</div>
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1"><div className="font-medium">{user.name}</div><div className="text-xs text-muted-foreground">Level {user.level}</div></div>
                    <div className="flex items-center gap-1 text-[#FF6900] font-semibold"><Trophy className="w-4 h-4" />{user.points.toLocaleString()}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="events" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{ title: 'Mumbai XFC Tech Talk', city: 'Mumbai', date: new Date('2024-04-15T18:00:00'), attendees: 85, maxCapacity: 100 }, { title: 'Delhi Photography Walk', city: 'Delhi', date: new Date('2024-04-20T07:00:00'), attendees: 32, maxCapacity: 50 }, { title: 'Bangalore Gaming Tournament', city: 'Bangalore', date: new Date('2024-04-10T14:00:00'), attendees: 48, maxCapacity: 64 }].map((event, idx) => (
              <Card key={idx} className="overflow-hidden">
                <div className="h-24 bg-gradient-to-br from-[#FF6900]/20 to-[#FACC15]/20 flex items-center justify-center"><Calendar className="w-10 h-10 text-[#FF6900]/40" /></div>
                <CardContent className="p-4">
                  <Badge className="mb-2" variant="secondary">{event.city}</Badge>
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <div className="text-sm text-muted-foreground mb-3">{format(event.date, 'MMM d, yyyy • h:mm a')}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm"><span className="text-[#FF6900] font-semibold">{event.attendees}</span><span className="text-muted-foreground"> / {event.maxCapacity} going</span></div>
                    <Button size="sm" variant="outline">RSVP</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
