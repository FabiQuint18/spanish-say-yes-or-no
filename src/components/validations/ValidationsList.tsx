import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Upload, Trash2, Edit, Printer, Download, FileText, Filter } from 'lucide-react';
import { Validation, ValidationType, ValidationFilters } from '@/types/validation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { formatDate, getDaysUntilExpiry } from '@/utils/dateUtils';
import ValidationFiles from './ValidationFiles';
import ValidationFiltersComponent from '@/components/filters/ValidationFilters';

interface ValidationsListProps {
  validations: Validation[];
  onEdit: (validation: Validation) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onFileUpload: (validationId: string, file: File) => void;
  onFileDelete: (fileId: string) => void;
}

const ValidationsList = ({ validations, onEdit, onDelete, onAdd, onFileUpload, onFileDelete }: ValidationsListProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [filterType, setFilterType] = useState<ValidationType | 'all'>('all');
  const [selectedValidation, setSelectedValidation] = useState<Validation | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ValidationFilters>({});

  const applyFilters = (validationsList: Validation[]): Validation[] => {
    return validationsList.filter(validation => {
      // Apply type filter
      if (filterType !== 'all' && validation.validation_type !== filterType) {
        return false;
      }

      // Apply advanced filters
      if (filters.validationType && validation.validation_type !== filters.validationType) {
        return false;
      }

      if (filters.subcategory && validation.subcategory !== filters.subcategory) {
        return false;
      }

      if (filters.validationCode && !validation.validation_code.toLowerCase().includes(filters.validationCode.toLowerCase())) {
        return false;
      }

      if (filters.productCode && !validation.product?.code.toLowerCase().includes(filters.productCode.toLowerCase())) {
        return false;
      }

      if (filters.equipmentType && validation.equipment_type !== filters.equipmentType) {
        return false;
      }

      if (filters.status && validation.status !== filters.status) {
        return false;
      }

      if (filters.expiryDateFrom && validation.expiry_date < filters.expiryDateFrom) {
        return false;
      }

      if (filters.expiryDateTo && validation.expiry_date > filters.expiryDateTo) {
        return false;
      }

      return true;
    });
  };

  const filteredValidations = applyFilters(validations);

  const getStatusBadge = (status: string, expiryDate: string) => {
    const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
    
    switch (status) {
      case 'validado':
        return <Badge className="bg-green-100 text-green-800">{t('status.validado')}</Badge>;
      case 'proximo_vencer':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('status.proximo')} ({daysUntilExpiry} días)</Badge>;
      case 'vencido':
        return <Badge className="bg-red-100 text-red-800">{t('status.vencido')}</Badge>;
      case 'en_revalidacion':
        return <Badge className="bg-blue-100 text-blue-800">{t('status.revalidacion')}</Badge>;
      case 'en_validacion':
        return <Badge className="bg-purple-100 text-purple-800">{t('status.en_validacion')}</Badge>;
      case 'por_revalidar':
        return <Badge className="bg-orange-100 text-orange-800">{t('status.por_revalidar')}</Badge>;
      case 'primera_revision':
        return <Badge className="bg-cyan-100 text-cyan-800">{t('status.primera_revision')}</Badge>;
      case 'segunda_revision':
        return <Badge className="bg-indigo-100 text-indigo-800">{t('status.segunda_revision')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSubcategoryLabel = (type: ValidationType, subcategory?: string) => {
    if (!subcategory) return '-';

    const labels: Record<string, string> = {
      // Procesos
      'fabricacion': 'Fabricación',
      'envasado': 'Envasado',
      // Métodos Analíticos
      'valoracion': 'Valoración',
      'disolucion': 'Disolución',
      'impurezas': 'Impurezas',
      'uniformidad_unidades_dosificacion': 'Uniformidad UD',
      'identificacion': 'Identificación',
      // Limpieza
      'no_aplica': 'NA',
    };

    return labels[subcategory] || subcategory;
  };

  const handlePrintByType = (type: ValidationType, subcategory?: string) => {
    let typeValidations = validations.filter(v => v.validation_type === type);
    
    if (subcategory) {
      typeValidations = typeValidations.filter(v => v.subcategory === subcategory);
    }
    
    if (typeValidations.length === 0) {
      toast({
        title: "Sin datos",
        description: `No hay validaciones de tipo ${type}${subcategory ? ` - ${getSubcategoryLabel(type, subcategory)}` : ''} para imprimir`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Generando PDF",
      description: `Preparando reporte de ${type}${subcategory ? ` - ${getSubcategoryLabel(type, subcategory)}` : ''}`,
    });
    
    setTimeout(() => {
      toast({
        title: "PDF generado",
        description: `Reporte de ${type}${subcategory ? ` - ${getSubcategoryLabel(type, subcategory)}` : ''} listo para descarga`,
      });
    }, 2000);
  };

  const handleDelete = (validation: Validation) => {
    onDelete(validation.id);
    toast({
      title: "Validación eliminada",
      description: `La validación ${validation.validation_code} ha sido eliminada`,
    });
  };

  const clearFilters = () => {
    setFilters({});
    setFilterType('all');
    setShowFilters(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Validaciones</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-background hover:bg-accent hover:text-accent-foreground border-border"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtros Avanzados
              </Button>
              <Button 
                onClick={onAdd}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nueva Validación
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="bg-background hover:bg-accent hover:text-accent-foreground border-border"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Cargar Archivo
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-popover border border-border">
                  <DialogHeader>
                    <DialogTitle>Cargar Validaciones</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Selecciona un archivo Excel o CSV para cargar validaciones masivamente
                    </p>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="w-full p-2 border border-border rounded bg-background text-foreground"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Quick Type Filters */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
              className={filterType === 'all' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-background hover:bg-accent hover:text-accent-foreground border-border'}
            >
              Todas ({validations.length})
            </Button>
            <Button
              variant={filterType === 'procesos' ? 'default' : 'outline'}
              onClick={() => setFilterType('procesos')}
              className={filterType === 'procesos' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-background hover:bg-accent hover:text-accent-foreground border-border'}
            >
              Procesos ({validations.filter(v => v.validation_type === 'procesos').length})
            </Button>
            <Button
              variant={filterType === 'limpieza' ? 'default' : 'outline'}
              onClick={() => setFilterType('limpieza')}
              className={filterType === 'limpieza' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-background hover:bg-accent hover:text-accent-foreground border-border'}
            >
              Limpieza ({validations.filter(v => v.validation_type === 'limpieza').length})
            </Button>
            <Button
              variant={filterType === 'metodos_analiticos' ? 'default' : 'outline'}
              onClick={() => setFilterType('metodos_analiticos')}
              className={filterType === 'metodos_analiticos' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-background hover:bg-accent hover:text-accent-foreground border-border'}
            >
              Métodos Analíticos ({validations.filter(v => v.validation_type === 'metodos_analiticos').length})
            </Button>
          </div>

          {/* Improved PDF Generation Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Printer className="mr-2 h-5 w-5" />
                Generar Reportes PDF por Tipo de Validación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Validaciones de Procesos */}
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-blue-700 mb-3">Validaciones de Procesos</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintByType('procesos', 'fabricacion')}
                        className="w-full justify-start hover:bg-blue-50 bg-background border-border hover:text-foreground"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        PDF Fabricación
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintByType('procesos', 'envasado')}
                        className="w-full justify-start hover:bg-blue-50 bg-background border-border hover:text-foreground"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        PDF Envasado
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Validaciones de Métodos Analíticos */}
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-green-700 mb-3">Métodos Analíticos</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintByType('metodos_analiticos', 'valoracion')}
                        className="w-full justify-start hover:bg-green-50 bg-background border-border hover:text-foreground"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        PDF Valoración
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintByType('metodos_analiticos', 'disolucion')}
                        className="w-full justify-start hover:bg-green-50 bg-background border-border hover:text-foreground"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        PDF Disolución
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintByType('metodos_analiticos', 'impurezas')}
                        className="w-full justify-start hover:bg-green-50 bg-background border-border hover:text-foreground"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        PDF Impurezas
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintByType('metodos_analiticos', 'uniformidad_unidades_dosificacion')}
                        className="w-full justify-start hover:bg-green-50 bg-background border-border hover:text-foreground"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        PDF Uniformidad UD
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintByType('metodos_analiticos', 'identificacion')}
                        className="w-full justify-start hover:bg-green-50 bg-background border-border hover:text-foreground"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        PDF Identificación
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Validaciones de Limpieza */}
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-purple-700 mb-3">Validaciones de Limpieza</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintByType('limpieza', 'no_aplica')}
                        className="w-full justify-start hover:bg-purple-50 bg-background border-border hover:text-foreground"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        PDF Limpieza (NA)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Subcategoría</TableHead>
                <TableHead>Equipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Archivos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredValidations.map((validation) => (
                <TableRow key={validation.id}>
                  <TableCell className="font-medium">
                    {validation.validation_code}
                  </TableCell>
                  <TableCell>{validation.product?.name}</TableCell>
                  <TableCell>{validation.validation_type}</TableCell>
                  <TableCell>
                    {getSubcategoryLabel(validation.validation_type, validation.subcategory)}
                  </TableCell>
                  <TableCell>{validation.equipment_type}</TableCell>
                  <TableCell>
                    {getStatusBadge(validation.status, validation.expiry_date)}
                  </TableCell>
                  <TableCell>{formatDate(validation.expiry_date)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-background hover:bg-accent hover:text-accent-foreground border-border"
                        >
                          <FileText className="h-4 w-4" />
                          {validation.files?.length || 0}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl bg-popover border border-border">
                        <DialogHeader>
                          <DialogTitle>
                            Archivos - {validation.validation_code}
                          </DialogTitle>
                        </DialogHeader>
                        <ValidationFiles
                          validationId={validation.id}
                          files={validation.files || []}
                          onFileUpload={onFileUpload}
                          onFileDelete={onFileDelete}
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(validation)}
                        className="bg-background hover:bg-accent hover:text-accent-foreground border-border"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-background hover:bg-destructive/10 hover:text-destructive border-border"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-popover border border-border">
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro de eliminar este registro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. La validación {validation.validation_code} será eliminada permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-background hover:bg-accent hover:text-accent-foreground border-border">
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(validation)}
                              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredValidations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron validaciones con los filtros aplicados</p>
              <Button 
                variant="outline" 
                onClick={clearFilters} 
                className="mt-2 bg-background hover:bg-accent hover:text-accent-foreground border-border"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <ValidationFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />
      )}
    </div>
  );
};

export default ValidationsList;
