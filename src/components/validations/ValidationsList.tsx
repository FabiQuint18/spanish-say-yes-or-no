
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Validation, UserRole, ValidationFilters as ValidationFiltersType } from '@/types/validation';
import { formatDate, getDaysUntilExpiry } from '@/utils/dateUtils';
import { Search, Edit, Trash2, Plus, FileText, ChevronDown, Eye, Upload, Printer, Download } from 'lucide-react';
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

  const handlePrintByType = (type?: string, subcategory?: string) => {
    let validationsToPrint = filteredValidations;
    
    if (type) {
      validationsToPrint = validationsToPrint.filter(v => v.validation_type === type);
    }
    
    if (subcategory) {
      validationsToPrint = validationsToPrint.filter(v => v.subcategory === subcategory);
    }
    
    const printContent = generatePrintableContent(validationsToPrint, type, subcategory);
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = (type?: string, subcategory?: string) => {
    let validationsToPrint = filteredValidations;
    
    if (type) {
      validationsToPrint = validationsToPrint.filter(v => v.validation_type === type);
    }
    
    if (subcategory) {
      validationsToPrint = validationsToPrint.filter(v => v.subcategory === subcategory);
    }
    
    const printContent = generatePrintableContent(validationsToPrint, type, subcategory);
    const blob = new Blob([printContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const fileName = getFileName(type, subcategory);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFileName = (type?: string, subcategory?: string) => {
    if (subcategory && type) {
      return `validaciones_${type}_${subcategory}`;
    } else if (type) {
      return `validaciones_${type}`;
    } else {
      return 'validaciones_todas';
    }
  };

  const getReportTitle = (type?: string, subcategory?: string) => {
    if (subcategory && type) {
      const typeLabel = getValidationTypeLabel(type);
      const subcategoryLabel = getSubcategoryLabel(type, subcategory);
      return `Listado de Validaciones ${typeLabel} - ${subcategoryLabel}`;
    } else if (type) {
      return `Listado de Validaciones ${getValidationTypeLabel(type)}`;
    } else {
      return 'Listado de Todas las Validaciones';
    }
  };

  const generatePrintableContent = (validationsList: Validation[], type?: string, subcategory?: string) => {
    const reportTitle = getReportTitle(type, subcategory);
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${reportTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { width: 150px; height: auto; margin-bottom: 20px; }
            h1 { color: #333; text-align: center; margin: 20px 0; font-size: 24px; }
            .info { margin-bottom: 20px; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .status-badge { padding: 2px 6px; border-radius: 4px; font-size: 10px; }
            .validado { background-color: #dcfce7; color: #166534; }
            .proximo_vencer { background-color: #fef3c7; color: #92400e; }
            .vencido { background-color: #fecaca; color: #991b1b; }
            .en_validacion { background-color: #dbeafe; color: #1e40af; }
            .en_revalidacion { background-color: #e0e7ff; color: #3730a3; }
            .por_revalidar { background-color: #fed7aa; color: #c2410c; }
            .primera_revision { background-color: #cffafe; color: #155e75; }
            .segunda_revision { background-color: #e0e7ff; color: #4338ca; }
            @media print {
              body { margin: 10px; }
              .header { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMjU2M2ViIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI0NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVNUFJFU0E8L3RleHQ+Cjx0ZXh0IHg9Ijc1IiB5PSI2NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2lzdGVtYSBkZSBWYWxpZGFjaW9uZXM8L3RleHQ+Cjwvc3ZnPgo=" alt="Logo Empresa" class="logo" />
            <h1>${reportTitle}</h1>
          </div>
          <div class="info">
            <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p><strong>Total de registros:</strong> ${validationsList.length}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Código de Validación</th>
                <th>Producto/Materia Prima</th>
                <th>Código de Producto</th>
                <th>Tipo de Validación</th>
                <th>Subcategoría</th>
                <th>Equipo</th>
                <th>Estado</th>
                <th>Fecha de Vigencia</th>
                <th>Fecha de Vencimiento</th>
              </tr>
            </thead>
            <tbody>
              ${validationsList.map(validation => `
                <tr>
                  <td>${validation.validation_code}</td>
                  <td>${validation.product?.name || 'N/A'}</td>
                  <td>${validation.product?.code || 'N/A'}</td>
                  <td>${getValidationTypeLabel(validation.validation_type)}</td>
                  <td>${getSubcategoryLabel(validation.validation_type, validation.subcategory)}</td>
                  <td>${validation.equipment_type}</td>
                  <td><span class="status-badge ${validation.status}">${validation.status.replace(/_/g, ' ')}</span></td>
                  <td>${formatDate(validation.issue_date)}</td>
                  <td>${formatDate(validation.expiry_date)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const validationTypes = [...new Set(validations.map(v => v.validation_type))];

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
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = file.file_url;
                          link.target = '_blank';
                          link.download = file.file_name;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
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
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Printer className="h-4 w-4" />
                      {t('validations.print.options')}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {/* Opciones sincronizadas con filtros actuales */}
                    <DropdownMenuItem onClick={() => handlePrintByType(filters.validationType, filters.subcategory)}>
                      <Printer className="h-4 w-4 mr-2" />
                      Imprimir: {getReportTitle(filters.validationType, filters.subcategory)}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadPDF(filters.validationType, filters.subcategory)}>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar: {getReportTitle(filters.validationType, filters.subcategory)}
                    </DropdownMenuItem>
                    
                    {/* Separador */}
                    <div className="border-t my-1"></div>
                    
                    {/* Opciones generales */}
                    <DropdownMenuItem onClick={() => handlePrintByType()}>
                      <Printer className="h-4 w-4 mr-2" />
                      {t('validations.print.all')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadPDF()}>
                      <Download className="h-4 w-4 mr-2" />
                      {t('validations.print.downloadAll')}
                    </DropdownMenuItem>
                    
                    {/* Opciones por tipo */}
                    {validationTypes.map(type => (
                      <React.Fragment key={type}>
                        <DropdownMenuItem onClick={() => handlePrintByType(type)}>
                          <Eye className="h-4 w-4 mr-2" />
                          {t('validations.print.byType')} {getValidationTypeLabel(type)}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadPDF(type)}>
                          <Download className="h-4 w-4 mr-2" />
                          {t('validations.print.downloadByType')} {getValidationTypeLabel(type)}
                        </DropdownMenuItem>
                      </React.Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {canAdd && (
                  <Button onClick={onAdd} className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('validations.new')}
                  </Button>
                )}
              </div>
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
                    <TableHead className="min-w-[120px]">{t('validations.validity_date')}</TableHead>
                    <TableHead className="min-w-[120px]">{t('validations.expiry_date')}</TableHead>
                    <TableHead className="min-w-[120px]">{t('validations.files')}</TableHead>
                    {(canEdit || canDelete) && <TableHead className="min-w-[120px]">{t('validations.actions')}</TableHead>}
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
                      <TableCell>{formatDate(validation.issue_date)}</TableCell>
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
