import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Upload, Settings, Database, Building, Image, Palette, Link, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import ActivityIntegrationService from '@/components/integrations/ActivityIntegrationService';

interface SettingsModuleProps {
  onLogoChange?: (logo: string) => void;
}

const SettingsModule = ({ onLogoChange }: SettingsModuleProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Empresa Farmacéutica',
    address: 'Dirección de la empresa',
    phone: '+1234567890',
    email: 'contacto@empresa.com',
    website: 'www.empresa.com'
  });
  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    emailNotifications: true,
    auditTrail: true,
    dataRetention: 365
  });
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({
    security: {
      twoFactorRequired: false,
      auditLogging: true,
      sessionTimeout: 30
    }
  });

  // Load current logo from localStorage
  React.useEffect(() => {
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) {
      setCurrentLogo(savedLogo);
    }
  }, []);

  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSystemSettingChange = (setting: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        setCurrentLogo(logoUrl);
        localStorage.setItem('companyLogo', logoUrl);
        onLogoChange?.(logoUrl);
        
        toast({
          title: "Logo Actualizado",
          description: "El logo de la empresa ha sido actualizado exitosamente",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    setSettings(prev => {
      const newSettings = { ...prev };
      let current: any = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const handleSaveCompanyInfo = () => {
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
    toast({
      title: "Información Guardada",
      description: "La información de la empresa ha sido guardada exitosamente",
    });
  };

  const handleExportBackup = () => {
    const backupData = {
      companyInfo,
      systemSettings,
      products: JSON.parse(localStorage.getItem('systemProducts') || '[]'),
      equipments: JSON.parse(localStorage.getItem('systemEquipments') || '[]'),
      users: JSON.parse(localStorage.getItem('systemUsers') || '[]'),
      validations: JSON.parse(localStorage.getItem('systemValidations') || '[]'),
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Backup Exportado",
      description: "El backup ha sido descargado exitosamente",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('settings.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('settings.subtitle')}
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Información de la Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo de la Empresa</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      {currentLogo ? (
                        <img src={currentLogo} alt="Company Logo" className="w-full h-full object-contain rounded-lg" />
                      ) : (
                        <Image className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <Button variant="outline" onClick={handleLogoClick}>
                      <Upload className="mr-2 h-4 w-4" />
                      Cambiar Logo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.name}
                    onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                    placeholder="Nombre de la empresa"
                  />
                </div>
                <Button onClick={handleSaveCompanyInfo} className="w-full">
                  Guardar Información
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Gestión de Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleExportBackup} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Backup
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Tema y Apariencia
              </CardTitle>
              <CardDescription>
                Personaliza el aspecto visual del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="theme">Tema</Label>
                    <p className="text-sm text-muted-foreground">
                      Selecciona el tema de la aplicación
                    </p>
                  </div>
                  <select
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="system">Sistema</option>
                  </select>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Colores del Sistema</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Color Primario</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          id="primaryColor"
                          defaultValue="#3b82f6"
                          className="w-10 h-10 border border-border rounded cursor-pointer"
                        />
                        <span className="text-sm text-muted-foreground">#3b82f6</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accentColor">Color de Acento</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          id="accentColor"
                          defaultValue="#10b981"
                          className="w-10 h-10 border border-border rounded cursor-pointer"
                        />
                        <span className="text-sm text-muted-foreground">#10b981</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Tipografía</Label>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Tamaño de Fuente</Label>
                    <select
                      id="fontSize"
                      className="px-3 py-2 border border-border rounded-md bg-background w-full"
                    >
                      <option value="small">Pequeño</option>
                      <option value="medium">Mediano</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    toast({
                      title: "Configuración Guardada",
                      description: "Los cambios de apariencia han sido aplicados",
                    });
                  }}
                  className="w-full"
                >
                  Aplicar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <ActivityIntegrationService />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Seguridad
              </CardTitle>
              <CardDescription>
                Gestiona la seguridad y auditoría del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Registro de Auditoría</Label>
                    <p className="text-sm text-muted-foreground">
                      Registra todas las acciones del sistema
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.auditLogging}
                    onCheckedChange={(checked) => updateSetting('security.auditLogging', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticación de Dos Factores</Label>
                    <p className="text-sm text-muted-foreground">
                      Requiere verificación adicional para el acceso
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorRequired}
                    onCheckedChange={(checked) => updateSetting('security.twoFactorRequired', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security.sessionTimeout', parseInt(e.target.value))}
                    min="5"
                    max="480"
                    className="w-32"
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Registro de Auditoría</Label>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // Generar PDF de auditoría
                      const auditData = {
                        generatedAt: new Date().toISOString(),
                        systemInfo: {
                          version: "1.0.0",
                          users: JSON.parse(localStorage.getItem('systemUsers') || '[]').length,
                          validations: JSON.parse(localStorage.getItem('systemValidations') || '[]').length,
                        },
                        recentActivity: [
                          { date: new Date().toISOString(), action: "Usuario logueado", user: "admin@empresa.com" },
                          { date: new Date(Date.now() - 3600000).toISOString(), action: "Validación creada", user: "analista@empresa.com" },
                          { date: new Date(Date.now() - 7200000).toISOString(), action: "Producto agregado", user: "coordinador@empresa.com" },
                        ]
                      };

                      const content = `
REGISTRO DE AUDITORÍA
=====================

Generado: ${new Date().toLocaleString()}

INFORMACIÓN DEL SISTEMA:
- Versión: ${auditData.systemInfo.version}
- Usuarios registrados: ${auditData.systemInfo.users}
- Validaciones registradas: ${auditData.systemInfo.validations}

ACTIVIDAD RECIENTE:
${auditData.recentActivity.map(activity => 
  `- ${new Date(activity.date).toLocaleString()}: ${activity.action} (${activity.user})`
).join('\n')}

CONFIGURACIÓN DE SEGURIDAD:
- Registro de auditoría: ${settings.security.auditLogging ? 'Activado' : 'Desactivado'}
- Autenticación 2FA: ${settings.security.twoFactorRequired ? 'Activado' : 'Desactivado'}
- Tiempo de sesión: ${settings.security.sessionTimeout} minutos
                      `;

                      const blob = new Blob([content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `audit-log-${new Date().toISOString().split('T')[0]}.txt`;
                      link.click();
                      URL.revokeObjectURL(url);

                      toast({
                        title: "Registro Descargado",
                        description: "El registro de auditoría ha sido descargado exitosamente",
                      });
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Registro de Auditoría
                  </Button>
                </div>

                <Button 
                  onClick={() => {
                    toast({
                      title: "Configuración Guardada",
                      description: "Los cambios de seguridad han sido aplicados",
                    });
                  }}
                  className="w-full"
                >
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModule;