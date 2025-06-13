
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/validation';

interface UsersModuleProps {
  userRole?: UserRole;
}

const UsersModule = ({ userRole = 'administrador' }: UsersModuleProps) => {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('menu.users')}</h1>
          <p className="text-muted-foreground mt-1">
            Gestión de usuarios del sistema
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            Administra los usuarios del sistema de validaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Módulo de usuarios en desarrollo
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersModule;
