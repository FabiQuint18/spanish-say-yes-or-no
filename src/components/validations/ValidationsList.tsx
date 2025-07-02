
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Validation, UserRole, ValidationFilters as ValidationFiltersType } from '@/types/validation';
import { formatDate, getDaysUntilExpiry } from '@/utils/dateUtils';
import { Search, Edit, Trash2, Plus, FileText, ChevronDown, Eye, Upload, Printer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ValidationFilters from '@/components/filters/ValidationFilters';

interface ValidationsListProps {
  validations: Validation[];
  onEdit: (validation: Validation) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onFileUpload: (validationId: string, file: File) => void;
  onFileDelete: (fileId: string) => void;
  userRole?: UserRole;
}

const ValidationsList = ({ 
  validations, 
  onEdit, 
  onDelete, 
  onAdd, 
  onFileUpload, 
  onFileDelete,
  userRole = 'analista'
}: ValidationsListProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ValidationFiltersType>({});

  // Aplicar filtros
  const applyFilters = (validationsList: Validation[]): Validation[] => {
    let filtered = validationsList;

    // Aplicar búsqueda
    if (searchTerm) {
      filtered = filtered.filter(validation =>
        validation.validation_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        validation.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        validation.product?.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros adicionales
    if (filters.validationType) {
      filtered = filtered.filter(v => v.validation_type === filters.validationType);
    }

    if (filters.subcategory) {
      filtered = filtered.filter(v => v.subcategory === filters.subcategory);
    }

    if (filters.validationCode) {
      filtered = filtered.filter(v => 
        v.validation_code.toLowerCase().includes(filters.validationCode.toLowerCase())
      );
    }

    if (filters.productCode) {
      filtered = filtered.filter(v => 
        v.product?.code.toLowerCase().includes(filters.productCode.toLowerCase())
      );
    }

    if (filters.equipmentType) {
      filtered = filtered.filter(v => v.equipment_type === filters.equipmentType);
    }

    if (filters.status) {
      filtered = filtered.filter(v => v.status === filters.status);
    }

    return filtered;
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

  const getValidationTypeLabel = (type: string) => {
    switch (type) {
      case 'procesos':
        return 'Procesos';
      case 'limpieza':
        return 'Limpieza';
      case 'metodos_analiticos':
        return 'Métodos Analíticos';
      case 'sistemas_computarizados':
        return 'Sistemas Computarizados';
      default:
        return type;
    }
  };

  const getSubcategoryLabel = (validationType: string, subcategory?: string) => {
    if (!subcategory) return 'N/A';
    
    switch (validationType) {
      case 'procesos':
        return subcategory === 'fabricacion' ? t('validations.manufacturing') : 
               subcategory === 'empaque' ? t('validations.packaging') : subcategory;
      case 'metodos_analiticos':
        switch (subcategory) {
          case 'valoracion': return t('validations.assay');
          case 'disolucion': return t('validations.dissolution');
          case 'impurezas': return t('validations.impurities');
          case 'uniformidad_unidades_dosificacion': return t('validations.uniformity');
          case 'identificacion': return t('validations.identification');
          case 'trazas': return t('validations.traces');
          default: return subcategory;
        }
      case 'limpieza':
        return t('validations.not_applicable');
      default:
        return subcategory;
    }
  };

  const getMaterialTypeLabel = (type: string) => {
    switch (type) {
      case 'producto_terminado':
        return t('material_types.finished_product');
      case 'materia_prima':
        return t('material_types.raw_material');
      case 'material_empaque':
        return t('material_types.packaging_material');
      case 'granel':
        return t('material_types.bulk');
      default:
        return type;
    }
  };

  const FilesDropdown = ({ validation }: { validation: Validation }) => {
    const files = validation.files || [];
    const canUploadFiles = userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista';
    const canDelete = userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista';

    if (files.length === 0 && !canUploadFiles) {
      return <span className="text-sm text-muted-foreground">Sin archivos</span>;
    }

    return (
      <div className="flex items-center space-x-2">
        {files.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                {files.length}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-popover border border-border z-50">
              {files.map((file) => (
                <div key={file.id} className="p-2 border-b last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.file_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.file_size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(file.file_url, '_blank')}
                        title="Ver"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.print()}
                        title="Imprimir"
                      >
                        <Printer className="h-3 w-3" />
                      </Button>
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onFileDelete(file.id)}
                          title="Eliminar"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        {canUploadFiles && (
          <>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFileUpload(validation.id, file);
              }}
              className="hidden"
              id={`file-upload-${validation.id}`}
            />
            <label htmlFor={`file-upload-${validation.id}`}>
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                </span>
              </Button>
            </label>
          </>
        )}
      </div>
    );
  };

  // Control de acceso por roles
  const canEdit = userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista';
  const canDelete = userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista';
  const canAdd = userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista';

  return (
    <div className="space-y-6">
      {/* Filtros de validaciones */}
      <ValidationFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters({})}
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>{t('validations.list')}</CardTitle>
              <CardDescription>
                {t('validations.manage')}
              </CardDescription>
            </div>
            {canAdd && (
              <Button onClick={onAdd} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                {t('validations.new')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('validations.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">{t('validations.validation_code')}</TableHead>
                    <TableHead className="min-w-[150px]">{t('validations.product_raw_material')}</TableHead>
                    <TableHead className="min-w-[100px]">{t('validations.product_raw_material_code')}</TableHead>
                    <TableHead className="min-w-[150px]">{t('validations.validation_type')}</TableHead>
                    <TableHead className="min-w-[120px]">{t('validations.subcategory')}</TableHead>
                    <TableHead className="min-w-[100px]">{t('validations.equipment')}</TableHead>
                    <TableHead className="min-w-[120px]">{t('validations.status')}</TableHead>
                    <TableHead className="min-w-[120px]">{t('validations.expiry_date')}</TableHead>
                    <TableHead className="min-w-[120px]">{t('validations.files')}</TableHead>
                    {(canEdit || canDelete) && <TableHead className="min-w-[100px]">{t('validations.actions')}</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredValidations.map((validation) => (
                    <TableRow key={validation.id}>
                      <TableCell className="font-medium">
                        {validation.validation_code}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{validation.product?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {getMaterialTypeLabel(validation.product?.type || '')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {validation.product?.code}
                      </TableCell>
                      <TableCell>{getValidationTypeLabel(validation.validation_type)}</TableCell>
                      <TableCell>{getSubcategoryLabel(validation.validation_type, validation.subcategory)}</TableCell>
                      <TableCell>{validation.equipment_type}</TableCell>
                      <TableCell>{getStatusBadge(validation.status, validation.expiry_date)}</TableCell>
                      <TableCell>{formatDate(validation.expiry_date)}</TableCell>
                      <TableCell>
                        <FilesDropdown validation={validation} />
                      </TableCell>
                      {(canEdit || canDelete) && (
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {canEdit && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(validation)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            {canDelete && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(validation.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredValidations.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? t('validations.no_results') : t('validations.no_validations')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationsList;
