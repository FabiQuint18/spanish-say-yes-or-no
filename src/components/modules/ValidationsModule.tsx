
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Plus, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Validation } from '@/types/validation';
import ValidationsList from '@/components/validations/ValidationsList';
import ValidationForm from '@/components/validations/ValidationForm';
import { useToast } from '@/hooks/use-toast';

const ValidationsModule = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [validations, setValidations] = useState<Validation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingValidation, setEditingValidation] = useState<Validation | null>(null);

  // Mock data actualizado con "empaque" en lugar de "envasado"
  const mockValidations: Validation[] = [
    {
      id: '1',
      product_id: '1',
      validation_code: 'VAL-001-2024',
      equipment_type: 'HPLC',
      validation_type: 'metodos_analiticos',
      subcategory: 'valoracion',
      issue_date: '2024-01-15',
      expiry_date: '2026-01-15',
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
          file_name: 'Protocolo_Paracetamol_500mg_Valoracion.pdf',
          file_url: '/mock-files/protocolo-paracetamol.pdf',
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
      subcategory: 'empaque',
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
    setEditingValidation(validation);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setValidations(prev => prev.filter(v => v.id !== id));
  };

  const handleAdd = () => {
    setEditingValidation(null);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (editingValidation) {
      // Update existing validation
      setValidations(prev => 
        prev.map(v => 
          v.id === editingValidation.id 
            ? {
                ...v,
                validation_code: formData.validation_code,
                equipment_type: formData.equipment_type,
                validation_type: formData.validation_type,
                subcategory: formData.subcategory,
                issue_date: formData.issue_date,
                expiry_date: formData.expiry_date,
                status: formData.status,
                updated_at: new Date().toISOString(),
                product: v.product ? {
                  ...v.product,
                  code: formData.product_code,
                  name: formData.product_name,
                } : undefined
              }
            : v
        )
      );
    } else {
      // Create new validation
      const newValidation: Validation = {
        id: Date.now().toString(),
        product_id: Date.now().toString(),
        validation_code: formData.validation_code,
        equipment_type: formData.equipment_type,
        validation_type: formData.validation_type,
        subcategory: formData.subcategory,
        issue_date: formData.issue_date,
        expiry_date: formData.expiry_date,
        status: formData.status,
        created_by: 'current_user',
        updated_by: 'current_user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product: {
          id: Date.now().toString(),
          code: formData.product_code,
          name: formData.product_name,
          type: 'producto_terminado',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        files: []
      };

      setValidations(prev => [newValidation, ...prev]);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingValidation(null);
  };

  const handleFileUpload = (validationId: string, file: File) => {
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
            {t('validations.subtitle')}
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {t('validations.new')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.validated')}
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.validated}</div>
            <p className="text-xs text-muted-foreground">
              {t('validations.completed')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.expiring')}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expiring}</div>
            <p className="text-xs text-muted-foreground">
              {t('validations.next30days')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.expired')}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expired}</div>
            <p className="text-xs text-muted-foreground">
              {t('validations.immediate')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('validations.protocols')}
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validations.filter(v => v.files && v.files.length > 0).length}</div>
            <p className="text-xs text-muted-foreground">
              {t('validations.withDocumentation')}
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

      {/* Validation Form Modal */}
      <ValidationForm
        isOpen={showForm}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editingValidation={editingValidation}
      />
    </div>
  );
};

export default ValidationsModule;
