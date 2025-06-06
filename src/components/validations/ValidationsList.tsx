
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Upload, Trash2, Edit, Printer, Download } from 'lucide-react';
import { Validation, ValidationType } from '@/types/validation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { formatDate, getDaysUntilExpiry } from '@/utils/dateUtils';

interface ValidationsListProps {
  validations: Validation[];
  onEdit: (validation: Validation) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ValidationsList = ({ validations, onEdit, onDelete, onAdd }: ValidationsListProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [filterType, setFilterType] = useState<ValidationType | 'all'>('all');

  const filteredValidations = filterType === 'all' 
    ? validations 
    : validations.filter(v => v.validation_type === filterType);

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

  const handlePrintByType = (type: ValidationType) => {
    const typeValidations = validations.filter(v => v.validation_type === type);
    
    if (typeValidations.length === 0) {
      toast({
        title: "Sin datos",
        description: `No hay validaciones de tipo ${type} para imprimir`,
        variant: "destructive",
      });
      return;
    }

    // Simular impresión por tipo
    toast({
      title: "Generando PDF",
      description: `Preparando reporte de validaciones de ${type}`,
    });
    
    // Aquí iría la lógica real de generación de PDF
    setTimeout(() => {
      toast({
        title: "PDF generado",
        description: `Reporte de ${type} listo para descarga`,
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Validaciones</CardTitle>
            <div className="flex gap-2">
              <Button onClick={onAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Validación
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Cargar Archivo
                  </Button>
                </DialogTrigger>
                <DialogContent>
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
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
            >
              Todas
            </Button>
            <Button
              variant={filterType === 'procesos' ? 'default' : 'outline'}
              onClick={() => setFilterType('procesos')}
            >
              Procesos
            </Button>
            <Button
              variant={filterType === 'limpieza' ? 'default' : 'outline'}
              onClick={() => setFilterType('limpieza')}
            >
              Limpieza
            </Button>
            <Button
              variant={filterType === 'metodos_analiticos' ? 'default' : 'outline'}
              onClick={() => setFilterType('metodos_analiticos')}
            >
              Métodos Analíticos
            </Button>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              onClick={() => handlePrintByType('procesos')}
            >
              <Printer className="mr-2 h-4 w-4" />
              PDF Procesos
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePrintByType('limpieza')}
            >
              <Printer className="mr-2 h-4 w-4" />
              PDF Limpieza
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePrintByType('metodos_analiticos')}
            >
              <Printer className="mr-2 h-4 w-4" />
              PDF Métodos
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Equipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
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
                  <TableCell>{validation.equipment_type}</TableCell>
                  <TableCell>
                    {getStatusBadge(validation.status, validation.expiry_date)}
                  </TableCell>
                  <TableCell>{formatDate(validation.expiry_date)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(validation)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro de eliminar este registro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. La validación {validation.validation_code} será eliminada permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(validation)}
                              className="bg-red-600 hover:bg-red-700"
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationsList;
