
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Download, Search, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SecurityLog {
  id: string;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  ip_address: string;
  status: 'success' | 'failed' | 'warning';
}

const SecurityModule = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock security logs data
  const mockLogs: SecurityLog[] = [
    {
      id: '1',
      user: 'admin@company.com',
      action: 'Login exitoso',
      module: 'Autenticación',
      timestamp: '2024-06-13 15:30:45',
      ip_address: '192.168.1.100',
      status: 'success'
    },
    {
      id: '2',
      user: 'analista@company.com',
      action: 'Modificación de validación VAL-001-2024',
      module: 'Validaciones',
      timestamp: '2024-06-13 14:15:22',
      ip_address: '192.168.1.101',
      status: 'success'
    },
    {
      id: '3',
      user: 'coordinador@company.com',
      action: 'Subida de protocolo PDF',
      module: 'Archivos',
      timestamp: '2024-06-13 13:45:10',
      ip_address: '192.168.1.102',
      status: 'success'
    },
    {
      id: '4',
      user: 'unknown@external.com',
      action: 'Intento de login fallido',
      module: 'Autenticación',
      timestamp: '2024-06-13 12:30:15',
      ip_address: '203.0.113.45',
      status: 'failed'
    },
    {
      id: '5',
      user: 'viewer@company.com',
      action: 'Intento de modificación sin permisos',
      module: 'Validaciones',
      timestamp: '2024-06-13 11:20:30',
      ip_address: '192.168.1.103',
      status: 'warning'
    }
  ];

  const filteredLogs = mockLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: 'success' | 'failed' | 'warning') => {
    const statusColors = {
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800'
    };
    
    const statusLabels = {
      success: 'Exitoso',
      failed: 'Fallido',
      warning: 'Advertencia'
    };

    return (
      <Badge className={statusColors[status]}>
        {statusLabels[status]}
      </Badge>
    );
  };

  const exportAuditReport = () => {
    // Simulate export functionality
    alert('Exportando reporte de auditoría CFR 21...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Shield className="mr-3 h-8 w-8" />
            Seguridad CFR 21
          </h1>
          <p className="text-muted-foreground mt-1">
            Auditoría y cumplimiento normativo CFR 21 Part 11
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportAuditReport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Auditoría
          </Button>
        </div>
      </div>

      {/* Security Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accesos Hoy</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intentos Fallidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-red-600">Requiere atención</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modificaciones</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumplimiento</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-green-600">CFR 21 Part 11</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Registro de Auditoría (Audit Trail)
          </CardTitle>
          <CardDescription>
            Registro completo de todas las actividades del sistema según CFR 21 Part 11
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar en registros de auditoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Acción</TableHead>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.module}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ip_address}</TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No se encontraron registros
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityModule;
