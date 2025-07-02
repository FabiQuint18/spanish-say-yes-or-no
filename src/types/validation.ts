
export type ProductType = 'producto_terminado' | 'materia_prima' | 'material_empaque' | 'granel';

export type EquipmentType = 'HPLC' | 'GC' | 'UV-VIS' | 'NIR' | 'RAMAN' | 'IR' | 'AA' | 'Karl Fischer';

export type ValidationStatus = 'validado' | 'proximo_vencer' | 'vencido' | 'en_revalidacion' | 'en_validacion' | 'por_revalidar' | 'primera_revision' | 'segunda_revision';

export type ValidationType = 'procesos' | 'limpieza' | 'metodos_analiticos' | 'sistemas_computarizados';

// Nuevas subcategorías específicas con empaque en lugar de envasado
export type ProcessSubcategory = 'fabricacion' | 'empaque';
export type AnalyticalSubcategory = 'valoracion' | 'disolucion' | 'impurezas' | 'uniformidad_unidades_dosificacion' | 'identificacion' | 'trazas';
export type CleaningSubcategory = 'no_aplica';
export type ComputerizedSubcategory = 'validacion_inicial' | 'revalidacion_periodica';

export type UserRole = 'administrador' | 'coordinador' | 'analista' | 'visualizador';

export type Language = 'es' | 'en' | 'pt';

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

export interface Product {
  id: string;
  code: string;
  name: string;
  type: ProductType;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Validation {
  id: string;
  product_id: string;
  validation_code: string;
  equipment_type: EquipmentType;
  validation_type: ValidationType;
  subcategory?: ProcessSubcategory | AnalyticalSubcategory | CleaningSubcategory | ComputerizedSubcategory;
  issue_date: string;
  expiry_date: string;
  status: ValidationStatus;
  report_file_url?: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  product?: Product;
  files?: ValidationFile[];
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface ValidationFilters {
  productType?: ProductType;
  productCode?: string;
  validationCode?: string;
  equipmentType?: EquipmentType;
  validationType?: ValidationType;
  subcategory?: ProcessSubcategory | AnalyticalSubcategory | CleaningSubcategory | ComputerizedSubcategory;
  status?: ValidationStatus;
  expiryDateFrom?: string;
  expiryDateTo?: string;
}

// Función para calcular el vencimiento de métodos analíticos (2 años)
export const calculateExpiryDate = (issueDate: string, validationType: ValidationType): string => {
  const issue = new Date(issueDate);
  if (validationType === 'metodos_analiticos') {
    issue.setFullYear(issue.getFullYear() + 2);
  } else {
    issue.setFullYear(issue.getFullYear() + 5);
  }
  return issue.toISOString().split('T')[0];
};

// Nueva función para verificar vencimientos próximos
export const checkExpiringValidations = (validations: Validation[]): {
  sixMonths: Validation[];
  threeMonths: Validation[];
  oneMonth: Validation[];
} => {
  const now = new Date();
  const sixMonthsFromNow = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
  const threeMonthsFromNow = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
  const oneMonthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

  return {
    sixMonths: validations.filter(v => {
      const expiry = new Date(v.expiry_date);
      return expiry <= sixMonthsFromNow && expiry > threeMonthsFromNow;
    }),
    threeMonths: validations.filter(v => {
      const expiry = new Date(v.expiry_date);
      return expiry <= threeMonthsFromNow && expiry > oneMonthFromNow;
    }),
    oneMonth: validations.filter(v => {
      const expiry = new Date(v.expiry_date);
      return expiry <= oneMonthFromNow && expiry > now;
    })
  };
};
