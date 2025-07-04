
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Plus, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Validation, UserRole, Product, Equipment } from '@/types/validation';
import ValidationsList from '@/components/validations/ValidationsList';
import ValidationForm from '@/components/validations/ValidationForm';
import { useToast } from '@/hooks/use-toast';

interface ValidationsModuleProps {
  userRole?: UserRole;
}

const ValidationsModule = ({ userRole = 'analista' }: ValidationsModuleProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [validations, setValidations] = useState<Validation[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingValidation, setEditingValidation] = useState<Validation | null>(null);

  // Cargar datos del localStorage
  useEffect(() => {
    // Cargar productos
    const savedProducts = localStorage.getItem('systemProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    // Cargar equipos
    const savedEquipments = localStorage.getItem('systemEquipments');
    if (savedEquipments) {
      setEquipments(JSON.parse(savedEquipments));
    }

    // Cargar validaciones
    const savedValidations = localStorage.getItem('systemValidations');
    if (savedValidations) {
      setValidations(JSON.parse(savedValidations));
    } else {
      // Inicializar con datos de ejemplo si no existen
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
          files: []
        }
      ];
      setValidations(mockValidations);
      localStorage.setItem('systemValidations', JSON.stringify(mockValidations));
    }
  }, []);

  const handleEdit = (validation: Validation) => {
    setEditingValidation(validation);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updatedValidations = validations.filter(v => v.id !== id);
    setValidations(updatedValidations);
    localStorage.setItem('systemValidations', JSON.stringify(updatedValidations));
    
    toast({
      title: "Validación eliminada",
      description: "La validación ha sido eliminada exitosamente",
    });
  };

  const handleAdd = () => {
    setEditingValidation(null);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (editingValidation) {
      // Actualizar validación existente
      const updatedValidations = validations.map(v => 
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
                type: formData.material_type,
              } : undefined
            }
          : v
      );
      setValidations(updatedValidations);
      localStorage.setItem('systemValidations', JSON.stringify(updatedValidations));
      
      toast({
        title: "Validación actualizada",
        description: "La validación ha sido actualizada exitosamente",
      });
    } else {
      // Crear nueva validación
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
          type: formData.material_type,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        files: []
      };

      const updatedValidations = [newValidation, ...validations];
      setValidations(updatedValidations);
      localStorage.setItem('systemValidations', JSON.stringify(updatedValidations));
      
      toast({
        title: "Validación creada",
        description: "La validación ha sido creada exitosamente",
      });
    }
    
    setShowForm(false);
    setEditingValidation(null);
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

    const updatedValidations = validations.map(v => 
      v.id === validationId 
        ? { ...v, files: [...(v.files || []), mockFile] }
        : v
    );
    setValidations(updatedValidations);
    localStorage.setItem('systemValidations', JSON.stringify(updatedValidations));
    
    toast({
      title: "Archivo subido",
      description: "El archivo ha sido subido exitosamente",
    });
  };

  const handleFileDelete = (fileId: string) => {
    const updatedValidations = validations.map(v => ({
      ...v,
      files: v.files?.filter(f => f.id !== fileId) || []
    }));
    setValidations(updatedValidations);
    localStorage.setItem('systemValidations', JSON.stringify(updatedValidations));
    
    toast({
      title: "Archivo eliminado",
      description: "El archivo ha sido eliminado exitosamente",
    });
  };

  const stats = {
    validated: validations.filter(v => v.status === 'validado').length,
    expiring: validations.filter(v => v.status === 'proximo_vencer').length,
    expired: validations.filter(v => v.status === 'vencido').length,
    inValidation: validations.filter(v => v.status === 'en_validacion').length,
  };

  // Control de acceso por roles
  const canAdd = userRole === 'super_administrador' || userRole === 'administrador' || userRole === 'coordinador' || userRole === 'analista';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('validations_title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('validations_subtitle')}
          </p>
        </div>
        {canAdd && (
          <Button onClick={handleAdd} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            {t('validations_new')}
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats_validated')}
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.validated}</div>
            <p className="text-xs text-muted-foreground">
              {t('validations_completed')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats_expiring')}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expiring}</div>
            <p className="text-xs text-muted-foreground">
              {t('validations_next30days')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats_expired')}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expired}</div>
            <p className="text-xs text-muted-foreground">
              {t('validations_immediate')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('validations_protocols')}
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validations.filter(v => v.files && v.files.length > 0).length}</div>
            <p className="text-xs text-muted-foreground">
              {t('validations_withDocumentation')}
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
        userRole={userRole}
      />

      {/* Validation Form Modal */}
      {canAdd && (
        <ValidationForm
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          editingValidation={editingValidation}
        />
      )}
    </div>
  );
};

export default ValidationsModule;
