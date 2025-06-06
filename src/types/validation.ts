
export type ProductType = 'producto_terminado' | 'materia_prima' | 'material_envase';

export type EquipmentType = 'HPLC' | 'GC' | 'UV-VIS' | 'NIR' | 'RAMAN' | 'IR' | 'AA' | 'Karl Fischer';

export type ValidationStatus = 'validado' | 'proximo_vencer' | 'vencido' | 'en_revalidacion';

export type ValidationType = 'procesos' | 'limpieza' | 'metodos_analiticos';

export type UserRole = 'administrador' | 'analista' | 'visualizador';

export type Language = 'es' | 'en' | 'pt';

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
  issue_date: string;
  expiry_date: string;
  status: ValidationStatus;
  report_file_url?: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  product?: Product;
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
  status?: ValidationStatus;
  expiryDateFrom?: string;
  expiryDateTo?: string;
}
