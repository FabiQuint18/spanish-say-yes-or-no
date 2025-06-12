
import React from 'react';
import StatsCard from './StatsCard';
import AnalyticsCharts from './AnalyticsCharts';
import AnalyticsSection from './AnalyticsSection';
import ExpiryNotifications from '@/components/notifications/ExpiryNotifications';
import { ClipboardCheck, Package, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/validation';

interface DashboardProps {
  userRole?: UserRole;
}

const Dashboard = ({ userRole = 'visualizador' }: DashboardProps) => {
  const { t } = useLanguage();

  // Control de acceso por roles
  const canViewAnalytics = userRole === 'administrador' || userRole === 'coordinador' || userRole === 'visualizador' || userRole === 'analista';
  const canModifyAnalytics = userRole === 'administrador' || userRole === 'coordinador';

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('menu.dashboard')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t('stats.validations')}
          value={156}
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
          value={8}
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

      {/* Expiry Notifications - Solo para roles que pueden actuar */}
      {(userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista') && (
        <ExpiryNotifications validations={[]} />
      )}

      {/* Analytics Section - Visible para todos los roles permitidos */}
      {canViewAnalytics && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.title')}</CardTitle>
              <CardDescription>
                {t('analytics.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsCharts />
            </CardContent>
          </Card>
          
          <AnalyticsSection />
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
