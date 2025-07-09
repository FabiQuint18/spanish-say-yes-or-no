
import React, { useState, useEffect } from 'react';
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
import { UserRole, ValidationType, Validation } from '@/types/validation';

interface DashboardProps {
  userRole?: UserRole;
  currentUserEmail?: string;
}

const Dashboard = ({ userRole = 'visualizador', currentUserEmail }: DashboardProps) => {
  const { t } = useLanguage();
  const [selectedValidationType, setSelectedValidationType] = useState<ValidationType | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [validations, setValidations] = useState<Validation[]>([]);
  const [products, setProducts] = useState([]);
  const [equipments, setEquipments] = useState([]);

  // Cargar datos del localStorage
  useEffect(() => {
    const savedValidations = localStorage.getItem('systemValidations');
    if (savedValidations) {
      setValidations(JSON.parse(savedValidations));
    }

    const savedProducts = localStorage.getItem('systemProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    const savedEquipments = localStorage.getItem('systemEquipments');
    if (savedEquipments) {
      setEquipments(JSON.parse(savedEquipments));
    }
  }, []);

  // Filtrar validaciones por tipo y año
  const filteredValidations = validations.filter(v => {
    const validationYear = new Date(v.created_at).getFullYear().toString();
    const typeMatch = selectedValidationType === 'all' || v.validation_type === selectedValidationType;
    const yearMatch = validationYear === selectedYear;
    return typeMatch && yearMatch;
  });

  // Obtener años disponibles
  const availableYears = [...new Set(validations.map(v => new Date(v.created_at).getFullYear().toString()))].sort((a, b) => b.localeCompare(a));

  // Estadísticas calculadas desde validaciones reales
  const stats = {
    validations: filteredValidations.length,
    products: products.length,
    expiring: filteredValidations.filter(v => v.status === 'proximo_vencer').length,
    expired: filteredValidations.filter(v => v.status === 'vencido').length,
    validated: filteredValidations.filter(v => v.status === 'validado').length,
    protocols: filteredValidations.filter(v => v.files && v.files.length > 0).length,
    reports: filteredValidations.filter(v => v.status === 'validado' || v.status === 'primera_revision' || v.status === 'segunda_revision').length
  };

  // Control de acceso por roles
  const canViewAnalytics = userRole === 'administrador' || userRole === 'coordinador' || userRole === 'visualizador' || userRole === 'analista';

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Filtros del Dashboard */}
      {canViewAnalytics && (
        <Card>
          <CardHeader>
            <CardTitle>Filtros de Dashboard</CardTitle>
            <CardDescription>
              Filtrar datos por tipo de validación y año
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="year-filter">Año:</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="validation-type-filter">Tipo de Validación:</Label>
                <Select value={selectedValidationType} onValueChange={(value) => setSelectedValidationType(value as ValidationType | 'all')}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('common.all')}</SelectItem>
                    <SelectItem value="procesos">{t('validations.processes')}</SelectItem>
                    <SelectItem value="limpieza">{t('validations.cleaning')}</SelectItem>
                    <SelectItem value="metodos_analiticos">{t('validations.analytical_methods')}</SelectItem>
                    <SelectItem value="sistemas_computarizados">{t('validations.computerized_systems')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t('stats.validations')}
          value={stats.validations}
          icon={ClipboardCheck}
          description={t('stats.total_validations')}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t('stats.products')}
          value={stats.products}
          icon={Package}
          description={t('stats.registered_products')}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title={t('stats.expiring')}
          value={stats.expiring}
          icon={AlertTriangle}
          description={t('stats.next_30_days')}
          trend={{ value: stats.expiring, isPositive: false }}
        />
        <StatsCard
          title="Protocolos"
          value={stats.protocols}
          icon={TrendingUp}
          description={`Protocolos realizados en ${selectedYear}`}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Stats adicionales por año */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reportes por Año</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reports}</div>
            <p className="text-sm text-muted-foreground">
              Reportes completados en {selectedYear}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Validaciones por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Procesos:</span>
                <span>{filteredValidations.filter(v => v.validation_type === 'procesos').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Métodos Analíticos:</span>
                <span>{filteredValidations.filter(v => v.validation_type === 'metodos_analiticos').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Limpieza:</span>
                <span>{filteredValidations.filter(v => v.validation_type === 'limpieza').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Sistemas:</span>
                <span>{filteredValidations.filter(v => v.validation_type === 'sistemas_computarizados').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Notification Service */}
      <EmailNotificationService 
        validations={filteredValidations} 
        userEmail={currentUserEmail}
        enabled={true}
      />

      {/* Expiry Notifications */}
      {(userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista') && (
        <ExpiryNotifications validations={filteredValidations} />
      )}

      {/* Analytics Section */}
      {canViewAnalytics && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.title')}</CardTitle>
              <CardDescription>
                {t('analytics.subtitle')} - {selectedYear}
                {selectedValidationType !== 'all' && ` - ${t(`validations_${selectedValidationType.replace('_', '').toLowerCase()}`)}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsCharts validations={filteredValidations} />
            </CardContent>
          </Card>
          
          <AnalyticsSection validations={filteredValidations} />
        </div>
      )}

      {/* Mensaje para roles sin acceso */}
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
