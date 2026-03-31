import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Users, Trophy, Smartphone, Shield } from 'lucide-react';
import { useAuthStore } from '@/store';
import { authApi } from '@/lib/api/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const features = [
  { icon: Users, title: '100K+ Members', description: 'Join the largest Mi fan community' },
  { icon: Trophy, title: 'Earn Rewards', description: 'Get Mi Coins for engagement' },
  { icon: Smartphone, title: 'Device Support', description: 'Get help from fellow Mi fans' },
  { icon: Shield, title: 'Verified Community', description: 'Authentic Xiaomi ecosystem' },
];

export function Login() {
  const navigate = useNavigate();
  const { setUser, setAuthenticated, setAccessToken, setLoading } = useAuthStore();
  const [isLoading, setIsLoadingState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingState(true);
    try {
      const response = await authApi.login(email, password);
      setUser(response.user);
      setAccessToken(response.token);
      setAuthenticated(true);
      setLoading(false);
      navigate('/');
    } catch (error) { console.error('Login failed:', error); }
    finally { setIsLoadingState(false); }
  };

  const handleGoogleLogin = async () => {
    setIsLoadingState(true);
    try {
      const response = await authApi.googleLogin('mock_token');
      setUser(response.user);
      setAccessToken(response.token);
      setAuthenticated(true);
      setLoading(false);
      navigate('/');
    } catch (error) { console.error('Google login failed:', error); }
    finally { setIsLoadingState(false); }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#FF6900] to-[#FACC15] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome to Mi Community India</h1>
            <p className="text-lg text-white/90 max-w-md">Join millions of Mi fans, share your experiences, earn rewards, and be part of something amazing.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20">
                <feature.icon className="w-8 h-8 mb-3 text-white" />
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#FF6900] to-[#FACC15] flex items-center justify-center mb-4">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Mi Community India</h1>
            <p className="text-muted-foreground">Join the Mi fan family</p>
          </div>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Choose your preferred sign in method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full gap-2 h-12" onClick={handleGoogleLogin} disabled={isLoading}>
                <Chrome className="w-5 h-5" /> Continue with Google
              </Button>
              <div className="relative"><div className="absolute inset-0 flex items-center"><Separator /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with email</span></div></div>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="name@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-[#FF6900] hover:bg-[#E55D00]" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}<ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleGoogleLogin(); }}>
                    <div className="space-y-2"><Label htmlFor="register-name">Full Name</Label><Input id="register-name" placeholder="John Doe" required /></div>
                    <div className="space-y-2"><Label htmlFor="register-email">Email</Label><Input id="register-email" type="email" placeholder="name@example.com" required /></div>
                    <div className="space-y-2"><Label htmlFor="register-password">Password</Label><Input id="register-password" type="password" placeholder="••••••••" required /></div>
                    <Button type="submit" className="w-full bg-[#FF6900] hover:bg-[#E55D00]" disabled={isLoading}>
                      Create Account<ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <p className="text-center text-sm text-muted-foreground">By continuing, you agree to our <a href="#" className="text-[#FF6900] hover:underline">Terms of Service</a> and <a href="#" className="text-[#FF6900] hover:underline">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  );
}
