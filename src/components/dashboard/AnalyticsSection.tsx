
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, ClipboardCheck } from 'lucide-react';
import { Validation } from '@/types/validation';
import AnalyticsCharts from './AnalyticsCharts';

interface AnalyticsSectionProps {
  validations: Validation[];
}

const AnalyticsSection = ({ validations }: AnalyticsSectionProps) => {
  const [analyticsType, setAnalyticsType] = useState<'validations' | 'protocols'>('validations');

  const validationsWithProtocols = validations.filter(v => v.files && v.files.length > 0);
  const validationsWithoutProtocols = validations.filter(v => !v.files || v.files.length === 0);

  const getAnalyticsData = () => {
    if (analyticsType === 'protocols') {
      return validationsWithProtocols;
    }
    return validations;
  };

  const getAnalyticsTitle = () => {
    return analyticsType === 'protocols' 
      ? 'Analíticas de Protocolos Realizados' 
      : 'Analíticas de Validaciones';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            {getAnalyticsTitle()}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={analyticsType === 'validations' ? 'default' : 'outline'}
              onClick={() => setAnalyticsType('validations')}
              size="sm"
              className="flex items-center"
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Validaciones ({validations.length})
            </Button>
            <Button
              variant={analyticsType === 'protocols' ? 'default' : 'outline'}
              onClick={() => setAnalyticsType('protocols')}
              size="sm"
              className="flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              Protocolos ({validationsWithProtocols.length})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            {analyticsType === 'protocols' 
              ? `Análisis de ${validationsWithProtocols.length} validaciones con protocolos documentados`
              : `Análisis de ${validations.length} validaciones totales en el sistema`
            }
          </p>
        </div>
        <AnalyticsCharts validations={getAnalyticsData()} />
      </CardContent>
    </Card>
  );
};

export default AnalyticsSection;
