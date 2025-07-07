import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, MessageCircle, Calendar, Send, Check, X, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Validation } from '@/types/validation';

interface IntegrationSettings {
  email: {
    enabled: boolean;
    provider: 'gmail' | 'outlook' | 'exchange';
    smtp_server?: string;
    port?: number;
    username?: string;
    password?: string;
    sender_email?: string;
  };
  teams: {
    enabled: boolean;
    webhook_url?: string;
    channel_id?: string;
    tenant_id?: string;
  };
  google: {
    enabled: boolean;
    workspace_id?: string;
    calendar_id?: string;
    drive_folder_id?: string;
  };
}

interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'email' | 'teams' | 'calendar';
  status: 'sent' | 'failed' | 'pending';
  recipient: string;
  subject: string;
  validation_id?: string;
  message: string;
}

const ActivityIntegrationService = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<IntegrationSettings>({
    email: {
      enabled: false,
      provider: 'gmail',
      sender_email: ''
    },
    teams: {
      enabled: false,
      webhook_url: ''
    },
    google: {
      enabled: false,
      workspace_id: ''
    }
  });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [testRecipient, setTestRecipient] = useState('');

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('integrationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const savedLogs = localStorage.getItem('activityLogs');
    if (savedLogs) {
      setActivityLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('integrationSettings', JSON.stringify(settings));
    toast({
      title: "Configuración Guardada",
      description: "Las configuraciones de integración han sido guardadas exitosamente",
    });
    setShowSettings(false);
  };

  const sendEmailNotification = async (recipient: string, subject: string, message: string, validation?: Validation) => {
    if (!settings.email.enabled) {
      toast({
        title: "Email Deshabilitado",
        description: "Las notificaciones por email están deshabilitadas",
        variant: "destructive",
      });
      return;
    }

    // Simular envío de email
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'email',
      status: 'pending',
      recipient,
      subject,
      validation_id: validation?.id,
      message
    };

    setActivityLogs(prev => [newLog, ...prev]);

    // Simular delay de envío
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      setActivityLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? { ...log, status: success ? 'sent' : 'failed' }
          : log
      ));

      if (success) {
        toast({
          title: "Email Enviado",
          description: `Notificación enviada exitosamente a ${recipient}`,
        });
      } else {
        toast({
          title: "Error de Envío",
          description: `No se pudo enviar el email a ${recipient}`,
          variant: "destructive",
        });
      }

      // Save logs to localStorage
      const updatedLogs = activityLogs.map(log => 
        log.id === newLog.id 
          ? { ...log, status: success ? 'sent' : 'failed' }
          : log
      );
      localStorage.setItem('activityLogs', JSON.stringify(updatedLogs));
    }, 2000);

    console.log(`📧 Sending email via ${settings.email.provider}:`, {
      to: recipient,
      subject,
      message,
      smtp: settings.email.smtp_server,
      sender: settings.email.sender_email
    });
  };

  const sendTeamsNotification = async (message: string, validation?: Validation) => {
    if (!settings.teams.enabled || !settings.teams.webhook_url) {
      toast({
        title: "Teams Deshabilitado",
        description: "Las notificaciones de Teams están deshabilitadas o no configuradas",
        variant: "destructive",
      });
      return;
    }

    const newLog: ActivityLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'teams',
      status: 'pending',
      recipient: 'Teams Channel',
      subject: 'Validación Notification',
      validation_id: validation?.id,
      message
    };

    setActivityLogs(prev => [newLog, ...prev]);

    // Simular envío a Teams
    setTimeout(() => {
      const success = Math.random() > 0.05; // 95% success rate
      setActivityLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? { ...log, status: success ? 'sent' : 'failed' }
          : log
      ));

      if (success) {
        toast({
          title: "Teams Notificado",
          description: "Mensaje enviado exitosamente a Teams",
        });
      } else {
        toast({
          title: "Error Teams",
          description: "No se pudo enviar el mensaje a Teams",
          variant: "destructive",
        });
      }

      localStorage.setItem('activityLogs', JSON.stringify(activityLogs));
    }, 1500);

    console.log('📢 Sending Teams notification:', {
      webhook: settings.teams.webhook_url,
      channel: settings.teams.channel_id,
      message,
      validation: validation?.validation_code
    });
  };

  const testEmailConnection = async () => {
    if (!testRecipient) {
      toast({
        title: "Error",
        description: "Ingrese un email de prueba",
        variant: "destructive",
      });
      return;
    }

    await sendEmailNotification(
      testRecipient,
      "Prueba de Conexión - Sistema de Validaciones",
      "Este es un mensaje de prueba para verificar la configuración de email del sistema de validaciones."
    );
  };

  const testTeamsConnection = async () => {
    await sendTeamsNotification(
      "🧪 **Prueba de Conexión Teams**\n\nEste es un mensaje de prueba para verificar la integración con Microsoft Teams del sistema de validaciones."
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Send className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-800">Enviado</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Fallido</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES');
  };

  return (
    <div className="space-y-6">
      {/* Integration Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${settings.email.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">{settings.email.enabled ? 'Activo' : 'Inactivo'}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {settings.email.provider ? settings.email.provider.toUpperCase() : 'No configurado'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Microsoft Teams</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${settings.teams.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">{settings.teams.enabled ? 'Activo' : 'Inactivo'}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {settings.teams.webhook_url ? 'Webhook configurado' : 'No configurado'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Google Workspace</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${settings.google.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">{settings.google.enabled ? 'Activo' : 'Inactivo'}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {settings.google.workspace_id ? 'Workspace conectado' : 'No configurado'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Configuration and Testing */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración
            </CardTitle>
            <CardDescription>
              Configurar integraciones con servicios externos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setShowSettings(true)} className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Configurar Integraciones
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pruebas de Conexión</CardTitle>
            <CardDescription>
              Probar la conectividad con los servicios configurados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testEmail">Email de Prueba</Label>
              <Input
                id="testEmail"
                type="email"
                value={testRecipient}
                onChange={(e) => setTestRecipient(e.target.value)}
                placeholder="test@company.com"
              />
            </div>
            <div className="space-y-2">
              <Button 
                onClick={testEmailConnection} 
                variant="outline" 
                className="w-full"
                disabled={!settings.email.enabled}
              >
                <Mail className="mr-2 h-4 w-4" />
                Probar Email
              </Button>
              <Button 
                onClick={testTeamsConnection} 
                variant="outline" 
                className="w-full"
                disabled={!settings.teams.enabled}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Probar Teams
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Actividades</CardTitle>
          <CardDescription>
            Historial de notificaciones y comunicaciones enviadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activityLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Destinatario</TableHead>
                    <TableHead>Asunto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs.slice(0, 10).map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.type === 'email' && <Mail className="h-4 w-4" />}
                          {log.type === 'teams' && <MessageCircle className="h-4 w-4" />}
                          {log.type === 'calendar' && <Calendar className="h-4 w-4" />}
                          {log.type}
                        </div>
                      </TableCell>
                      <TableCell>{log.recipient}</TableCell>
                      <TableCell>{log.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          {getStatusBadge(log.status)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hay actividades registradas
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configuración de Integraciones</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configuración de Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Habilitar notificaciones por email</Label>
                  <Switch
                    checked={settings.email.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, enabled: checked }
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Proveedor de Email</Label>
                  <Select 
                    value={settings.email.provider} 
                    onValueChange={(value: 'gmail' | 'outlook' | 'exchange') => 
                      setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, provider: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmail">Gmail</SelectItem>
                      <SelectItem value="outlook">Outlook</SelectItem>
                      <SelectItem value="exchange">Exchange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Email del Remitente</Label>
                  <Input
                    type="email"
                    value={settings.email.sender_email || ''}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, sender_email: e.target.value }
                      }))
                    }
                    placeholder="validaciones@company.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Servidor SMTP</Label>
                    <Input
                      value={settings.email.smtp_server || ''}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          email: { ...prev.email, smtp_server: e.target.value }
                        }))
                      }
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Puerto</Label>
                    <Input
                      type="number"
                      value={settings.email.port || ''}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          email: { ...prev.email, port: parseInt(e.target.value) }
                        }))
                      }
                      placeholder="587"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teams Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configuración de Microsoft Teams</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Habilitar notificaciones de Teams</Label>
                  <Switch
                    checked={settings.teams.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        teams: { ...prev.teams, enabled: checked }
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Webhook URL de Teams</Label>
                  <Input
                    value={settings.teams.webhook_url || ''}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        teams: { ...prev.teams, webhook_url: e.target.value }
                      }))
                    }
                    placeholder="https://outlook.office.com/webhook/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>ID del Canal (opcional)</Label>
                  <Input
                    value={settings.teams.channel_id || ''}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        teams: { ...prev.teams, channel_id: e.target.value }
                      }))
                    }
                    placeholder="19:channel-id@thread.tacv2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Google Workspace Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configuración de Google Workspace</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Habilitar integración con Google</Label>
                  <Switch
                    checked={settings.google.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        google: { ...prev.google, enabled: checked }
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>ID del Workspace</Label>
                  <Input
                    value={settings.google.workspace_id || ''}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        google: { ...prev.google, workspace_id: e.target.value }
                      }))
                    }
                    placeholder="company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ID del Calendario</Label>
                  <Input
                    value={settings.google.calendar_id || ''}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        google: { ...prev.google, calendar_id: e.target.value }
                      }))
                    }
                    placeholder="validaciones@company.com"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                {t('common_cancel')}
              </Button>
              <Button onClick={saveSettings}>
                Guardar Configuración
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivityIntegrationService;