
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import StatsCard from './StatsCard';
import ValidationFilters from '@/components/filters/ValidationFilters';
import { 
  ClipboardCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle,
  Search,
  FlaskConical
} from 'lucide-react';
import { UserRole, ValidationFilters as Filters, Validation, EquipmentType } from '@/types/validation';
import { getValidationStatus, formatDate, getDaysUntilExpiry } from '@/utils/dateUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardProps {
  userRole: UserRole;
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const { t } = useLanguage();
  const [quickSearch, setQuickSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const [validations, setValidations] = useState<Validation[]>([]);

  // Mock data - replace with actual API calls
  const mockValidations: Validation[] = [
    {
      id: '1',
      product_id: '1',
      validation_code: 'VAL-001-2024',
      equipment_type: 'HPLC',
      validation_type: 'metodos_analiticos',
      issue_date: '2024-01-15',
      expiry_date: '2029-01-15',
      status: 'validado',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
      product: {
        id: '1',
        code: 'PT-001',
        name: 'Paracetamol 500mg',
        type: 'producto_terminado',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
      }
    },
    {
      id: '2',
      product_id: '2',
      validation_code: 'VAL-002-2024',
      equipment_type: 'GC',
      validation_type: 'procesos',
      issue_date: '2024-06-15',
      expiry_date: '2025-02-15',
      status: 'proximo_vencer',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2024-06-15T00:00:00Z',
      updated_at: '2024-06-15T00:00:00Z',
      product: {
        id: '2',
        code: 'MP-001',
        name: 'Principio Activo A',
        type: 'materia_prima',
        created_at: '2024-06-15T00:00:00Z',
        updated_at: '2024-06-15T00:00:00Z',
      }
    },
    {
      id: '3',
      product_id: '3',
      validation_code: 'VAL-003-2023',
      equipment_type: 'UV-VIS',
      validation_type: 'limpieza',
      issue_date: '2023-01-10',
      expiry_date: '2024-12-10',
      status: 'vencido',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2023-01-10T00:00:00Z',
      updated_at: '2023-01-10T00:00:00Z',
      product: {
        id: '3',
        code: 'PT-002',
        name: 'Ibuprofeno 400mg',
        type: 'producto_terminado',
        created_at: '2023-01-10T00:00:00Z',
        updated_at: '2023-01-10T00:00:00Z',
      }
    },
  ];

  useEffect(() => {
    // Mock data load - replace with actual API call
    setValidations(mockValidations);
  }, []);

  const stats = {
    total: validations.length,
    validated: validations.filter(v => v.status === 'validado').length,
    expiring: validations.filter(v => v.status === 'proximo_vencer').length,
    expired: validations.filter(v => v.status === 'vencido').length,
  };

  const getStatusBadge = (status: string, expiryDate: string) => {
    const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
    
    switch (status) {
      case 'validado':
        return <Badge className="bg-green-100 text-green-800">{t('status.validado')}</Badge>;
      case 'proximo_vencer':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('status.proximo')} ({daysUntilExpiry} {t('dashboard.days')})</Badge>;
      case 'vencido':
        return <Badge className="bg-red-100 text-red-800">{t('status.vencido')}</Badge>;
      case 'en_revalidacion':
        return <Badge className="bg-blue-100 text-blue-800">{t('status.revalidacion')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getValidationTypeLabel = (type: string) => {
    switch (type) {
      case 'procesos':
        return t('validation.procesos');
      case 'limpieza':
        return t('validation.limpieza');
      case 'metodos_analiticos':
        return t('validation.metodos');
      default:
        return type;
    }
  };

  const getEquipmentIcon = (equipment: EquipmentType) => {
    return <FlaskConical className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('stats.total')}
          value={stats.total}
          icon={ClipboardCheck}
          variant="default"
        />
        <StatsCard
          title={t('stats.validated')}
          value={stats.validated}
          icon={CheckCircle}
          variant="success"
        />
        <StatsCard
          title={t('stats.expiring')}
          value={stats.expiring}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title={t('stats.expired')}
          value={stats.expired}
          icon={XCircle}
          variant="danger"
        />
      </div>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            {t('dashboard.quickSearch')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder={t('dashboard.searchPlaceholder')}
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Filters */}
      <ValidationFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters({})}
      />

      {/* Recent Validations */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recent')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {validations.slice(0, 10).map((validation) => (
              <div key={validation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getEquipmentIcon(validation.equipment_type)}
                  <div>
                    <h4 className="font-semibold">{validation.product?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {validation.product?.code} | {validation.validation_code}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('dashboard.equipment')}: {validation.equipment_type} | 
                      {getValidationTypeLabel(validation.validation_type)} | 
                      {t('dashboard.expires')}: {formatDate(validation.expiry_date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(validation.status, validation.expiry_date)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
