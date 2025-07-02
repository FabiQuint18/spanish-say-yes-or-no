
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/validation';
import { useToast } from '@/hooks/use-toast';

interface UsersModuleProps {
  userRole?: UserRole;
}

const UsersModule = ({ userRole = 'administrador' }: UsersModuleProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    role: 'visualizador' as UserRole,
    password: ''
  });

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

  const handleNewUser = () => {
    setShowNewUserDialog(true);
  };

  const handleSaveUser = () => {
    // Simulate user creation
    console.log('Creating new user:', newUser);
    
    toast({
      title: "Usuario Creado",
      description: `Usuario ${newUser.full_name} creado exitosamente`,
    });

    // Reset form and close dialog
    setNewUser({
      full_name: '',
      email: '',
      role: 'visualizador' as UserRole,
      password: ''
    });
    setShowNewUserDialog(false);
  };

  const handleCloseDialog = () => {
    setShowNewUserDialog(false);
    setNewUser({
      full_name: '',
      email: '',
      role: 'visualizador' as UserRole,
      password: ''
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('menu.users')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('users.subtitle')}
          </p>
        </div>
        <Button onClick={handleNewUser}>
          <Plus className="mr-2 h-4 w-4" />
          {t('users.new')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('users.list')}</CardTitle>
          <CardDescription>
            {t('users.manage')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Módulo de usuarios en desarrollo
          </div>
        </CardContent>
      </Card>

      {/* New User Dialog */}
      <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('users.new')}</DialogTitle>
            <DialogDescription>
              Crear un nuevo usuario en el sistema
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">{t('users.name')}</Label>
              <Input
                id="full_name"
                value={newUser.full_name}
                onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                placeholder="Nombre completo del usuario"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('users.email')}</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="usuario@empresa.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                placeholder="Contraseña temporal"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{t('users.role')}</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value as UserRole})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">{t('roles.administrador')}</SelectItem>
                  <SelectItem value="coordinador">{t('roles.coordinador')}</SelectItem>
                  <SelectItem value="analista">{t('roles.analista')}</SelectItem>
                  <SelectItem value="visualizador">{t('roles.visualizador')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSaveUser}>
              {t('common.save')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersModule;
