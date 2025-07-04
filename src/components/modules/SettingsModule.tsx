
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Save, Upload, Download, Database, Clock, HardDrive } from 'lucide-react';
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
    backupLocation: '/backups/',
    backupRetention: '30',
    emailNotifications: true,
    reportFormat: 'PDF',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'America/Mexico_City'
  });

  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [lastBackup, setLastBackup] = useState<string | null>(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('systemSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Load company logo
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) {
      setCompanyLogo(savedLogo);
    }

    // Load last backup date
    const savedLastBackup = localStorage.getItem('lastBackupDate');
    if (savedLastBackup) {
      setLastBackup(savedLastBackup);
    }
  }, []);

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
        
        toast({
          title: "Logo Actualizado",
          description: "El logo de la empresa ha sido actualizado exitosamente",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    toast({
      title: t('settings_save'),
      description: "Los ajustes del sistema han sido guardados exitosamente",
    });
  };

  const handleCreateBackup = () => {
    // Simulate backup creation
    const backupData = {
      settings,
      users: JSON.parse(localStorage.getItem('systemUsers') || '[]'),
      products: JSON.parse(localStorage.getItem('systemProducts') || '[]'),
      equipments: JSON.parse(localStorage.getItem('systemEquipments') || '[]'),
      timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    // Update last backup date
    const currentDate = new Date().toISOString();
    setLastBackup(currentDate);
    localStorage.setItem('lastBackupDate', currentDate);
    
    toast({
      title: t('settings_backup_created'),
      description: t('settings_backup_downloaded'),
    });
  };

  const handleDownloadBackup = () => {
    handleCreateBackup(); // Same as create backup for now
  };

  const handleRestoreBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const backupData = JSON.parse(e.target?.result as string);
          
          // Restore all data
          if (backupData.settings) {
            setSettings(backupData.settings);
            localStorage.setItem('systemSettings', JSON.stringify(backupData.settings));
          }
          
          if (backupData.users) {
            localStorage.setItem('systemUsers', JSON.stringify(backupData.users));
          }
          
          if (backupData.products) {
            localStorage.setItem('systemProducts', JSON.stringify(backupData.products));
          }
          
          if (backupData.equipments) {
            localStorage.setItem('systemEquipments', JSON.stringify(backupData.equipments));
          }
          
          toast({
            title: "Respaldo Restaurado",
            description: "El respaldo ha sido restaurado exitosamente. Recarga la página para ver los cambios.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Error al restaurar el respaldo. Archivo inválido.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
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
        <h1 className="text-3xl font-bold text-foreground">{t('settings_title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('settings_subtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información de la Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {t('settings_company_info')}
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
            <CardTitle>{t('settings_system_config')}</CardTitle>
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

      {/* Configuración de Respaldo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t('settings_backup_config')}
          </CardTitle>
          <CardDescription>
            Configuración y gestión de respaldos del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings_backup_enabled')}</Label>
                  <p className="text-sm text-muted-foreground">Realizar respaldos automáticos</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupFrequency">{t('settings_backup_frequency')}</Label>
                <select
                  id="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupLocation">{t('settings_backup_location')}</Label>
                <Input
                  id="backupLocation"
                  value={settings.backupLocation}
                  onChange={(e) => handleSettingChange('backupLocation', e.target.value)}
                  placeholder="/backups/"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupRetention">{t('settings_backup_retention')} (días)</Label>
                <Input
                  id="backupRetention"
                  type="number"
                  value={settings.backupRetention}
                  onChange={(e) => handleSettingChange('backupRetention', e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Último Respaldo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {lastBackup ? new Date(lastBackup).toLocaleString() : 'Nunca'}
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="h-4 w-4" />
                  <span className="font-medium">Estado del Sistema</span>
                </div>
                <p className="text-sm text-green-600">Sistema funcionando correctamente</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t">
            <Button onClick={handleCreateBackup}>
              <Database className="mr-2 h-4 w-4" />
              {t('settings_backup_now')}
            </Button>
            
            <Button variant="outline" onClick={handleDownloadBackup}>
              <Download className="mr-2 h-4 w-4" />
              {t('settings_download_backup')}
            </Button>
            
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleRestoreBackup}
                className="hidden"
                id="restore-backup"
              />
              <label htmlFor="restore-backup">
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    {t('settings_restore_backup')}
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones de Configuración */}
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
              {t('settings_save')}
            </Button>
            
            <Button variant="outline" onClick={handleExportSettings}>
              <Download className="mr-2 h-4 w-4" />
              {t('settings_export')}
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
                    {t('settings_import')}
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
