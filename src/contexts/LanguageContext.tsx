import React, { createContext, useContext, useState, ReactNode } from 'react';

// Translation data
const translations = {
  es: {
    // Navigation
    dashboard: 'Dashboard',
    validations: 'Validaciones',
    products: 'Productos',
    equipments: 'Equipos',
    users: 'Usuarios',
    settings: 'Configuraciones',
    security: 'Seguridad',
    
    // Common
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    add: 'Agregar',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    actions: 'Acciones',
    status: 'Estado',
    date: 'Fecha',
    name: 'Nombre',
    type: 'Tipo',
    description: 'Descripción',
    observations: 'Observaciones',
    
    // Validations
    validationCode: 'Código de Validación',
    materialName: 'Nombre del Material',
    productCode: 'Código de Producto/MP',
    validationType: 'Tipo de Validación',
    subcategory: 'Subcategoría',
    equipment: 'Equipo',
    validityDate: 'Fecha de Vigencia',
    expirationDate: 'Fecha de Vencimiento',
    materialType: 'Tipo de Material',
    
    // Material Types
    rawMaterial: 'Materia Prima',
    product: 'Producto',
    packaging: 'Empaque/Envase',
    
    // Status
    validated: 'Validado',
    inValidation: 'En Validación',
    expired: 'Vencido',
    
    // Print options
    print: 'Imprimir',
    preview: 'Vista Previa',
    downloadPdf: 'Descargar PDF',
    
    // Sort options
    sort: 'Ordenar',
    alphabetically: 'Alfabéticamente',
    byValidityDate: 'Por Fecha Vigencia',
    aToZ: 'A-Z',
    zToA: 'Z-A',
    oldestToNewest: 'De lo más antiguo a lo más reciente',
    newestToOldest: 'De lo más reciente a lo más antiguo',
    
    // Analytics
    analytics: 'Analíticas',
    validatedProducts: 'Productos Validados',
    totalValidations: 'Total de Validaciones',
    protocols: 'Protocolos',
    reports: 'Reportes',
    
    // Excel import
    importExcel: 'Importar Excel',
    selectFile: 'Seleccionar archivo',
    
    // Numbers
    number: 'Número'
  },
  
  en: {
    // Navigation
    dashboard: 'Dashboard',
    validations: 'Validations',
    products: 'Products',
    equipments: 'Equipment',
    users: 'Users',
    settings: 'Settings',
    security: 'Security',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    actions: 'Actions',
    status: 'Status',
    date: 'Date',
    name: 'Name',
    type: 'Type',
    description: 'Description',
    observations: 'Observations',
    
    // Validations
    validationCode: 'Validation Code',
    materialName: 'Material Name',
    productCode: 'Product Code/MP',
    validationType: 'Validation Type',
    subcategory: 'Subcategory',
    equipment: 'Equipment',
    validityDate: 'Validity Date',
    expirationDate: 'Expiration Date',
    materialType: 'Material Type',
    
    // Material Types
    rawMaterial: 'Raw Material',
    product: 'Product',
    packaging: 'Packaging/Container',
    
    // Status
    validated: 'Validated',
    inValidation: 'In Validation',
    expired: 'Expired',
    
    // Print options
    print: 'Print',
    preview: 'Preview',
    downloadPdf: 'Download PDF',
    
    // Sort options
    sort: 'Sort',
    alphabetically: 'Alphabetically',
    byValidityDate: 'By Validity Date',
    aToZ: 'A-Z',
    zToA: 'Z-A',
    oldestToNewest: 'Oldest to Newest',
    newestToOldest: 'Newest to Oldest',
    
    // Analytics
    analytics: 'Analytics',
    validatedProducts: 'Validated Products',
    totalValidations: 'Total Validations',
    protocols: 'Protocols',
    reports: 'Reports',
    
    // Excel import
    importExcel: 'Import Excel',
    selectFile: 'Select file',
    
    // Numbers
    number: 'Number'
  },
  
  pt: {
    // Navigation
    dashboard: 'Painel',
    validations: 'Validações',
    products: 'Produtos',
    equipments: 'Equipamentos',
    users: 'Usuários',
    settings: 'Configurações',
    security: 'Segurança',
    
    // Common
    search: 'Pesquisar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    add: 'Adicionar',
    edit: 'Editar',
    delete: 'Excluir',
    save: 'Salvar',
    cancel: 'Cancelar',
    actions: 'Ações',
    status: 'Status',
    date: 'Data',
    name: 'Nome',
    type: 'Tipo',
    description: 'Descrição',
    observations: 'Observações',
    
    // Validations
    validationCode: 'Código de Validação',
    materialName: 'Nome do Material',
    productCode: 'Código do Produto/MP',
    validationType: 'Tipo de Validação',
    subcategory: 'Subcategoria',
    equipment: 'Equipamento',
    validityDate: 'Data de Validade',
    expirationDate: 'Data de Vencimento',
    materialType: 'Tipo de Material',
    
    // Material Types
    rawMaterial: 'Matéria Prima',
    product: 'Produto',
    packaging: 'Embalagem/Recipiente',
    
    // Status
    validated: 'Validado',
    inValidation: 'Em Validação',
    expired: 'Vencido',
    
    // Print options
    print: 'Imprimir',
    preview: 'Visualizar',
    downloadPdf: 'Baixar PDF',
    
    // Sort options
    sort: 'Ordenar',
    alphabetically: 'Alfabeticamente',
    byValidityDate: 'Por Data de Validade',
    aToZ: 'A-Z',
    zToA: 'Z-A',
    oldestToNewest: 'Do mais antigo ao mais recente',
    newestToOldest: 'Do mais recente ao mais antigo',
    
    // Analytics
    analytics: 'Análises',
    validatedProducts: 'Produtos Validados',
    totalValidations: 'Total de Validações',
    protocols: 'Protocolos',
    reports: 'Relatórios',
    
    // Excel import
    importExcel: 'Importar Excel',
    selectFile: 'Selecionar arquivo',
    
    // Numbers
    number: 'Número'
  }
};

type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};