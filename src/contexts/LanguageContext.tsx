import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types/validation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Menu items
    menu: {
      dashboard: 'Dashboard',
      products: 'Productos',
      validations: 'Validaciones',
      equipments: 'Equipos',
      users: 'Usuarios',
      security: 'Seguridad',
      settings: 'Configuración',
    },

    // Common
    common: {
      cancel: 'Cancelar',
      save: 'Guardar',
      edit: 'Editar',
      delete: 'Eliminar',
      add: 'Agregar',
      search: 'Buscar',
      filter: 'Filtrar',
      export: 'Exportar',
      import: 'Importar',
      close: 'Cerrar',
      confirm: 'Confirmar',
      loading: 'Cargando...',
      all: 'Todos',
      error: 'Error',
    },
    
    // System
    system: {
      title: 'Sistema de Gestión de Validaciones',
      subtitle: 'Gestión integral de validaciones farmacéuticas',
    },
    
    // Login
    login: {
      title: 'Iniciar Sesión',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      button: 'Iniciar Sesión',
      loading: 'Iniciando sesión...',
      success: 'Inicio de sesión exitoso',
      welcome: 'Bienvenido al sistema',
      error: 'Error de autenticación',
      logout: 'Cerrar Sesión',
      logoutSuccess: 'Sesión cerrada exitosamente',
    },
    
    // Dashboard
    dashboard: {
      title: 'Panel de Control',
      subtitle: 'Resumen general del sistema',
      access_restricted: 'Acceso Restringido',
      contact_administrator: 'Contacte al administrador para obtener permisos',
    },
    
    // Stats
    stats: {
      validations: 'Validaciones',
      products: 'Productos',
      expiring: 'Por Vencer',
      expired: 'Vencidas',
      efficiency: 'Eficiencia',
      total_validations: 'Validaciones totales',
      registered_products: 'Productos registrados',
      next_30_days: 'Próximos 30 días',
      validation_efficiency: 'Eficiencia de validación',
      validated: 'Validadas',
      in_validation: 'En Validación',
    },
    
    // Analytics
    analytics: {
      title: 'Analíticas',
      subtitle: 'Análisis detallado del sistema',
    },
    
    // Validations
    validations: {
      title: 'Validaciones',
      subtitle: 'Gestión de validaciones de métodos y procesos',
      new: 'Nueva Validación',
      list: 'Lista de Validaciones',
      manage: 'Gestionar validaciones del sistema',
      code: 'Código de Validación',
      validation_code: 'Código de Validación',
      product: 'Producto',
      product_raw_material: 'Producto/Materia Prima',
      product_raw_material_code: 'Código Producto/MP',
      product_code: 'Código de Producto',
      type: 'Tipo',
      validation_type: 'Tipo de Validación',
      subcategory: 'Subcategoría',
      equipment: 'Equipo',
      equipment_type: 'Tipo de Equipo',
      status: 'Estado',
      issue_date: 'Fecha Emisión',
      expiry_date: 'Fecha Vencimiento',
      validity_date: 'Fecha de Vigencia',
      expiry_from: 'Fecha de Vigencia',
      expiry_to: 'Fecha de Vencimiento',
      search: 'Buscar validaciones...',
      search_by_code: 'Buscar por código',
      search_by_product: 'Buscar por producto',
      search_filters: 'Filtros de Búsqueda',
      clear_filters: 'Limpiar Filtros',
      select_type: 'Seleccionar tipo',
      select_subcategory: 'Seleccionar subcategoría',
      select_equipment: 'Seleccionar equipo',
      select_status: 'Seleccionar estado',
      filter_by_type: 'Filtrar por tipo',
      filter_by_status: 'Filtrar por estado',
      completed: 'Validaciones completadas',
      next30days: 'Próximas a vencer (30 días)',
      immediate: 'Acción inmediata requerida',
      protocols: 'Protocolos',
      withDocumentation: 'Con documentación',
      print: {
        options: 'Opciones de Impresión',
        all: 'Imprimir Todas',
        downloadAll: 'Descargar PDF - Todas',
        byType: 'Imprimir',
        downloadByType: 'Descargar PDF',
      },
      files: 'Archivos',
      actions: 'Acciones',
      no_results: 'No se encontraron resultados',
      no_validations: 'No hay validaciones registradas',
      
      // Validation types
      processes: 'Procesos',
      cleaning: 'Limpieza',
      analytical_methods: 'Métodos Analíticos',
      computerized_systems: 'Sistemas Computarizados',
      
      // Subcategories
      manufacturing: 'Fabricación',
      packaging: 'Empaque',
      assay: 'Valoración',
      dissolution: 'Disolución',
      impurities: 'Impurezas',
      uniformity: 'Uniformidad de Unidades de Dosificación',
      identification: 'Identificación',
      traces: 'Trazas',
      not_applicable: 'No Aplica',
      initial_validation: 'Validación Inicial',
      periodic_revalidation: 'Revalidación Periódica',
    },
    
    // Equipment
    equipments: {
      title: 'Equipos',
      subtitle: 'Gestión de equipos analíticos',
      add: 'Agregar Equipo',
      list: 'Lista de Equipos',
    },
    
    // Products
    products: {
      title: 'Productos',
      subtitle: 'Gestión de productos y materias primas',
      add: 'Agregar Producto',
      list: 'Lista de Productos',
      created: 'Producto Creado',
      product: 'Producto',
      added_successfully: 'agregado exitosamente',
      add_product: 'Agregar Producto',
      finished_products: 'Productos Terminados',
      raw_materials: 'Materias Primas',
      packaging_materials: 'Materiales de Empaque',
      product_list: 'Lista de Productos',
      registered_products: 'Productos registrados en el sistema',
      finished_product: 'Producto Terminado',
      raw_material: 'Materia Prima',
      packaging_material: 'Material de Empaque',
      add_new_product: 'Agregar Nuevo Producto',
      product_code: 'Código del Producto',
      product_name: 'Nombre del Producto',
      product_type: 'Tipo de Producto',
      select_type: 'Seleccionar tipo',
      description: 'Descripción',
      product_description: 'Descripción del producto',
    },
    
    // Material Types
    material_types: {
      finished_product: 'Producto Terminado',
      raw_material: 'Materia Prima',
      packaging_material: 'Material de Empaque',
      bulk: 'Granel',
    },
    
    // Users
    users: {
      title: 'Usuarios',
      subtitle: 'Gestión de usuarios del sistema',
      new: 'Nuevo Usuario',
      list: 'Lista de Usuarios',
      manage: 'Gestionar usuarios del sistema',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      role: 'Rol',
      password: 'Contraseña',
      confirm_password: 'Confirmar Contraseña',
      password_requirements: 'Mínimo 7 caracteres, 1 mayúscula, 1 símbolo especial (*,+,-,_,@,#,$,%,^,&,!,?), números y letras',
      password_weak: 'La contraseña no cumple con los requisitos de seguridad',
      password_mismatch: 'Las contraseñas no coinciden',
      created_successfully: 'Usuario creado exitosamente',
    },
    
    // Security
    security: {
      title: 'Seguridad',
      subtitle: 'Configuración de seguridad del sistema',
    },
    
    // Settings
    settings: {
      title: 'Configuración',
      subtitle: 'Configuración general del sistema',
    },
    
    // Roles
    roles: {
      super_administrador: 'Super Administrador',
      administrador: 'Administrador',
      coordinador: 'Coordinador',
      analista: 'Analista',
      visualizador: 'Visualizador',
    },
    
    // Status
    status: {
      validado: 'Validado',
      en_validacion: 'En Validación',
      por_revalidar: 'Por Revalidar',
      vencido: 'Vencido',
      proximo: 'Próximo a Vencer',
      revalidacion: 'En Revalidación',
      primera_revision: 'Primera Revisión',
      segunda_revision: 'Segunda Revisión',
      success: 'Exitoso',
      failed: 'Fallido',
      warning: 'Advertencia',
    },
    
    // Integrations
    integrations: {
      title: 'Integraciones',
      subtitle: 'Configuración de servicios externos',
      email: 'Correo Electrónico',
      teams: 'Microsoft Teams',
      google: 'Google Workspace',
      configure: 'Configurar Integraciones',
      test_connection: 'Probar Conexión',
      activity_log: 'Registro de Actividades',
      email_settings: 'Configuración de Email',
      teams_settings: 'Configuración de Teams',
      google_settings: 'Configuración de Google',
    },
  },
  en: {
    // Menu items
    menu: {
      dashboard: 'Dashboard',
      products: 'Products',
      validations: 'Validations',
      equipments: 'Equipment',
      users: 'Users',
      security: 'Security',
      settings: 'Settings',
    },

    // Common
    common: {
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      close: 'Close',
      confirm: 'Confirm',
      loading: 'Loading...',
      all: 'All',
      error: 'Error',
    },
    
    // System
    system: {
      title: 'Validation Management System',
      subtitle: 'Comprehensive pharmaceutical validation management',
    },
    
    // Login
    login: {
      title: 'Sign In',
      email: 'Email',
      password: 'Password',
      button: 'Sign In',
      loading: 'Signing in...',
      success: 'Login successful',
      welcome: 'Welcome to the system',
      error: 'Authentication error',
      logout: 'Logout',
      logoutSuccess: 'Logged out successfully',
    },
    
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      subtitle: 'System overview',
      access_restricted: 'Access Restricted',
      contact_administrator: 'Contact administrator for permissions',
    },
    
    // Stats
    stats: {
      validations: 'Validations',
      products: 'Products',
      expiring: 'Expiring',
      expired: 'Expired',
      efficiency: 'Efficiency',
      total_validations: 'Total validations',
      registered_products: 'Registered products',
      next_30_days: 'Next 30 days',
      validation_efficiency: 'Validation efficiency',
      validated: 'Validated',
      in_validation: 'In Validation',
    },
    
    // Analytics
    analytics: {
      title: 'Analytics',
      subtitle: 'Detailed system analysis',
    },
    
    // Validations
    validations: {
      title: 'Validations',
      subtitle: 'Method and process validation management',
      new: 'New Validation',
      list: 'Validation List',
      manage: 'Manage system validations',
      code: 'Validation Code',
      validation_code: 'Validation Code',
      product: 'Product',
      product_raw_material: 'Product/Raw Material',
      product_raw_material_code: 'Product/RM Code',
      product_code: 'Product Code',
      type: 'Type',
      validation_type: 'Validation Type',
      subcategory: 'Subcategory',
      equipment: 'Equipment',
      equipment_type: 'Equipment Type',
      status: 'Status',
      issue_date: 'Issue Date',
      expiry_date: 'Expiry Date',
      expiry_from: 'Expiry From',
      expiry_to: 'Expiry To',
      search: 'Search validations...',
      search_by_code: 'Search by code',
      search_by_product: 'Search by product',
      search_filters: 'Search Filters',
      clear_filters: 'Clear Filters',
      select_type: 'Select type',
      select_subcategory: 'Select subcategory',
      select_equipment: 'Select equipment',
      select_status: 'Select status',
      filter_by_type: 'Filter by type',
      filter_by_status: 'Filter by status',
      completed: 'Completed validations',
      next30days: 'Expiring soon (30 days)',
      immediate: 'Immediate action required',
      protocols: 'Protocols',
      withDocumentation: 'With documentation',
      print: {
        options: 'Print Options',
        all: 'Print All',
        downloadAll: 'Download PDF - All',
        byType: 'Print',
        downloadByType: 'Download PDF',
      },
      files: 'Files',
      actions: 'Actions',
      no_results: 'No results found',
      no_validations: 'No validations registered',
      
      // Validation types
      processes: 'Processes',
      cleaning: 'Cleaning',
      analytical_methods: 'Analytical Methods',
      computerized_systems: 'Computerized Systems',
      
      // Subcategories
      manufacturing: 'Manufacturing',
      packaging: 'Packaging',
      assay: 'Assay',
      dissolution: 'Dissolution',
      impurities: 'Impurities',
      uniformity: 'Uniformity of Dosage Units',
      identification: 'Identification',
      traces: 'Traces',
      not_applicable: 'Not Applicable',
      initial_validation: 'Initial Validation',
      periodic_revalidation: 'Periodic Revalidation',
    },
    
    // Equipment
    equipments: {
      title: 'Equipment',
      subtitle: 'Analytical equipment management',
      add: 'Add Equipment',
      list: 'Equipment List',
    },
    
    // Products
    products: {
      title: 'Products',
      subtitle: 'Product and raw material management',
      add: 'Add Product',
      list: 'Product List',
      created: 'Product Created',
      product: 'Product',
      added_successfully: 'added successfully',
      add_product: 'Add Product',
      finished_products: 'Finished Products',
      raw_materials: 'Raw Materials',
      packaging_materials: 'Packaging Materials',
      product_list: 'Product List',
      registered_products: 'Registered products in the system',
      finished_product: 'Finished Product',
      raw_material: 'Raw Material',
      packaging_material: 'Packaging Material',
      add_new_product: 'Add New Product',
      product_code: 'Product Code',
      product_name: 'Product Name',
      product_type: 'Product Type',
      select_type: 'Select type',
      description: 'Description',
      product_description: 'Product description',
    },
    
    // Material Types
    material_types: {
      finished_product: 'Finished Product',
      raw_material: 'Raw Material',
      packaging_material: 'Packaging Material',
      bulk: 'Bulk',
    },
    
    // Users
    users: {
      title: 'Users',
      subtitle: 'System user management',
      new: 'New User',
      list: 'User List',
      manage: 'Manage system users',
      name: 'Full Name',
      email: 'Email',
      role: 'Role',
      password: 'Password',
      confirm_password: 'Confirm Password',
      password_requirements: 'Minimum 7 characters, 1 uppercase, 1 special symbol (*,+,-,_,@,#,$,%,^,&,!,?), numbers and letters',
      password_weak: 'Password does not meet security requirements',
      password_mismatch: 'Passwords do not match',
      created_successfully: 'User created successfully',
    },
    
    // Security
    security: {
      title: 'Security',
      subtitle: 'System security configuration',
    },
    
    // Settings
    settings: {
      title: 'Settings',
      subtitle: 'General system configuration',
    },
    
    // Roles
    roles: {
      super_administrador: 'Super Administrator',
      administrador: 'Administrator',
      coordinador: 'Coordinator',
      analista: 'Analyst',
      visualizador: 'Viewer',
    },
    
    // Status
    status: {
      validado: 'Validated',
      en_validacion: 'In Validation',
      por_revalidar: 'For Revalidation',
      vencido: 'Expired',
      proximo: 'Expiring Soon',
      revalidacion: 'In Revalidation',
      primera_revision: 'First Review',
      segunda_revision: 'Second Review',
      success: 'Success',
      failed: 'Failed',
      warning: 'Warning',
    },
    
    // Integrations
    integrations: {
      title: 'Integrations',
      subtitle: 'External services configuration',
      email: 'Email',
      teams: 'Microsoft Teams',
      google: 'Google Workspace',
      configure: 'Configure Integrations',
      test_connection: 'Test Connection',
      activity_log: 'Activity Log',
      email_settings: 'Email Settings',
      teams_settings: 'Teams Settings',
      google_settings: 'Google Settings',
    },
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};