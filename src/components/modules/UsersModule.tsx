
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Users, Plus, Edit, Trash2, Shield, Key } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/validation';
import { useToast } from '@/hooks/use-toast';

interface UsersModuleProps {
  userRole?: UserRole;
}

interface Permission {
  module: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface RolePermissions {
  [key: string]: Permission[];
}

const UsersModule = ({ userRole = 'administrador' }: UsersModuleProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    role: 'visualizador' as UserRole,
  });

  // Control de acceso
  if (userRole !== 'administrador') {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>
              Solo los administradores pueden gestionar usuarios
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const rolePermissions: RolePermissions = {
    administrador: [
      { module: 'Dashboard', create: true, read: true, update: true, delete: true },
      { module: 'Validaciones', create: true, read: true, update: true, delete: true },
      { module: 'Productos', create: true, read: true, update: true, delete: true },
      { module: 'Equipos', create: true, read: true, update: true, delete: true },
      { module: 'Usuarios', create: true, read: true, update: true, delete: true },
      { module: 'Seguridad', create: true, read: true, update: true, delete: true },
      { module: 'Configuración', create: true, read: true, update: true, delete: true },
    ],
    coordinador: [
      { module: 'Dashboard', create: false, read: true, update: false, delete: false },
      { module: 'Validaciones', create: true, read: true, update: true, delete: true },
      { module: 'Productos', create: true, read: true, update: true, delete: false },
      { module: 'Equipos', create: true, read: true, update: true, delete: false },
      { module: 'Usuarios', create: false, read: true, update: false, delete: false },
      { module: 'Seguridad', create: false, read: true, update: false, delete: false },
      { module: 'Configuración', create: false, read: false, update: false, delete: false },
    ],
    analista: [
      { module: 'Dashboard', create: false, read: true, update: false, delete: false },
      { module: 'Validaciones', create: true, read: true, update: true, delete: false },
      { module: 'Productos', create: false, read: true, update: false, delete: false },
      { module: 'Equipos', create: false, read: true, update: false, delete: false },
      { module: 'Usuarios', create: false, read: false, update: false, delete: false },
      { module: 'Seguridad', create: false, read: false, update: false, delete: false },
      { module: 'Configuración', create: false, read: false, update: false, delete: false },
    ],
    visualizador: [
      { module: 'Dashboard', create: false, read: true, update: false, delete: false },
      { module: 'Validaciones', create: false, read: true, update: false, delete: false },
      { module: 'Productos', create: false, read: true, update: false, delete: false },
      { module: 'Equipos', create: false, read: true, update: false, delete: false },
      { module: 'Usuarios', create: false, read: false, update: false, delete: false },
      { module: 'Seguridad', create: false, read: false, update: false, delete: false },
      { module: 'Configuración', create: false, read: false, update: false, delete: false },
    ],
  };

  const handleNewUser = () => {
    setShowNewUserDialog(true);
  };

  const handleSaveUser = () => {
    // Validate required fields
    if (!newUser.full_name || !newUser.email) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Simulate user creation
    console.log('Creating new user:', newUser);
    
    toast({
      title: "Usuario Creado",
      description: `Usuario ${newUser.full_name} creado exitosamente. Se ha enviado un correo para establecer la contraseña.`,
    });

    // Reset form and close dialog
    setNewUser({
      full_name: '',
      email: '',
      role: 'visualizador' as UserRole,
    });
    setShowNewUserDialog(false);
  };

  const handleCloseDialog = () => {
    setShowNewUserDialog(false);
    setNewUser({
      full_name: '',
      email: '',
      role: 'visualizador' as UserRole,
    });
  };

  const getActionIcon = (allowed: boolean) => {
    return allowed ? '✓' : '✗';
  };

  const getActionColor = (allowed: boolean) => {
    return allowed ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('menu_users')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('users_subtitle')}
          </p>
        </div>
        <Button onClick={handleNewUser}>
          <Plus className="mr-2 h-4 w-4" />
          {t('users_new')}
        </Button>
      </div>

      {/* Lista de Usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>{t('users_list')}</CardTitle>
          <CardDescription>
            {t('users_manage')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Módulo de gestión de usuarios en desarrollo
          </div>
        </CardContent>
      </Card>

      {/* Matriz de Acceso por Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Matriz de Acceso por Roles
          </CardTitle>
          <CardDescription>
            Permisos de cada rol en los diferentes módulos del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rol</TableHead>
                  <TableHead>Módulo</TableHead>
                  <TableHead className="text-center">Crear</TableHead>
                  <TableHead className="text-center">Leer</TableHead>
                  <TableHead className="text-center">Actualizar</TableHead>
                  <TableHead className="text-center">Eliminar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(rolePermissions).map(([role, permissions]) =>
                  permissions.map((permission, index) => (
                    <TableRow key={`${role}-${permission.module}`}>
                      {index === 0 && (
                        <TableCell rowSpan={permissions.length} className="font-medium align-top">
                          <Badge variant="outline" className="mt-1">
                            {t(`roles_${role}`)}
                          </Badge>
                        </TableCell>
                      )}
                      <TableCell>{permission.module}</TableCell>
                      <TableCell className={`text-center ${getActionColor(permission.create)}`}>
                        {getActionIcon(permission.create)}
                      </TableCell>
                      <TableCell className={`text-center ${getActionColor(permission.read)}`}>
                        {getActionIcon(permission.read)}
                      </TableCell>
                      <TableCell className={`text-center ${getActionColor(permission.update)}`}>
                        {getActionIcon(permission.update)}
                      </TableCell>
                      <TableCell className={`text-center ${getActionColor(permission.delete)}`}>
                        {getActionIcon(permission.delete)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* New User Dialog */}
      <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('users_new')}</DialogTitle>
            <DialogDescription>
              Crear un nuevo usuario en el sistema. Se enviará un correo para establecer la contraseña.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">{t('users_name')}</Label>
              <Input
                id="full_name"
                value={newUser.full_name}
                onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                placeholder="Nombre completo del usuario"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('users_email')}</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="usuario@empresa.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{t('users_role')}</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value as UserRole})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">{t('roles_administrador')}</SelectItem>
                  <SelectItem value="coordinador">{t('roles_coordinador')}</SelectItem>
                  <SelectItem value="analista">{t('roles_analista')}</SelectItem>
                  <SelectItem value="visualizador">{t('roles_visualizador')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                {t('users_create_password')}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              {t('common_cancel')}
            </Button>
            <Button onClick={handleSaveUser}>
              {t('common_save')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersModule;
