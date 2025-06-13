
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/validation';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  created_at: string;
}

const UsersModule = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock users data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'admin@company.com',
      role: 'administrador',
      status: 'active',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'María García',
      email: 'coordinador@company.com',
      role: 'coordinador',
      status: 'active',
      created_at: '2024-01-20'
    },
    {
      id: '3',
      name: 'Carlos López',
      email: 'analista@company.com',
      role: 'analista',
      status: 'active',
      created_at: '2024-02-01'
    },
    {
      id: '4',
      name: 'Ana Rodríguez',
      email: 'viewer@company.com',
      role: 'visualizador',
      status: 'inactive',
      created_at: '2024-02-10'
    }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: UserRole) => {
    const roleColors = {
      administrador: 'bg-red-100 text-red-800',
      coordinador: 'bg-blue-100 text-blue-800',
      analista: 'bg-green-100 text-green-800',
      visualizador: 'bg-gray-100 text-gray-800'
    };
    
    const roleLabels = {
      administrador: 'Administrador',
      coordinador: 'Coordinador',
      analista: 'Analista',
      visualizador: 'Visualizador'
    };

    return (
      <Badge className={roleColors[role]}>
        {roleLabels[role]}
      </Badge>
    );
  };

  const getStatusBadge = (status: 'active' | 'inactive') => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactivo</Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('menu.users')}</h1>
          <p className="text-muted-foreground mt-1">
            Gestionar usuarios del sistema
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Usuario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Lista de Usuarios
          </CardTitle>
          <CardDescription>
            Administrar los usuarios y sus permisos en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de Creación</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.created_at}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No se encontraron usuarios
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersModule;
