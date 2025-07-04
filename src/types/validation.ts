
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
