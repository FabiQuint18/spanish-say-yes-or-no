
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/validation';

interface SettingsModuleProps {
  userRole?: UserRole;
}

const SettingsModule = ({ userRole = 'administrador' }: SettingsModuleProps) => {
  const { t } = useLanguage();

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
