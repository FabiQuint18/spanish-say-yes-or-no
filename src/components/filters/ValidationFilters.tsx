
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X } from 'lucide-react';
import { ValidationFilters as Filters, ProductType, EquipmentType, ValidationStatus, ValidationType } from '@/types/validation';
import { useLanguage } from '@/contexts/LanguageContext';

interface ValidationFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

const ValidationFilters = ({ filters, onFiltersChange, onClearFilters }: ValidationFiltersProps) => {
  const { t } = useLanguage();

  const productTypes: { value: ProductType; label: string }[] = [
    { value: 'producto_terminado', label: t('product.terminado') },
    { value: 'materia_prima', label: t('product.materia') },
    { value: 'material_envase', label: t('product.envase') },
  ];

  const validationTypes: { value: ValidationType; label: string }[] = [
    { value: 'procesos', label: t('validation.procesos') },
    { value: 'limpieza', label: t('validation.limpieza') },
    { value: 'metodos_analiticos', label: t('validation.metodos') },
  ];

  const equipmentTypes: { value: EquipmentType; label: string }[] = [
    { value: 'HPLC', label: 'HPLC' },
    { value: 'GC', label: 'GC' },
    { value: 'UV-VIS', label: 'UV-VIS' },
    { value: 'NIR', label: 'NIR' },
    { value: 'RAMAN', label: 'RAMAN' },
    { value: 'IR', label: 'IR' },
    { value: 'AA', label: 'AA' },
    { value: 'Karl Fischer', label: 'Karl Fischer' },
  ];

  const statusOptions: { value: ValidationStatus; label: string }[] = [
    { value: 'validado', label: t('status.validado') },
    { value: 'proximo_vencer', label: t('status.proximo') },
    { value: 'vencido', label: t('status.vencido') },
    { value: 'en_revalidacion', label: t('status.revalidacion') },
  ];

  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            {t('filters.title')}
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <X className="mr-2 h-4 w-4" />
              {t('filters.clear')}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="productType">{t('filters.productType')}</Label>
            <Select value={filters.productType || ''} onValueChange={(value) => updateFilter('productType', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('select.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="validationType">{t('filters.validationType')}</Label>
            <Select value={filters.validationType || ''} onValueChange={(value) => updateFilter('validationType', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('select.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {validationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="equipmentType">{t('filters.equipmentType')}</Label>
            <Select value={filters.equipmentType || ''} onValueChange={(value) => updateFilter('equipmentType', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('select.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {equipmentTypes.map((equipment) => (
                  <SelectItem key={equipment.value} value={equipment.value}>
                    {equipment.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">{t('filters.status')}</Label>
            <Select value={filters.status || ''} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('select.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="productCode">{t('filters.productCode')}</Label>
            <Input
              id="productCode"
              placeholder={t('search.placeholder')}
              value={filters.productCode || ''}
              onChange={(e) => updateFilter('productCode', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="validationCode">{t('filters.validationCode')}</Label>
            <Input
              id="validationCode"
              placeholder={t('search.placeholder')}
              value={filters.validationCode || ''}
              onChange={(e) => updateFilter('validationCode', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="expiryDateFrom">{t('filters.expiryFrom')}</Label>
            <Input
              id="expiryDateFrom"
              type="date"
              value={filters.expiryDateFrom || ''}
              onChange={(e) => updateFilter('expiryDateFrom', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="expiryDateTo">{t('filters.expiryTo')}</Label>
            <Input
              id="expiryDateTo"
              type="date"
              value={filters.expiryDateTo || ''}
              onChange={(e) => updateFilter('expiryDateTo', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationFilters;
