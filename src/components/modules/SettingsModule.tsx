
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/validation';

interface SettingsModuleProps {
  userRole?: UserRole;
}

const SettingsModule = ({ userRole = 'administrador' }: SettingsModuleProps) => {
  const { t } = useLanguage();

  // Control de acceso
  if (userRole !== 'administrador') {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.access_restricted')}</CardTitle>
            <CardDescription>
              {t('dashboard.contact_administrator')}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('menu.settings')}</h1>
        <p className="text-muted-foreground mt-1">
          Configuración del sistema de validaciones
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
          <CardDescription>
            Ajustes y parámetros del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Módulo de configuración en desarrollo
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsModule;
