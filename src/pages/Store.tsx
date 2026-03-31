import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Star, Heart, ArrowRight, Zap, Percent, Smartphone, Headphones, Watch } from 'lucide-react';
import { productsApi } from '@/lib/api/mockData';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All', icon: ShoppingBag },
  { id: 'Smartphones', name: 'Phones', icon: Smartphone },
  { id: 'Audio', name: 'Audio', icon: Headphones },
  { id: 'Wearables', name: 'Wearables', icon: Watch },
];

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {product.discountPercent > 0 && <Badge className="absolute top-3 left-3 bg-[#FF6900] text-white">-{product.discountPercent}%</Badge>}
        <button onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors">
          <Heart className={cn("w-4 h-4", isLiked && "fill-red-500 text-red-500")} />
        </button>
        {product.discountPercent > 15 && <div className="absolute bottom-3 left-3"><Badge variant="secondary" className="gap-1"><Zap className="w-3 h-3 text-[#FF6900]" />Flash Sale</Badge></div>}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" /><span className="text-sm font-medium">{product.communityRating}</span></div>
          <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#FF6900]">₹{product.currentPrice.toLocaleString()}</span>
          {product.marketingPrice > product.currentPrice && <span className="text-sm text-muted-foreground line-through">₹{product.marketingPrice.toLocaleString()}</span>}
        </div>
        <Button className="w-full mt-3 bg-[#FF6900] hover:bg-[#E55D00]" onClick={() => navigate(`/product/${product.id}`)}>View Details<ArrowRight className="w-4 h-4 ml-2" /></Button>
      </CardContent>
    </Card>
  );
}

function FlashSaleCard() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 15 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(p => { if (p.seconds > 0) return { ...p, seconds: p.seconds - 1 }; if (p.minutes > 0) return { ...p, minutes: p.minutes - 1, seconds: 59 }; if (p.hours > 0) return { ...p, hours: p.hours - 1, minutes: 59, seconds: 59 }; return p; });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-[#FF6900] to-[#FACC15] text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Badge className="bg-white/20 text-white border-0 mb-2 gap-1"><Zap className="w-3 h-3" />Flash Sale</Badge>
            <h3 className="text-2xl font-bold">Xiaomi 14 Ultra</h3>
            <p className="text-white/80">Limited time offer</p>
          </div>
          <div className="text-right"><p className="text-3xl font-bold">₹99,999</p><p className="text-white/60 line-through">₹1,09,999</p></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {['hours', 'minutes', 'seconds'].map((unit, i) => (
              <div key={unit} className="flex items-center">
                <div className="bg-white/20 rounded-lg px-3 py-2 text-center min-w-[50px]"><div className="text-xl font-bold">{String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, '0')}</div><div className="text-xs text-white/60">{unit.toUpperCase().slice(0, 3)}</div></div>
                {i < 2 && <span className="text-2xl mx-1">:</span>}
              </div>
            ))}
          </div>
          <Button className="ml-auto bg-white text-[#FF6900] hover:bg-white/90">Shop Now<ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const [all, featured] = await Promise.all([productsApi.getProducts(), productsApi.getFeaturedProducts()]);
      setProducts(all);
      setFeaturedProducts(featured);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) && (activeCategory === 'all' || p.category === activeCategory));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold">Mi Store</h1><p className="text-muted-foreground">Discover the latest Xiaomi products</p></div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 w-full sm:w-64" />
          </div>
        </div>
      </div>
      <FlashSaleCard />
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="w-full flex-wrap h-auto gap-2">
          {categories.map((c) => <TabsTrigger key={c.id} value={c.id} className="gap-2"><c.icon className="w-4 h-4" />{c.name}</TabsTrigger>)}
        </TabsList>
        <TabsContent value={activeCategory} className="mt-6">
          {activeCategory === 'all' && !searchQuery && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Featured Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />) : featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{activeCategory === 'all' ? 'All Products' : categories.find(c => c.id === activeCategory)?.name}</h2>
              <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />) : filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[{ icon: Percent, title: 'Exclusive Discounts', desc: 'Up to 20% off for XFC members', color: '[#FF6900]' }, { icon: Zap, title: 'Early Access', desc: 'Be the first to buy new products', color: '[#FACC15]' }, { icon: Star, title: 'Community Reviews', desc: 'Real feedback from Mi fans', color: 'green-500' }].map((b, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", `bg-${b.color}/10`)}>
                  <b.icon className={cn("w-6 h-6", `text-${b.color}`)} />
                </div>
                <div><h4 className="font-semibold">{b.title}</h4><p className="text-sm text-muted-foreground">{b.desc}</p></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
