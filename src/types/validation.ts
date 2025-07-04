
export type Language = 'es' | 'en' | 'pt';

export type UserRole = 'super_administrador' | 'administrador' | 'coordinador' | 'analista' | 'visualizador';

export type ValidationStatus = 
  | 'borrador'
  | 'primera_revision'
  | 'segunda_revision'
  | 'en_validacion'
  | 'validado'
  | 'proximo_vencer'
  | 'vencido'
  | 'por_revalidar';

export type ValidationType = 
  | 'metodos_analiticos'
  | 'procesos'
  | 'limpieza'
  | 'sistemas_computarizados';

export type ProductType = 
  | 'producto_terminado'
  | 'materia_prima'
  | 'material_empaque'
  | 'granel';

export type EquipmentType = 
  | 'HPLC'
  | 'GC'
  | 'UV-VIS'
  | 'NIR'
  | 'RAMAN'
  | 'IR'
  | 'AA'
  | 'Karl Fischer';

export type ProcessSubcategory = 'fabricacion' | 'empaque';
export type AnalyticalSubcategory = 'valoracion' | 'disolucion' | 'impurezas' | 'uniformidad_unidades_dosificacion' | 'identificacion' | 'trazas';
export type CleaningSubcategory = 'no_aplica';
export type ComputerizedSubcategory = 'validacion_inicial' | 'revalidacion_periodica';

export interface ValidationFilters {
  validationType?: ValidationType;
  subcategory?: string;
  validationCode?: string;
  productCode?: string;
  equipmentType?: EquipmentType;
  status?: ValidationStatus;
  expiryDateFrom?: string;
  expiryDateTo?: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  type: ProductType;
  created_at: string;
  updated_at: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  model: string;
  serial: string;
  location: string;
  created_at: string;
}

export interface ValidationFile {
  id: string;
  validation_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  file_type: string;
  uploaded_at: string;
  uploaded_by: string;
}

export interface Validation {
  id: string;
  product_id: string;
  validation_code: string;
  equipment_type: EquipmentType;
  validation_type: ValidationType;
  subcategory: string;
  issue_date: string;
  expiry_date: string;
  status: ValidationStatus;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  product?: Product;
  files?: ValidationFile[];
}

export const checkExpiringValidations = (validations: Validation[]) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
  
  return validations.filter(validation => {
    const expiryDate = new Date(validation.expiry_date);
    return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
  });
};

export const calculateExpiryDate = (issueDate: string, validationType: ValidationType): string => {
  const issue = new Date(issueDate);
  let years = 2; // default
  
  switch (validationType) {
    case 'metodos_analiticos':
      years = 3;
      break;
    case 'procesos':
      years = 2;
      break;
    case 'limpieza':
      years = 1;
      break;
    case 'sistemas_computarizados':
      years = 3;
      break;
  }
  
  const expiry = new Date(issue);
  expiry.setFullYear(expiry.getFullYear() + years);
  return expiry.toISOString().split('T')[0];
};
