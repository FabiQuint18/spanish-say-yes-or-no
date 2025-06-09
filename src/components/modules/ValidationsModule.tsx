import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Plus, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Validation } from '@/types/validation';
import ValidationsList from '@/components/validations/ValidationsList';
import { useToast } from '@/hooks/use-toast';

const ValidationsModule = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [validations, setValidations] = useState<Validation[]>([]);

  // Mock data con subcategorías y archivos
  const mockValidations: Validation[] = [
    {
      id: '1',
      product_id: '1',
      validation_code: 'VAL-001-2024',
      equipment_type: 'HPLC',
      validation_type: 'metodos_analiticos',
      subcategory: 'valoracion',
      issue_date: '2024-01-15',
      expiry_date: '2029-01-15',
      status: 'validado',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
      product: {
        id: '1',
        code: 'PT-001',
        name: 'Paracetamol 500mg',
        type: 'producto_terminado',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
      },
      files: [
        {
          id: 'file-1',
          validation_id: '1',
          file_name: 'Validacion_Paracetamol_500mg_Valoracion.pdf',
          file_url: '/mock-files/validacion-paracetamol.pdf',
          file_size: 2048576,
          file_type: 'application/pdf',
          uploaded_at: '2024-01-15T10:30:00Z',
          uploaded_by: 'user1',
        }
      ]
    },
    {
      id: '2',
      product_id: '2',
      validation_code: 'VAL-002-2024',
      equipment_type: 'GC',
      validation_type: 'procesos',
      subcategory: 'fabricacion',
      issue_date: '2024-06-15',
      expiry_date: '2025-02-15',
      status: 'en_validacion',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2024-06-15T00:00:00Z',
      updated_at: '2024-06-15T00:00:00Z',
      product: {
        id: '2',
        code: 'MP-001',
        name: 'Principio Activo A',
        type: 'materia_prima',
        created_at: '2024-06-15T00:00:00Z',
        updated_at: '2024-06-15T00:00:00Z',
      },
      files: []
    },
    {
      id: '3',
      product_id: '3',
      validation_code: 'VAL-003-2023',
      equipment_type: 'UV-VIS',
      validation_type: 'limpieza',
      subcategory: 'no_aplica',
      issue_date: '2023-01-10',
      expiry_date: '2024-12-10',
      status: 'por_revalidar',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2023-01-10T00:00:00Z',
      updated_at: '2023-01-10T00:00:00Z',
      product: {
        id: '3',
        code: 'PT-002',
        name: 'Ibuprofeno 400mg',
        type: 'producto_terminado',
        created_at: '2023-01-10T00:00:00Z',
        updated_at: '2023-01-10T00:00:00Z',
      },
      files: []
    },
    {
      id: '4',
      product_id: '4',
      validation_code: 'VAL-004-2024',
      equipment_type: 'NIR',
      validation_type: 'metodos_analiticos',
      subcategory: 'disolucion',
      issue_date: '2024-03-01',
      expiry_date: '2025-03-01',
      status: 'primera_revision',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2024-03-01T00:00:00Z',
      updated_at: '2024-03-01T00:00:00Z',
      product: {
        id: '4',
        code: 'PT-003',
        name: 'Aspirina 100mg',
        type: 'producto_terminado',
        created_at: '2024-03-01T00:00:00Z',
        updated_at: '2024-03-01T00:00:00Z',
      },
      files: []
    },
    {
      id: '5',
      product_id: '1',
      validation_code: 'VAL-005-2024',
      equipment_type: 'HPLC',
      validation_type: 'metodos_analiticos',
      subcategory: 'impurezas',
      issue_date: '2024-02-15',
      expiry_date: '2029-02-15',
      status: 'validado',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2024-02-15T00:00:00Z',
      updated_at: '2024-02-15T00:00:00Z',
      product: {
        id: '1',
        code: 'PT-001',
        name: 'Paracetamol 500mg',
        type: 'producto_terminado',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
      },
      files: []
    },
    {
      id: '6',
      product_id: '2',
      validation_code: 'VAL-006-2024',
      equipment_type: 'GC',
      validation_type: 'procesos',
      subcategory: 'envasado',
      issue_date: '2024-07-01',
      expiry_date: '2025-07-01',
      status: 'en_validacion',
      created_by: 'user1',
      updated_by: 'user1',
      created_at: '2024-07-01T00:00:00Z',
      updated_at: '2024-07-01T00:00:00Z',
      product: {
        id: '2',
        code: 'MP-001',
        name: 'Principio Activo A',
        type: 'materia_prima',
        created_at: '2024-06-15T00:00:00Z',
        updated_at: '2024-06-15T00:00:00Z',
      },
      files: []
    },
  ];

  useEffect(() => {
    setValidations(mockValidations);
  }, []);

  const handleEdit = (validation: Validation) => {
    toast({
      title: "Editar validación",
      description: `Editando validación ${validation.validation_code}`,
    });
    // Aquí iría la lógica de edición
  };

  const handleDelete = (id: string) => {
    setValidations(prev => prev.filter(v => v.id !== id));
  };

  const handleAdd = () => {
    toast({
      title: "Nueva validación",
      description: "Abriendo formulario para nueva validación",
    });
    // Aquí iría la lógica para agregar nueva validación
  };

  const handleFileUpload = (validationId: string, file: File) => {
    // Simular carga de archivo
    const mockFile = {
      id: `file-${Date.now()}`,
      validation_id: validationId,
      file_name: file.name,
      file_url: URL.createObjectURL(file),
      file_size: file.size,
      file_type: file.type,
      uploaded_at: new Date().toISOString(),
      uploaded_by: 'current_user',
    };

    setValidations(prev => 
      prev.map(v => 
        v.id === validationId 
          ? { ...v, files: [...(v.files || []), mockFile] }
          : v
      )
    );
  };

  const handleFileDelete = (fileId: string) => {
    setValidations(prev => 
      prev.map(v => ({
        ...v,
        files: v.files?.filter(f => f.id !== fileId) || []
      }))
    );
  };

  const stats = {
    validated: validations.filter(v => v.status === 'validado').length,
    expiring: validations.filter(v => v.status === 'proximo_vencer').length,
    expired: validations.filter(v => v.status === 'vencido').length,
    inValidation: validations.filter(v => v.status === 'en_validacion').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('menu.validations')}</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona las validaciones del sistema
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Validación
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Validadas
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.validated}</div>
            <p className="text-xs text-muted-foreground">
              Validaciones completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximas a Vencer
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expiring}</div>
            <p className="text-xs text-muted-foreground">
              En los próximos 30 días
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vencidas
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expired}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención inmediata
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              En Validación
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inValidation}</div>
            <p className="text-xs text-muted-foreground">
              En proceso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Validations List */}
      <ValidationsList
        validations={validations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
      />
    </div>
  );
};

export default ValidationsModule;
