
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ClipboardCheck, 
  Package, 
  Users, 
  Settings, 
  Shield,
  Monitor,
  LogOut,
  Languages,
  Search,
  Bell
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/dashboard/Dashboard';
import ValidationsModule from '@/components/modules/ValidationsModule';
import ProductsModule from '@/components/modules/ProductsModule';
import EquipmentsModule from '@/components/modules/EquipmentsModule';
import UsersModule from '@/components/modules/UsersModule';
import SecurityModule from '@/components/modules/SecurityModule';
import SettingsModule from '@/components/modules/SettingsModule';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole, Language } from '@/types/validation';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  last_login?: string;
}

const Index = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock users for demonstration
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@company.com',
      full_name: 'Administrador Sistema',
      role: 'administrador',
      last_login: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      email: 'coordinador@company.com',
      full_name: 'Coordinador QA',
      role: 'coordinador',
      last_login: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      email: 'analista@company.com',
      full_name: 'Analista QC',
      role: 'analista',
      last_login: '2024-01-15T08:45:00Z'
    },
    {
      id: '4',
      email: 'viewer@company.com',
      full_name: 'Visualizador',
      role: 'visualizador',
      last_login: '2024-01-14T16:20:00Z'
    }
  ];

  // Mock passwords for demonstration (in real app, these would be hashed)
  const mockPasswords: Record<string, string> = {
    'admin@company.com': 'Admin123!',
    'coordinador@company.com': 'Coord123!',
    'analista@company.com': 'Analyst123!',
    'viewer@company.com': 'Viewer123!'
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      const user = mockUsers.find(u => u.email === loginData.email);
      const expectedPassword = mockPasswords[loginData.email];

      if (user && expectedPassword === loginData.password) {
        const updatedUser = {
          ...user,
          last_login: new Date().toISOString()
        };
        
        setCurrentUser(updatedUser);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        toast({
          title: t('login.success'),
          description: t('login.welcome'),
        });
      } else {
        toast({
          title: t('login.error'),
          description: 'Credenciales inválidas',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('login.error'),
        description: 'Error al conectar con el servidor',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveModule('dashboard');
    localStorage.removeItem('currentUser');
    setLoginData({ email: '', password: '' });
    
    toast({
      title: t('login.logout'),
      description: t('login.logoutSuccess'),
    });
  };

  const renderModule = () => {
    const userRole = currentUser?.role || 'visualizador';
    
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'products':
        return <ProductsModule userRole={userRole} />;
      case 'validations':
        return <ValidationsModule userRole={userRole} />;
      case 'equipments':
        return <EquipmentsModule userRole={userRole} />;
      case 'users':
        return <UsersModule userRole={userRole} />;
      case 'security':
        return <SecurityModule userRole={userRole} />;
      case 'settings':
        return <SettingsModule userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{t('login.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('system.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('login.loading') : t('login.button')}
              </Button>
            </form>
            
            {/* Demo credentials info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Credenciales de Demostración:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div><strong>Administrador:</strong> admin@company.com / Admin123!</div>
                <div><strong>Coordinador:</strong> coordinador@company.com / Coord123!</div>
                <div><strong>Analista:</strong> analista@company.com / Analyst123!</div>
                <div><strong>Visualizador:</strong> viewer@company.com / Viewer123!</div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        userRole={currentUser?.role || 'visualizador'}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;
