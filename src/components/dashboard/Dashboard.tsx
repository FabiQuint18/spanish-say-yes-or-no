
import React, { useState } from 'react';
import StatsCard from './StatsCard';
import AnalyticsCharts from './AnalyticsCharts';
import AnalyticsSection from './AnalyticsSection';
import ExpiryNotifications from '@/components/notifications/ExpiryNotifications';
import EmailNotificationService from '@/components/notifications/EmailNotificationService';
import { ClipboardCheck, Package, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole, EquipmentType, ValidationType } from '@/types/validation';

interface DashboardProps {
  userRole?: UserRole;
  currentUserEmail?: string;
}

const Dashboard = ({ userRole = 'visualizador', currentUserEmail }: DashboardProps) => {
  const { t } = useLanguage();
  const [selectedValidationType, setSelectedValidationType] = useState<ValidationType | 'all'>('all');

  // Mock validations data for analytics - this should come from a real data source
  const mockValidations = [
    {
      id: '1',
      validation_code: 'VAL-001-2024',
      validation_type: 'procesos' as const,
      subcategory: 'fabricacion' as const,
      equipment_type: 'HPLC' as EquipmentType,
      status: 'validado' as const,
      expiry_date: '2024-12-31',
      product_id: '1',
      issue_date: '2024-01-15',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
      product: {
        id: '1',
        name: 'Producto A',
        code: 'PA-001',
        type: 'producto_terminado' as const,
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      },
      files: []
    },
    {
      id: '2',
      validation_code: 'VAL-002-2024',
      validation_type: 'limpieza' as const,
      subcategory: 'no_aplica' as const,
      equipment_type: 'GC' as EquipmentType,
      status: 'proximo_vencer' as const,
      expiry_date: '2024-07-15',
      product_id: '2',
      issue_date: '2024-01-20',
      created_by: 'user2',
      updated_by: 'user2',
      created_at: '2024-01-20T10:00:00Z',
      updated_at: '2024-01-20T10:00:00Z',
      product: {
        id: '2',
        name: 'Producto B',
        code: 'PB-002',
        type: 'producto_terminado' as const,
        created_at: '2024-01-20T10:00:00Z',
        updated_at: '2024-01-20T10:00:00Z'
      },
      files: []
    },
    {
      id: '3',
      validation_code: 'VAL-003-2024',
      validation_type: 'metodos_analiticos' as const,
      subcategory: 'valoracion' as const,
      equipment_type: 'UV-VIS' as EquipmentType,
      status: 'en_validacion' as const,
      expiry_date: '2025-03-15',
      product_id: '3',
      issue_date: '2024-03-15',
      created_by: 'user3',
      updated_by: 'user3',
      created_at: '2024-03-15T10:00:00Z',
      updated_at: '2024-03-15T10:00:00Z',
      product: {
        id: '3',
        name: 'Producto C',
        code: 'PC-003',
        type: 'materia_prima' as const,
        created_at: '2024-03-15T10:00:00Z',
        updated_at: '2024-03-15T10:00:00Z'
      },
      files: []
    }
  ];

  // Filter validations based on selected type
  const filteredValidations = selectedValidationType === 'all' 
    ? mockValidations 
    : mockValidations.filter(v => v.validation_type === selectedValidationType);

  // Control de acceso por roles
  const canViewAnalytics = userRole === 'administrador' || userRole === 'coordinador' || userRole === 'visualizador' || userRole === 'analista';

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('menu.dashboard')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Validation Type Filter */}
      {canViewAnalytics && (
        <Card>
          <CardHeader>
            <CardTitle>Filtros de Dashboard</CardTitle>
            <CardDescription>
              Filtrar datos por tipo de validación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="validation-type-filter">Tipo de Validación:</Label>
              <Select value={selectedValidationType} onValueChange={(value) => setSelectedValidationType(value as ValidationType | 'all')}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="procesos">{t('validation.procesos')}</SelectItem>
                  <SelectItem value="limpieza">{t('validation.limpieza')}</SelectItem>
                  <SelectItem value="metodos_analiticos">{t('validation.metodos')}</SelectItem>
                  <SelectItem value="sistemas_computarizados">{t('validation.sistemas')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t('stats.validations')}
          value={filteredValidations.length}
          icon={ClipboardCheck}
          description={t('stats.total_validations')}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t('stats.products')}
          value={89}
          icon={Package}
          description={t('stats.registered_products')}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title={t('stats.expiring')}
          value={filteredValidations.filter(v => v.status === 'proximo_vencer').length}
          icon={AlertTriangle}
          description={t('stats.next_30_days')}
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title={t('stats.efficiency')}
          value={94}
          icon={TrendingUp}
          description={t('stats.validation_efficiency')}
          trend={{ value: 2, isPositive: true }}
          suffix="%"
        />
      </div>

      {/* Email Notification Service - Always running for all users */}
      <EmailNotificationService 
        validations={filteredValidations} 
        userEmail={currentUserEmail}
        enabled={true}
      />

      {/* Expiry Notifications - Solo para roles que pueden actuar */}
      {(userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista') && (
        <ExpiryNotifications validations={filteredValidations} />
      )}

      {/* Analytics Section - Visible para todos los roles permitidos */}
      {canViewAnalytics && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.title')}</CardTitle>
              <CardDescription>
                {t('analytics.subtitle')} 
                {selectedValidationType !== 'all' && ` - ${t(`validation.${selectedValidationType}`)}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsCharts validations={filteredValidations} />
            </CardContent>
          </Card>
          
          <AnalyticsSection validations={filteredValidations} />
        </div>
      )}

      {/* Mensaje para roles sin acceso a analíticas */}
      {!canViewAnalytics && (
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.access_restricted')}</CardTitle>
            <CardDescription>
              {t('dashboard.contact_administrator')}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
