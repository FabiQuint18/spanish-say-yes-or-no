import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Mail, Lock, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import Dashboard from '@/components/dashboard/Dashboard';
import ValidationsModule from '@/components/modules/ValidationsModule';
import ProductsModule from '@/components/modules/ProductsModule';
import EquipmentsModule from '@/components/modules/EquipmentsModule';
import UsersModule from '@/components/modules/UsersModule';
import SecurityModule from '@/components/modules/SecurityModule';
import SettingsModule from '@/components/modules/SettingsModule';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import LanguageSelector from '@/components/ui/language-selector';
import { UserRole } from '@/types/validation';
import { useLanguage } from '@/contexts/LanguageContext';

// Demo users with valid credentials
const DEMO_USERS = {
  'admin@company.com': { 
    password: 'Admin123!', 
    role: 'administrador' as UserRole,
    name: 'Administrador del Sistema',
    failedAttempts: 0,
    locked: false,
    lastActivity: Date.now()
  },
  'coordinador@company.com': { 
    password: 'Coord123!', 
    role: 'coordinador' as UserRole,
    name: 'Coordinador de Validaciones',
    failedAttempts: 0,
    locked: false,
    lastActivity: Date.now()
  },
  'analista@company.com': { 
    password: 'Analyst123!', 
    role: 'analista' as UserRole,
    name: 'Analista de Calidad',
    failedAttempts: 0,
    locked: false,
    lastActivity: Date.now()
  },
  'viewer@company.com': { 
    password: 'Viewer123!', 
    role: 'visualizador' as UserRole,
    name: 'Visualizador',
    failedAttempts: 0,
    locked: false,
    lastActivity: Date.now()
  }
};

const MAX_FAILED_ATTEMPTS = 3;
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutos en millisegundos

const Index = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole>('visualizador');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState(DEMO_USERS);

  // Verificar inactividad cada minuto
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const currentUser = users[user.email as keyof typeof users];
      if (currentUser && Date.now() - currentUser.lastActivity > INACTIVITY_TIMEOUT) {
        console.log('Usuario inactivo por más de 5 minutos, cerrando sesión automáticamente');
        toast.warning('Sesión cerrada por inactividad (5 minutos)');
        handleLogout();
      }
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [user, users]);

  // Actualizar actividad del usuario
  const updateUserActivity = () => {
    if (user) {
      setUsers(prev => ({
        ...prev,
        [user.email]: {
          ...prev[user.email as keyof typeof prev],
          lastActivity: Date.now()
        }
      }));
    }
  };

  // Escuchar actividad del usuario
  useEffect(() => {
    if (user) {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      const handleActivity = () => {
        updateUserActivity();
      };

      events.forEach(event => {
        document.addEventListener(event, handleActivity, true);
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleActivity, true);
        });
      };
    }
  }, [user]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Para usuarios de Supabase, usar rol por defecto
        setUserRole('analista');
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Verificar si es un usuario demo
      const demoUser = users[email as keyof typeof users];
      
      if (demoUser) {
        // Verificar si la cuenta está bloqueada
        if (demoUser.locked) {
          setError('Cuenta bloqueada por múltiples intentos fallidos. Contacte al administrador.');
          setIsLoading(false);
          return;
        }

        // Verificar contraseña
        if (demoUser.password === password) {
          // Login exitoso - resetear intentos fallidos
          setUsers(prev => ({
            ...prev,
            [email]: {
              ...prev[email as keyof typeof prev],
              failedAttempts: 0,
              lastActivity: Date.now()
            }
          }));

          const mockUser = {
            email,
            user_metadata: { full_name: demoUser.name },
            id: `demo_${email}`
          };
          setUser(mockUser);
          setUserRole(demoUser.role);
          
          console.log(`Login exitoso para ${demoUser.name} (${demoUser.role})`);
          toast.success(`Bienvenido ${demoUser.name}`);
        } else {
          // Contraseña incorrecta - incrementar intentos fallidos
          const newFailedAttempts = demoUser.failedAttempts + 1;
          const shouldLock = newFailedAttempts >= MAX_FAILED_ATTEMPTS;
          
          setUsers(prev => ({
            ...prev,
            [email]: {
              ...prev[email as keyof typeof prev],
              failedAttempts: newFailedAttempts,
              locked: shouldLock
            }
          }));

          if (shouldLock) {
            setError(`Cuenta bloqueada después de ${MAX_FAILED_ATTEMPTS} intentos fallidos. Contacte al administrador.`);
            console.log(`Cuenta bloqueada para usuario: ${email}`);
          } else {
            setError(`Contraseña incorrecta. Intentos restantes: ${MAX_FAILED_ATTEMPTS - newFailedAttempts}`);
          }
        }
      } else {
        // Intentar login con Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError('Email o contraseña incorrectos');
        } else {
          toast.success('Inicio de sesión exitoso');
        }
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Error durante el inicio de sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'microsoft') => {
    setIsLoading(true);
    setError('');

    try {
      let redirectTo = `${window.location.origin}`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider === 'microsoft' ? 'azure' : provider,
        options: {
          redirectTo: redirectTo,
        },
      });

      if (error) {
        console.error(`Error con login ${provider}:`, error);
        setError(`Error al iniciar sesión con ${provider}`);
      }
    } catch (error) {
      console.error(`Error durante login ${provider}:`, error);
      setError(`Error durante el inicio de sesión con ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (user?.id?.startsWith('demo_')) {
        // Para usuarios demo, solo limpiar el estado local
        setUser(null);
        setUserRole('visualizador');
        setActiveTab('dashboard');
        console.log('Logout de usuario demo exitoso');
      } else {
        // Para usuarios de Supabase
        await supabase.auth.signOut();
      }
      toast.success('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error durante logout:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole={user?.user_metadata?.role || 'visualizador'} />;
      case 'validations':
        return <ValidationsModule userRole={user?.user_metadata?.role || 'visualizador'} />;
      case 'products':
        return <ProductsModule userRole={user?.user_metadata?.role || 'visualizador'} />;
      case 'equipments':
        return <EquipmentsModule userRole={user?.user_metadata?.role || 'visualizador'} />;
      case 'users':
        return <UsersModule />;
      case 'security':
        return <SecurityModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <Dashboard userRole={user?.user_metadata?.role || 'visualizador'} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">{t('system.title')}</CardTitle>
                <CardDescription className="text-base">{t('system.subtitle')}</CardDescription>
              </div>
              {/* Selector de idiomas restaurado */}
              <div className="flex justify-center">
                <LanguageSelector />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Credenciales de demostración */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3">Credenciales de Demostración:</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Administrador:</strong> admin@company.com / Admin123!</div>
                  <div><strong>Coordinador:</strong> coordinador@company.com / Coord123!</div>
                  <div><strong>Analista:</strong> analista@company.com / Analyst123!</div>
                  <div><strong>Visualizador:</strong> viewer@company.com / Viewer123!</div>
                </div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin('microsoft')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#f25022" d="M1 1h10v10H1z"/>
                    <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                    <path fill="#7fba00" d="M1 13h10v10H1z"/>
                    <path fill="#ffb900" d="M13 13h10v10H13z"/>
                  </svg>
                  Microsoft
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Sistema de Validaciones CFR 21 Parte 11</p>
                <p className="mt-1">Seguridad, Trazabilidad y Cumplimiento</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          userRole={userRole}
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
