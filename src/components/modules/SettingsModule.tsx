
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const SettingsModule = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('Mi Empresa S.A.');
  const [adminEmail, setAdminEmail] = useState('admin@empresa.com');
  const [alertDays, setAlertDays] = useState('30');
  const [revalidationPeriod, setRevalidationPeriod] = useState('365');

  const handleSaveChanges = () => {
    // Simulate saving changes
    toast({
      title: "Configuración Guardada",
      description: "Los cambios han sido guardados exitosamente",
    });
    
    // Here you would typically save to a database or API
    console.log('Saving settings:', {
      companyName,
      adminEmail,
      alertDays,
      revalidationPeriod
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('menu.settings')}</h1>
          <p className="text-muted-foreground mt-1">
            Configuración del sistema
          </p>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>
              Configuraciones básicas del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre de la Empresa</label>
                <Input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full mt-1"
                  placeholder="Mi Empresa S.A."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email de Administrador</label>
                <Input 
                  type="email" 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full mt-1"
                  placeholder="admin@empresa.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Validaciones</CardTitle>
            <CardDescription>
              Configuraciones específicas para validaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Días de Alerta (Próximo a Vencer)</label>
                <Input 
                  type="number" 
                  value={alertDays}
                  onChange={(e) => setAlertDays(e.target.value)}
                  className="w-full mt-1"
                  placeholder="30"
                  min="1"
                  max="365"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Período de Revalidación (días)</label>
                <Input 
                  type="number" 
                  value={revalidationPeriod}
                  onChange={(e) => setRevalidationPeriod(e.target.value)}
                  className="w-full mt-1"
                  placeholder="365"
                  min="30"
                  max="1825"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsModule;
