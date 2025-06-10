import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [reportType, setReportType] = useState<string>('all');
  const [reportSubcategory, setReportSubcategory] = useState<string>('all');

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
        return <Badge className="bg-green-100 text-green-800">Validado</Badge>;
      case 'proximo_vencer':
        return <Badge className="bg-yellow-100 text-yellow-800">Próximo a Vencer ({daysUntilExpiry} días)</Badge>;
      case 'vencido':
        return <Badge className="bg-red-100 text-red-800">Vencido</Badge>;
      case 'en_revalidacion':
        return <Badge className="bg-blue-100 text-blue-800">En Revalidación</Badge>;
      case 'en_validacion':
        return <Badge className="bg-purple-100 text-purple-800">En Validación</Badge>;
      case 'por_revalidar':
        return <Badge className="bg-orange-100 text-orange-800">Por Revalidar</Badge>;
      case 'primera_revision':
        return <Badge className="bg-cyan-100 text-cyan-800">Primera Revisión (Estado Validado)</Badge>;
      case 'segunda_revision':
        return <Badge className="bg-indigo-100 text-indigo-800">Segunda Revisión (Estado Validado)</Badge>;
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
      'trazas': 'Trazas',
      // Limpieza
      'no_aplica': 'NA',
    };

    return labels[subcategory] || subcategory;
  };

  const getValidationTypeLabel = (type: ValidationType) => {
    switch (type) {
      case 'procesos':
        return 'Procesos';
      case 'limpieza':
        return 'Limpieza';
      case 'metodos_analiticos':
        return 'Métodos Analíticos';
      default:
        return type;
    }
  };

  const handleGenerateReport = () => {
    let filteredForReport = validations;
    
    if (reportType !== 'all') {
      filteredForReport = filteredForReport.filter(v => v.validation_type === reportType);
      
      if (reportSubcategory !== 'all') {
        filteredForReport = filteredForReport.filter(v => v.subcategory === reportSubcategory);
      }
    }
    
    if (filteredForReport.length === 0) {
      toast({
        title: "Sin Datos",
        description: "No hay validaciones que coincidan con los filtros seleccionados",
        variant: "destructive",
      });
      return;
    }

    const reportTitle = reportType === 'all' 
      ? 'Todas las Validaciones' 
      : `${reportType}${reportSubcategory !== 'all' && reportSubcategory !== 'no_aplica' ? ` - ${getSubcategoryLabel(reportType as ValidationType, reportSubcategory)}` : ''}`;

    toast({
      title: "Generando PDF",
      description: `Preparando reporte: ${reportTitle}`,
    });
    
    setTimeout(() => {
      toast({
        title: "PDF Generado",
        description: `Reporte de ${reportTitle} listo para descarga`,
      });
    }, 2000);
  };

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
          { value: 'uniformidad_unidades_dosificacion', label: 'Uniformidad UD' },
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

  const handleDelete = (validation: Validation) => {
    onDelete(validation.id);
    toast({
      title: "Validación Eliminada",
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
            <CardTitle className="text-center flex-1">Lista de Validaciones</CardTitle>
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
                    <DialogTitle className="text-center">Cargar Validaciones</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground mb-4 text-center">
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
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mb-6">
              <ValidationFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </div>
          )}

          {/* Quick Type Filters */}
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
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

          {/* Report Generation Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-lg">
                <Printer className="mr-2 h-5 w-5" />
                Generar Reporte de Validaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium mb-2 text-center">Tipo de Validación</label>
                  <Select 
                    value={reportType} 
                    onValueChange={(value) => {
                      setReportType(value);
                      setReportSubcategory('all');
                    }}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="all">Todas las Validaciones</SelectItem>
                      <SelectItem value="procesos">Procesos</SelectItem>
                      <SelectItem value="metodos_analiticos">Métodos Analíticos</SelectItem>
                      <SelectItem value="limpieza">Limpieza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-center">Subcategoría</label>
                  <Select 
                    value={reportSubcategory} 
                    onValueChange={setReportSubcategory}
                    disabled={reportType === 'all'}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Seleccionar subcategoría" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="all">Todas las Subcategorías</SelectItem>
                      {getSubcategoryOptions(reportType).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Button 
                    onClick={handleGenerateReport}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Generar Reporte PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Código del Documento</TableHead>
                <TableHead className="text-center">Código de Producto o Materia Prima</TableHead>
                <TableHead className="text-center">Producto o Materia Prima</TableHead>
                <TableHead className="text-center">Tipo de Validación</TableHead>
                <TableHead className="text-center">Subcategoría</TableHead>
                <TableHead className="text-center">Equipo</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Vencimiento</TableHead>
                <TableHead className="text-center">Archivos</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredValidations.map((validation) => (
                <TableRow key={validation.id}>
                  <TableCell className="font-medium text-center">
                    {validation.validation_code}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {validation.product?.code || '-'}
                  </TableCell>
                  <TableCell className="text-center">{validation.product?.name}</TableCell>
                  <TableCell className="text-center">{getValidationTypeLabel(validation.validation_type)}</TableCell>
                  <TableCell className="text-center">
                    {getSubcategoryLabel(validation.validation_type, validation.subcategory)}
                  </TableCell>
                  <TableCell className="text-center">{validation.equipment_type}</TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(validation.status, validation.expiry_date)}
                  </TableCell>
                  <TableCell className="text-center">{formatDate(validation.expiry_date)}</TableCell>
                  <TableCell className="text-center">
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
                          <DialogTitle className="text-center">
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
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
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
                            <AlertDialogTitle className="text-center">¿Estás Seguro de Eliminar Este Registro?</AlertDialogTitle>
                            <AlertDialogDescription className="text-center">
                              Esta acción no se puede deshacer. La validación {validation.validation_code} será eliminada permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="justify-center">
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
                Limpiar Filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationsList;
