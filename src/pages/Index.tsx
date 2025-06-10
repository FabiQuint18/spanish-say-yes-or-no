import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import ProductsModule from '@/components/modules/ProductsModule';
import ValidationsModule from '@/components/modules/ValidationsModule';
import EquipmentsModule from '@/components/modules/EquipmentsModule';
import UsersModule from '@/components/modules/UsersModule';
import SettingsModule from '@/components/modules/SettingsModule';
import LanguageSelector from '@/components/ui/language-selector';
import { UserRole } from '@/types/validation';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('visualizador');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          // Here you would fetch the user role from your database
          // For now, we'll set a default role
          setUserRole('administrador'); // This should come from your users table
        }
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setUserRole('administrador'); // Fetch actual role from database
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: t('login.logout'),
        description: t('login.logoutSuccess'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('login.logoutError'),
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: t('login.success'),
        description: t('login.welcome'),
      });
    } catch (error: any) {
      toast({
        title: t('login.error'),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (tab: string) => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'products':
        return <ProductsModule />;
      case 'validations':
        return <ValidationsModule />;
      case 'equipments':
        return <EquipmentsModule />;
      case 'users':
        return <UsersModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          userRole={userRole}
          alertCounts={{ expiring: 5, expired: 2 }}
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onLogin }: { onLogin: (email: string, password: string) => void }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onLogin(email, password);
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'azure') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) throw error;

      toast({
        title: t('login.redirecting'),
        description: t('login.socialLogin', { provider: provider === 'google' ? 'Google' : 'Microsoft' }),
      });
    } catch (error: any) {
      console.error('Social login error:', error);
      toast({
        title: t('login.error'),
        description: t('login.socialError'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">V</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-muted-foreground">{t('system.subtitle')}</p>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center">
          <LanguageSelector />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="w-full bg-background hover:bg-accent hover:text-accent-foreground border-border"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('login.continueGoogle')}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('azure')}
            disabled={loading}
            className="w-full bg-background hover:bg-accent hover:text-accent-foreground border-border"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4z"/>
              <path fill="currentColor" d="M24 11.4H12.6V0H24v11.4z"/>
            </svg>
            {t('login.continueMicrosoft')}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">{t('login.orContinue')}</span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              {t('login.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              {t('login.password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
          >
            {loading ? t('login.loading') : t('login.button')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
