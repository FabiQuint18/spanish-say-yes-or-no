
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SettingsModule = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('menu.settings')}</h1>
          <p className="text-muted-foreground mt-1">
            Configuración del sistema
          </p>
        </div>
        <Button>
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
                <input 
                  type="text" 
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Mi Empresa S.A."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email de Administrador</label>
                <input 
                  type="email" 
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
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
                <input 
                  type="number" 
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="30"
                  min="1"
                  max="365"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Período de Revalidación (días)</label>
                <input 
                  type="number" 
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
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
