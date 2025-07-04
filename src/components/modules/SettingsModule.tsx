
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Save, Upload, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const SettingsModule = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    companyName: 'Farmacéutica XYZ',
    companyAddress: 'Calle Principal 123, Ciudad',
    companyPhone: '+1234567890',
    companyEmail: 'info@farmaceutica.com',
    systemTitle: 'Sistema de Validaciones',
    autoBackup: true,
    backupFrequency: 'daily',
    emailNotifications: true,
    reportFormat: 'PDF',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'America/Mexico_City'
  });

  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        setCompanyLogo(logoUrl);
        localStorage.setItem('companyLogo', logoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    toast({
      title: "Configuración Guardada",
      description: "Los ajustes del sistema han sido guardados exitosamente",
    });
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'system-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Configuración Exportada",
      description: "La configuración ha sido exportada exitosamente",
    });
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          toast({
            title: "Configuración Importada",
            description: "La configuración ha sido importada exitosamente",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Error al importar la configuración",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuración del Sistema</h1>
        <p className="text-muted-foreground mt-1">
          Configuración general del sistema de validaciones
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información de la Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Información de la Empresa
            </CardTitle>
            <CardDescription>
              Configurar datos de la empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => handleSettingChange('companyName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Dirección</Label>
              <Textarea
                id="companyAddress"
                value={settings.companyAddress}
                onChange={(e) => handleSettingChange('companyAddress', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyPhone">Teléfono</Label>
              <Input
                id="companyPhone"
                value={settings.companyPhone}
                onChange={(e) => handleSettingChange('companyPhone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyEmail">Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={settings.companyEmail}
                onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-upload">Logo de la Empresa</Label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {companyLogo && (
                <div className="mt-2">
                  <img src={companyLogo} alt="Company Logo" className="h-16 w-16 object-contain border rounded" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Configuración del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración del Sistema</CardTitle>
            <CardDescription>
              Ajustes generales del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="systemTitle">Título del Sistema</Label>
              <Input
                id="systemTitle"
                value={settings.systemTitle}
                onChange={(e) => handleSettingChange('systemTitle', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Formato de Fecha</Label>
              <select
                id="dateFormat"
                value={settings.dateFormat}
                onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Zona Horaria</Label>
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="America/Mexico_City">América/Ciudad de México</option>
                <option value="America/New_York">América/Nueva York</option>
                <option value="Europe/Madrid">Europa/Madrid</option>
                <option value="America/Sao_Paulo">América/São Paulo</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Respaldo Automático</Label>
                <p className="text-sm text-muted-foreground">Realizar respaldos automáticos</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-muted-foreground">Enviar notificaciones automáticas</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Configuración</CardTitle>
          <CardDescription>
            Importar, exportar y guardar configuraciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Guardar Configuración
            </Button>
            
            <Button variant="outline" onClick={handleExportSettings}>
              <Download className="mr-2 h-4 w-4" />
              Exportar Configuración
            </Button>
            
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="hidden"
                id="import-settings"
              />
              <label htmlFor="import-settings">
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Importar Configuración
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsModule;
