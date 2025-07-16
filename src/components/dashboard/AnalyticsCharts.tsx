import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Validation } from '@/types/validation';
import { getDaysUntilExpiry } from '@/utils/dateUtils';

interface AnalyticsChartsProps {
  validations: Validation[];
}

const AnalyticsCharts = ({ validations = [] }: AnalyticsChartsProps) => {
  const { t } = useLanguage();

  // Ensure validations is always an array
  const safeValidations = Array.isArray(validations) ? validations : [];

  // Data for expired validations
  const expiredValidations = safeValidations.filter(v => v.status === 'vencido');
  const expiringValidations = safeValidations.filter(v => v.status === 'proximo_vencer');

  // Data for expiry analysis
  const expiryAnalysisData = [
    { 
      name: 'Vencidas', 
      value: expiredValidations.length,
      fill: '#ef4444'
    },
    { 
      name: 'Por Vencer (30 días)', 
      value: expiringValidations.length,
      fill: '#f59e0b'
    },
    { 
      name: 'Por Vencer (60 días)', 
      value: safeValidations.filter(v => {
        const days = getDaysUntilExpiry(v.expiry_date);
        return days > 30 && days <= 60;
      }).length,
      fill: '#eab308'
    },
    { 
      name: 'Por Vencer (90 días)', 
      value: safeValidations.filter(v => {
        const days = getDaysUntilExpiry(v.expiry_date);
        return days > 60 && days <= 90;
      }).length,
      fill: '#84cc16'
    },
  ];

  // Data for validation types of expired/expiring
  const criticalValidationTypes = [
    { 
      name: 'Procesos', 
      expired: expiredValidations.filter(v => v.validation_type === 'procesos').length,
      expiring: expiringValidations.filter(v => v.validation_type === 'procesos').length
    },
    { 
      name: 'Métodos Analíticos', 
      expired: expiredValidations.filter(v => v.validation_type === 'metodos_analiticos').length,
      expiring: expiringValidations.filter(v => v.validation_type === 'metodos_analiticos').length
    },
    { 
      name: 'Limpieza', 
      expired: expiredValidations.filter(v => v.validation_type === 'limpieza').length,
      expiring: expiringValidations.filter(v => v.validation_type === 'limpieza').length
    },
    { 
      name: 'Sistemas', 
      expired: expiredValidations.filter(v => v.validation_type === 'sistemas_computarizados').length,
      expiring: expiringValidations.filter(v => v.validation_type === 'sistemas_computarizados').length
    },
  ];

  // Monthly expiry trend
  const monthlyExpiryData = [];
  const currentDate = new Date();
  for (let i = 0; i < 12; i++) {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
    const monthName = month.toLocaleDateString('es-ES', { month: 'short' });
    const expiring = safeValidations.filter(v => {
      const expiryDate = new Date(v.expiry_date);
      return expiryDate.getMonth() === month.getMonth() && 
             expiryDate.getFullYear() === month.getFullYear();
    }).length;
    
    monthlyExpiryData.push({
      month: monthName,
      expiring
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Expiry Status Analysis */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-red-50">
        <CardHeader className="text-center bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="text-lg font-bold">🚨 Análisis de Vencimientos</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <ChartContainer
            config={{
              vencidas: { label: 'Vencidas', color: '#ef4444' },
              por_vencer: { label: 'Por Vencer', color: '#f59e0b' },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expiryAnalysisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expiryAnalysisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Critical Validations by Type */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
        <CardHeader className="text-center bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
          <CardTitle className="text-lg font-bold">⚠️ Validaciones Críticas por Tipo</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <ChartContainer
            config={{
              expired: { label: 'Vencidas', color: '#ef4444' },
              expiring: { label: 'Por Vencer', color: '#f59e0b' },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={criticalValidationTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }} 
                  textAnchor="middle"
                />
                <YAxis />
                <Bar dataKey="expired" fill="#ef4444" name="Vencidas" />
                <Bar dataKey="expiring" fill="#f59e0b" name="Por Vencer" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Expiry Trend */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-yellow-50">
        <CardHeader className="text-center bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-t-lg">
          <CardTitle className="text-lg font-bold">📈 Tendencia de Vencimientos</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <ChartContainer
            config={{
              expiring: { label: 'Vencimientos', color: '#f59e0b' },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyExpiryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="expiring" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;