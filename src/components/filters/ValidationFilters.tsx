
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X } from 'lucide-react';
import { ValidationFilters as Filters, ProductType, EquipmentType, ValidationStatus } from '@/types/validation';

interface ValidationFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

const ValidationFilters = ({ filters, onFiltersChange, onClearFilters }: ValidationFiltersProps) => {
  const productTypes: { value: ProductType; label: string }[] = [
    { value: 'producto_terminado', label: 'Producto Terminado' },
    { value: 'materia_prima', label: 'Materia Prima' },
    { value: 'material_envase', label: 'Material de Envase' },
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
    { value: 'validado', label: 'Validado' },
    { value: 'proximo_vencer', label: 'Próximo a Vencer' },
    { value: 'vencido', label: 'Vencido' },
    { value: 'en_revalidacion', label: 'En Revalidación' },
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
            Filtros de Búsqueda
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <X className="mr-2 h-4 w-4" />
              Limpiar Filtros
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="productType">Tipo de Producto</Label>
            <Select value={filters.productType || ''} onValueChange={(value) => updateFilter('productType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
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
            <Label htmlFor="equipmentType">Equipo Analítico</Label>
            <Select value={filters.equipmentType || ''} onValueChange={(value) => updateFilter('equipmentType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar equipo" />
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
            <Label htmlFor="status">Estado</Label>
            <Select value={filters.status || ''} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
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
            <Label htmlFor="productCode">Código de Producto</Label>
            <Input
              id="productCode"
              placeholder="Buscar por código"
              value={filters.productCode || ''}
              onChange={(e) => updateFilter('productCode', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="validationCode">Código de Validación</Label>
            <Input
              id="validationCode"
              placeholder="Buscar por código"
              value={filters.validationCode || ''}
              onChange={(e) => updateFilter('validationCode', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="expiryDateFrom">Vencimiento Desde</Label>
            <Input
              id="expiryDateFrom"
              type="date"
              value={filters.expiryDateFrom || ''}
              onChange={(e) => updateFilter('expiryDateFrom', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="expiryDateTo">Vencimiento Hasta</Label>
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
