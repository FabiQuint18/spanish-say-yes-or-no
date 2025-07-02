
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, AlertTriangle, Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/validation';

interface SecurityModuleProps {
  userRole?: UserRole;
}

interface SecurityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'failed' | 'warning';
  ip_address: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  enabled: boolean;
}

const SecurityModule = ({ userRole = 'administrador' }: SecurityModuleProps) => {
  const { t } = useLanguage();
  const [showPasswords, setShowPasswords] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
    loginAttempts: 5,
    auditLogging: true,
    encryptionEnabled: true
  });

  // Mock security logs
  const mockSecurityLogs: SecurityLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'admin@company.com',
      action: 'Login',
      resource: 'Sistema',
      status: 'success',
      ip_address: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-01-15T09:15:00Z',
      user: 'analista@company.com',
      action: 'Crear Validación',
      resource: 'VAL-001-2024',
      status: 'success',
      ip_address: '192.168.1.101'
    },
    {
      id: '3',
      timestamp: '2024-01-15T08:45:00Z',
      user: 'unknown',
      action: 'Login Failed',
      resource: 'Sistema',
      status: 'failed',
      ip_address: '192.168.1.999'
    }
  ];

  // Mock permissions with translations
  const mockPermissions: Permission[] = [
    {
      id: '1',
      name: 'validations.create',
      description: 'Crear nuevas validaciones',
      module: t('menu.validations'),
      enabled: true
    },
    {
      id: '2',
      name: 'validations.edit',
      description: 'Editar validaciones existentes',
      module: t('menu.validations'),
      enabled: true
    },
    {
      id: '3',
      name: 'users.manage',
      description: 'Gestionar usuarios del sistema',
      module: t('menu.users'),
      enabled: false
    },
    {
      id: '4',
      name: 'reports.export',
      description: 'Exportar reportes del sistema',
      module: 'Reportes',
      enabled: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Éxito</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Falló</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Advertencia</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES');
  };

  const togglePermission = (permissionId: string) => {
    // Mock function - would update permission in real implementation
    console.log(`Toggling permission: ${permissionId}`);
  };

  const updateSecuritySetting = (setting: string, value: any) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Control de acceso por roles
  const canManageSecurity = userRole === 'administrador';

  if (!canManageSecurity) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('security.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('security.subtitle')}
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('security.access_restricted')}</CardTitle>
            <CardDescription>
              {t('security.no_permissions')}
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
          <h1 className="text-3xl font-bold text-foreground">{t('security.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('security.subtitle')}
          </p>
        </div>
      </div>

      {/* Security Settings */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('security.settings')}
            </CardTitle>
            <CardDescription>
              {t('security.settings_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('security.two_factor')}</Label>
                <p className="text-sm text-muted-foreground">{t('security.two_factor_desc')}</p>
              </div>
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => updateSecuritySetting('twoFactorAuth', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">{t('security.password_expiry')}</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) => updateSecuritySetting('passwordExpiry', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">{t('security.session_timeout')}</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => updateSecuritySetting('sessionTimeout', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loginAttempts">{t('security.login_attempts')}</Label>
              <Input
                id="loginAttempts"
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) => updateSecuritySetting('loginAttempts', parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>{t('security.audit_logging')}</Label>
                <p className="text-sm text-muted-foreground">{t('security.audit_logging_desc')}</p>
              </div>
              <Switch
                checked={securitySettings.auditLogging}
                onCheckedChange={(checked) => updateSecuritySetting('auditLogging', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>{t('security.encryption')}</Label>
                <p className="text-sm text-muted-foreground">{t('security.encryption_desc')}</p>
              </div>
              <Switch
                checked={securitySettings.encryptionEnabled}
                onCheckedChange={(checked) => updateSecuritySetting('encryptionEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              {t('security.permissions')}
            </CardTitle>
            <CardDescription>
              {t('security.permissions_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPermissions.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{permission.name}</div>
                    <div className="text-sm text-muted-foreground">{permission.description}</div>
                    <Badge variant="outline" className="mt-1 text-xs">{permission.module}</Badge>
                  </div>
                  <Switch
                    checked={permission.enabled}
                    onCheckedChange={() => togglePermission(permission.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {t('security.audit_log')}
          </CardTitle>
          <CardDescription>
            {t('security.audit_log_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Acción</TableHead>
                  <TableHead>Recurso</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Dirección IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSecurityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {formatDate(log.timestamp)}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ip_address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityModule;
