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

  // Productos validados
  const validatedProducts = safeValidations.filter(v => v.status === 'validado');
  const uniqueValidatedProducts = [...new Set(validatedProducts.map(v => v.product?.id))].length;

  // Validaciones por tipo
  const validationsByType = [
    { 
      name: 'Procesos', 
      value: safeValidations.filter(v => v.validation_type === 'procesos').length,
      fill: '#3b82f6'
    },
    { 
      name: 'Métodos Analíticos', 
      value: safeValidations.filter(v => v.validation_type === 'metodos_analiticos').length,
      fill: '#10b981'
    },
    { 
      name: 'Limpieza', 
      value: safeValidations.filter(v => v.validation_type === 'limpieza').length,
      fill: '#f59e0b'
    },
    { 
      name: 'Sistemas', 
      value: safeValidations.filter(v => v.validation_type === 'sistemas_computarizados').length,
      fill: '#8b5cf6'
    },
  ];

  // Validaciones por subcategoría
  const validationsBySubcategory = [
    { 
      name: 'Valoración', 
      value: safeValidations.filter(v => v.subcategory === 'valoracion').length
    },
    { 
      name: 'Disolución', 
      value: safeValidations.filter(v => v.subcategory === 'disolucion').length
    },
    { 
      name: 'Impurezas', 
      value: safeValidations.filter(v => v.subcategory === 'impurezas').length
    },
    { 
      name: 'Fabricación', 
      value: safeValidations.filter(v => v.subcategory === 'fabricacion').length
    },
    { 
      name: 'Empaque', 
      value: safeValidations.filter(v => v.subcategory === 'empaque').length
    },
    { 
      name: 'Identificación', 
      value: safeValidations.filter(v => v.subcategory === 'identificacion').length
    },
  ].filter(item => item.value > 0);

  // Protocolos (validaciones con archivos)
  const protocolsCount = safeValidations.filter(v => v.files && v.files.length > 0).length;

  // Reportes (validaciones completadas)
  const reportsCount = safeValidations.filter(v => 
    v.status === 'validado' || 
    v.status === 'primera_revision' || 
    v.status === 'segunda_revision'
  ).length;

  // Estadísticas generales
  const generalStats = [
    { 
      name: 'Productos Validados', 
      value: uniqueValidatedProducts,
      fill: '#10b981'
    },
    { 
      name: 'Total Validaciones', 
      value: safeValidations.length,
      fill: '#3b82f6'
    },
    { 
      name: 'Protocolos', 
      value: protocolsCount,
      fill: '#f59e0b'
    },
    { 
      name: 'Reportes', 
      value: reportsCount,
      fill: '#8b5cf6'
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Estadísticas Generales */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-lg font-bold">📊 Estadísticas Generales</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <ChartContainer
            config={{
              productos: { label: 'Productos Validados', color: '#10b981' },
              validaciones: { label: 'Total Validaciones', color: '#3b82f6' },
              protocolos: { label: 'Protocolos', color: '#f59e0b' },
              reportes: { label: 'Reportes', color: '#8b5cf6' },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={generalStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {generalStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Validaciones por Tipo */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
        <CardHeader className="text-center bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="text-lg font-bold">🔬 Validaciones por Tipo</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <ChartContainer
            config={{
              procesos: { label: 'Procesos', color: '#3b82f6' },
              metodos: { label: 'Métodos Analíticos', color: '#10b981' },
              limpieza: { label: 'Limpieza', color: '#f59e0b' },
              sistemas: { label: 'Sistemas', color: '#8b5cf6' },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={validationsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }} 
                  textAnchor="middle"
                />
                <YAxis />
                <Bar dataKey="value" fill="#3b82f6" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Validaciones por Subcategoría */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
        <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="text-lg font-bold">📋 Validaciones por Subcategoría</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <ChartContainer
            config={{
              subcategory: { label: 'Subcategoría', color: '#8b5cf6' },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={validationsBySubcategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }} 
                  textAnchor="middle"
                  angle={-45}
                />
                <YAxis />
                <Bar dataKey="value" fill="#8b5cf6" />
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