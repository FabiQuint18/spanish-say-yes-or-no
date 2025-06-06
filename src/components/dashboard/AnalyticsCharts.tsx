
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Validation } from '@/types/validation';

interface AnalyticsChartsProps {
  validations: Validation[];
}

const AnalyticsCharts = ({ validations }: AnalyticsChartsProps) => {
  const { t } = useLanguage();

  // Data for validation types chart
  const validationTypeData = [
    { 
      name: t('validation.procesos'), 
      value: validations.filter(v => v.validation_type === 'procesos').length,
      fill: '#3b82f6'
    },
    { 
      name: t('validation.limpieza'), 
      value: validations.filter(v => v.validation_type === 'limpieza').length,
      fill: '#10b981'
    },
    { 
      name: t('validation.metodos'), 
      value: validations.filter(v => v.validation_type === 'metodos_analiticos').length,
      fill: '#f59e0b'
    },
  ];

  // Data for status chart
  const statusData = [
    { 
      name: t('status.validado'), 
      value: validations.filter(v => v.status === 'validado').length,
      fill: '#10b981'
    },
    { 
      name: t('status.proximo'), 
      value: validations.filter(v => v.status === 'proximo_vencer').length,
      fill: '#f59e0b'
    },
    { 
      name: t('status.vencido'), 
      value: validations.filter(v => v.status === 'vencido').length,
      fill: '#ef4444'
    },
    { 
      name: t('status.revalidacion'), 
      value: validations.filter(v => v.status === 'en_revalidacion').length,
      fill: '#8b5cf6'
    },
    { 
      name: t('status.en_validacion'), 
      value: validations.filter(v => v.status === 'en_validacion').length,
      fill: '#06b6d4'
    },
    { 
      name: t('status.por_revalidar'), 
      value: validations.filter(v => v.status === 'por_revalidar').length,
      fill: '#f97316'
    },
  ];

  // Data for equipment chart
  const equipmentData = [
    { name: 'HPLC', value: validations.filter(v => v.equipment_type === 'HPLC').length },
    { name: 'GC', value: validations.filter(v => v.equipment_type === 'GC').length },
    { name: 'UV-VIS', value: validations.filter(v => v.equipment_type === 'UV-VIS').length },
    { name: 'NIR', value: validations.filter(v => v.equipment_type === 'NIR').length },
    { name: 'RAMAN', value: validations.filter(v => v.equipment_type === 'RAMAN').length },
    { name: 'IR', value: validations.filter(v => v.equipment_type === 'IR').length },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Validation Types Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.byType')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              procesos: { label: t('validation.procesos'), color: '#3b82f6' },
              limpieza: { label: t('validation.limpieza'), color: '#10b981' },
              metodos: { label: t('validation.metodos'), color: '#f59e0b' },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={validationTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {validationTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.byStatus')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              validado: { label: t('status.validado'), color: '#10b981' },
              proximo: { label: t('status.proximo'), color: '#f59e0b' },
              vencido: { label: t('status.vencido'), color: '#ef4444' },
              revalidacion: { label: t('status.revalidacion'), color: '#8b5cf6' },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis />
                <Bar dataKey="value" fill="#3b82f6" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Equipment Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.byEquipment')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              equipment: { label: 'Equipment', color: '#3b82f6' },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#3b82f6" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
