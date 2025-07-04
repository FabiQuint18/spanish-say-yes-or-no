
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Download, Upload, Settings, Database, Building, Image } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

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

  const handleSaveCompanyInfo = () => {
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
    toast({
      title: "Información Guardada",
      description: "La información de la empresa ha sido guardada exitosamente",
    });
  };

  const handleSaveSystemSettings = () => {
    localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
    toast({
      title: "Configuración Guardada",
      description: "La configuración del sistema ha sido guardada exitosamente",
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

  const handleImportBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const backupData = JSON.parse(e.target?.result as string);
          
          // Restore data to localStorage
          if (backupData.companyInfo) {
            localStorage.setItem('companyInfo', JSON.stringify(backupData.companyInfo));
            setCompanyInfo(backupData.companyInfo);
          }
          if (backupData.systemSettings) {
            localStorage.setItem('systemSettings', JSON.stringify(backupData.systemSettings));
            setSystemSettings(backupData.systemSettings);
          }
          if (backupData.products) {
            localStorage.setItem('systemProducts', JSON.stringify(backupData.products));
          }
          if (backupData.equipments) {
            localStorage.setItem('systemEquipments', JSON.stringify(backupData.equipments));
          }
          if (backupData.users) {
            localStorage.setItem('systemUsers', JSON.stringify(backupData.users));
          }
          if (backupData.validations) {
            localStorage.setItem('systemValidations', JSON.stringify(backupData.validations));
          }

          toast({
            title: "Backup Restaurado",
            description: "El backup ha sido restaurado exitosamente",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Error al procesar el archivo de backup",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('settings_title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('settings_subtitle')}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Información de la Empresa
            </CardTitle>
            <CardDescription>
              Configuración de la información corporativa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Logo Section */}
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

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Dirección</Label>
              <Input
                id="companyAddress"
                value={companyInfo.address}
                onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                placeholder="Dirección completa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyPhone">Teléfono</Label>
              <Input
                id="companyPhone"
                value={companyInfo.phone}
                onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                placeholder="Número de teléfono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyEmail">Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={companyInfo.email}
                onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                placeholder="Email corporativo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Sitio Web</Label>
              <Input
                id="companyWebsite"
                value={companyInfo.website}
                onChange={(e) => handleCompanyInfoChange('website', e.target.value)}
                placeholder="www.empresa.com"
              />
            </div>

            <Button onClick={handleSaveCompanyInfo} className="w-full">
              Guardar Información
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración del Sistema
            </CardTitle>
            <CardDescription>
              Configuración general del comportamiento del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Backup Automático</Label>
                <p className="text-sm text-muted-foreground">Realizar backups automáticos del sistema</p>
              </div>
              <Switch
                checked={systemSettings.autoBackup}
                onCheckedChange={(checked) => handleSystemSettingChange('autoBackup', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Frecuencia de Backup</Label>
              <select
                id="backupFrequency"
                value={systemSettings.backupFrequency}
                onChange={(e) => handleSystemSettingChange('backupFrequency', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="daily">Diario</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-muted-foreground">Recibir notificaciones importantes por email</p>
              </div>
              <Switch
                checked={systemSettings.emailNotifications}
                onCheckedChange={(checked) => handleSystemSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Registro de Auditoría</Label>
                <p className="text-sm text-muted-foreground">Mantener registro de todas las acciones</p>
              </div>
              <Switch
                checked={systemSettings.auditTrail}
                onCheckedChange={(checked) => handleSystemSettingChange('auditTrail', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataRetention">Retención de Datos (días)</Label>
              <Input
                id="dataRetention"
                type="number"
                value={systemSettings.dataRetention}
                onChange={(e) => handleSystemSettingChange('dataRetention', parseInt(e.target.value))}
                placeholder="365"
              />
            </div>

            <Button onClick={handleSaveSystemSettings} className="w-full">
              Guardar Configuración
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Backup Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Gestión de Backup
          </CardTitle>
          <CardDescription>
            Herramientas para exportar e importar datos del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Exportar Backup</h4>
              <p className="text-sm text-muted-foreground">
                Descargar una copia de seguridad completa del sistema incluyendo todos los datos
              </p>
              <Button onClick={handleExportBackup} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Descargar Backup
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Importar Backup</h4>
              <p className="text-sm text-muted-foreground">
                Restaurar datos desde un archivo de backup previamente exportado
              </p>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Restaurar Backup
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Al importar un backup se sobrescribirán todos los datos actuales del sistema. 
              Asegúrese de tener una copia de seguridad actual antes de proceder.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsModule;
