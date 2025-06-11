
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, X } from 'lucide-react';
import { ValidationFilters, ValidationType, ProcessSubcategory, AnalyticalSubcategory, CleaningSubcategory } from '@/types/validation';

interface ValidationFiltersProps {
  filters: ValidationFilters;
  onFiltersChange: (filters: ValidationFilters) => void;
  onClearFilters: () => void;
}

const ValidationFiltersComponent = ({ filters, onFiltersChange, onClearFilters }: ValidationFiltersProps) => {
  const updateFilter = (key: keyof ValidationFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === 'all' || value === '' ? undefined : value,
    };

    // Clear subcategory when validation type changes
    if (key === 'validationType' && value !== filters.validationType) {
      newFilters.subcategory = undefined;
    }

    onFiltersChange(newFilters);
  };

  const getSubcategoryOptions = (validationType?: ValidationType) => {
    switch (validationType) {
      case 'procesos':
        return [
          { value: 'fabricacion', label: 'Fabricación' },
          { value: 'empaque', label: 'Empaque' },
        ];
      case 'metodos_analiticos':
        return [
          { value: 'valoracion', label: 'Valoración' },
          { value: 'disolucion', label: 'Disolución' },
          { value: 'impurezas', label: 'Impurezas' },
          { value: 'uniformidad_unidades_dosificacion', label: 'Uniformidad De Unidades De Dosificación' },
          { value: 'identificacion', label: 'Identificación' },
          { value: 'trazas', label: 'Trazas' },
        ];
      case 'limpieza':
        return [
          { value: 'no_aplica', label: 'NA' },
        ];
      default:
        return [];
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros De Búsqueda
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <X className="mr-2 h-4 w-4" />
            Limpiar Filtros
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="validation-type">Tipo De Validación</Label>
            <Select
              value={filters.validationType || 'all'}
              onValueChange={(value) => updateFilter('validationType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="procesos">Procesos</SelectItem>
                <SelectItem value="limpieza">Limpieza</SelectItem>
                <SelectItem value="metodos_analiticos">Métodos Analíticos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subcategory">Subcategoría</Label>
            <Select
              value={filters.subcategory || 'all'}
              onValueChange={(value) => updateFilter('subcategory', value)}
              disabled={!filters.validationType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Subcategoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {getSubcategoryOptions(filters.validationType).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="validation-code">Código De Validación</Label>
            <Input
              id="validation-code"
              placeholder="Buscar Por Código"
              value={filters.validationCode || ''}
              onChange={(e) => updateFilter('validationCode', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="product-code">Código De Producto</Label>
            <Input
              id="product-code"
              placeholder="Buscar Por Producto"
              value={filters.productCode || ''}
              onChange={(e) => updateFilter('productCode', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="equipment-type">Tipo De Equipo</Label>
            <Select
              value={filters.equipmentType || 'all'}
              onValueChange={(value) => updateFilter('equipmentType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Equipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="HPLC">HPLC</SelectItem>
                <SelectItem value="GC">GC</SelectItem>
                <SelectItem value="UV-VIS">UV-VIS</SelectItem>
                <SelectItem value="NIR">NIR</SelectItem>
                <SelectItem value="RAMAN">RAMAN</SelectItem>
                <SelectItem value="IR">IR</SelectItem>
                <SelectItem value="AA">AA</SelectItem>
                <SelectItem value="Karl Fischer">Karl Fischer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Estado</Label>
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => updateFilter('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="validado">Validado</SelectItem>
                <SelectItem value="en_validacion">En Validación</SelectItem>
                <SelectItem value="por_revalidar">Por Revalidar</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
                <SelectItem value="proximo_vencer">Próximo A Vencer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="expiry-from">Vencimiento Desde</Label>
            <Input
              id="expiry-from"
              type="date"
              value={filters.expiryDateFrom || ''}
              onChange={(e) => updateFilter('expiryDateFrom', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="expiry-to">Vencimiento Hasta</Label>
            <Input
              id="expiry-to"
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

export default ValidationFiltersComponent;
