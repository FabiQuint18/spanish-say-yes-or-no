
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ValidationType } from '@/types/validation';

interface ValidationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (validation: any) => void;
}

const ValidationForm = ({ isOpen, onClose, onSubmit }: ValidationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    validation_code: '',
    product_code: '',
    product_name: '',
    validation_type: '',
    subcategory: '',
    equipment_type: '',
    issue_date: '',
    expiry_date: '',
  });

  const getSubcategoryOptions = (validationType: string) => {
    switch (validationType) {
      case 'procesos':
        return [
          { value: 'fabricacion', label: 'Fabricación' },
          { value: 'envasado', label: 'Envasado' },
        ];
      case 'metodos_analiticos':
        return [
          { value: 'valoracion', label: 'Valoración' },
          { value: 'disolucion', label: 'Disolución' },
          { value: 'impurezas', label: 'Impurezas' },
          { value: 'uniformidad_unidades_dosificacion', label: 'Uniformidad de Unidades de Dosificación' },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.validation_code || !formData.validation_type) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    onClose();
    
    toast({
      title: "Validación Creada",
      description: `Nueva validación ${formData.validation_code} creada exitosamente`,
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset subcategory when validation type changes
      ...(field === 'validation_type' ? { subcategory: '' } : {})
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-popover border border-border">
        <DialogHeader>
          <DialogTitle>Nueva Validación</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="validation_code">Código de Validación *</Label>
              <Input
                id="validation_code"
                value={formData.validation_code}
                onChange={(e) => updateField('validation_code', e.target.value)}
                placeholder="VAL-XXX-2024"
                required
              />
            </div>

            <div>
              <Label htmlFor="product_code">Código de Producto</Label>
              <Input
                id="product_code"
                value={formData.product_code}
                onChange={(e) => updateField('product_code', e.target.value)}
                placeholder="PT-XXX"
              />
            </div>

            <div>
              <Label htmlFor="product_name">Nombre del Producto</Label>
              <Input
                id="product_name"
                value={formData.product_name}
                onChange={(e) => updateField('product_name', e.target.value)}
                placeholder="Nombre del producto"
              />
            </div>

            <div>
              <Label htmlFor="validation_type">Tipo de Validación *</Label>
              <Select
                value={formData.validation_type}
                onValueChange={(value) => updateField('validation_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="procesos">Procesos</SelectItem>
                  <SelectItem value="metodos_analiticos">Métodos Analíticos</SelectItem>
                  <SelectItem value="limpieza">Limpieza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subcategory">Subcategoría</Label>
              <Select
                value={formData.subcategory}
                onValueChange={(value) => updateField('subcategory', value)}
                disabled={!formData.validation_type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar subcategoría" />
                </SelectTrigger>
                <SelectContent>
                  {getSubcategoryOptions(formData.validation_type).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="equipment_type">Tipo de Equipo</Label>
              <Select
                value={formData.equipment_type}
                onValueChange={(value) => updateField('equipment_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar equipo" />
                </SelectTrigger>
                <SelectContent>
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
              <Label htmlFor="issue_date">Fecha de Emisión</Label>
              <Input
                id="issue_date"
                type="date"
                value={formData.issue_date}
                onChange={(e) => updateField('issue_date', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="expiry_date">Fecha de Vencimiento</Label>
              <Input
                id="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={(e) => updateField('expiry_date', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Validación
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ValidationForm;
