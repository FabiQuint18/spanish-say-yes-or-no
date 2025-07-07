
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
    menu_dashboard: 'Dashboard',
    menu_products: 'Productos',
    menu_validations: 'Validaciones',
    menu_equipments: 'Equipos',
    menu_users: 'Usuarios',
    menu_security: 'Seguridad',
    menu_settings: 'Configuración',

    // Common
    common_cancel: 'Cancelar',
    common_save: 'Guardar',
    common_edit: 'Editar',
    common_delete: 'Eliminar',
    common_add: 'Agregar',
    common_search: 'Buscar',
    common_filter: 'Filtrar',
    common_export: 'Exportar',
    common_import: 'Importar',
    common_close: 'Cerrar',
    common_confirm: 'Confirmar',
    common_loading: 'Cargando...',
    common_all: 'Todos',
    
    // System
    system_title: 'Sistema de Gestión de Validaciones',
    system_subtitle: 'Gestión integral de validaciones farmacéuticas',
    
    // Login
    login_title: 'Iniciar Sesión',
    login_email: 'Correo Electrónico',
    login_password: 'Contraseña',
    login_button: 'Iniciar Sesión',
    login_loading: 'Iniciando sesión...',
    login_success: 'Inicio de sesión exitoso',
    login_welcome: 'Bienvenido al sistema',
    login_error: 'Error de autenticación',
    login_logout: 'Cerrar Sesión',
    login_logoutSuccess: 'Sesión cerrada exitosamente',
    
    // Dashboard
    dashboard_title: 'Panel de Control',
    dashboard_subtitle: 'Resumen general del sistema',
    dashboard_access_restricted: 'Acceso Restringido',
    dashboard_contact_administrator: 'Contacte al administrador para obtener permisos',
    
    // Stats
    stats_validations: 'Validaciones',
    stats_products: 'Productos',
    stats_expiring: 'Por Vencer',
    stats_expired: 'Vencidas',
    stats_efficiency: 'Eficiencia',
    stats_total_validations: 'Validaciones totales',
    stats_registered_products: 'Productos registrados',
    stats_next_30_days: 'Próximos 30 días',
    stats_validation_efficiency: 'Eficiencia de validación',
    stats_validated: 'Validadas',
    stats_in_validation: 'En Validación',
    
    // Analytics
    analytics_title: 'Analíticas',
    analytics_subtitle: 'Análisis detallado del sistema',
    
    // Validations
    validations_title: 'Validaciones',
    validations_subtitle: 'Gestión de validaciones de métodos y procesos',
    validations_new: 'Nueva Validación',
    validations_list: 'Lista de Validaciones',
    validations_manage: 'Gestionar validaciones del sistema',
    validations_code: 'Código de Validación',
    validations_validation_code: 'Código de Validación',
    validations_product: 'Producto',
    validations_product_raw_material: 'Producto/Materia Prima',
    validations_product_raw_material_code: 'Código Producto/MP',
    validations_product_code: 'Código de Producto',
    validations_type: 'Tipo',
    validations_validation_type: 'Tipo de Validación',
    validations_subcategory: 'Subcategoría',
    validations_equipment: 'Equipo',
    validations_equipment_type: 'Tipo de Equipo',
    validations_status: 'Estado',
    validations_issue_date: 'Fecha Emisión',
    validations_expiry_date: 'Fecha Vencimiento',
    validations_expiry_from: 'Vencimiento Desde',
    validations_expiry_to: 'Vencimiento Hasta',
    validations_search: 'Buscar validaciones...',
    validations_search_by_code: 'Buscar por código',
    validations_search_by_product: 'Buscar por producto',
    validations_search_filters: 'Filtros de Búsqueda',
    validations_clear_filters: 'Limpiar Filtros',
    validations_select_type: 'Seleccionar tipo',
    validations_select_subcategory: 'Seleccionar subcategoría',
    validations_select_equipment: 'Seleccionar equipo',
    validations_select_status: 'Seleccionar estado',
    validations_filter_by_type: 'Filtrar por tipo',
    validations_filter_by_status: 'Filtrar por estado',
    validations_completed: 'Validaciones completadas',
    validations_next30days: 'Próximas a vencer (30 días)',
    validations_immediate: 'Acción inmediata requerida',
    validations_protocols: 'Protocolos',
    validations_withDocumentation: 'Con documentación',
    validations_files: 'Archivos',
    validations_actions: 'Acciones',
    validations_no_results: 'No se encontraron resultados',
    validations_no_validations: 'No hay validaciones registradas',
    
    // Validation Types
    validations_processes: 'Procesos',
    validations_cleaning: 'Limpieza',
    validations_analytical_methods: 'Métodos Analíticos',
    validations_computerized_systems: 'Sistemas Computarizados',
    
    // Subcategories
    validations_manufacturing: 'Fabricación',
    validations_packaging: 'Empaque',
    validations_assay: 'Valoración',
    validations_dissolution: 'Disolución',
    validations_impurities: 'Impurezas',
    validations_uniformity: 'Uniformidad de Unidades de Dosificación',
    validations_identification: 'Identificación',
    validations_traces: 'Trazas',
    validations_not_applicable: 'No Aplica',
    validations_initial_validation: 'Validación Inicial',
    validations_periodic_revalidation: 'Revalidación Periódica',
    
    // Equipment
    equipments_title: 'Equipos',
    equipments_subtitle: 'Gestión de equipos analíticos',
    equipments_add: 'Agregar Equipo',
    equipments_list: 'Lista de Equipos',
    
    // Products
    products_title: 'Productos',
    products_subtitle: 'Gestión de productos y materias primas',
    products_add: 'Agregar Producto',
    products_list: 'Lista de Productos',
    
    // Material Types
    material_types_finished_product: 'Producto Terminado',
    material_types_raw_material: 'Materia Prima',
    material_types_packaging_material: 'Material de Empaque',
    material_types_bulk: 'Granel',
    
    // Users
    users_title: 'Usuarios',
    users_subtitle: 'Gestión de usuarios del sistema',
    users_new: 'Nuevo Usuario',
    users_list: 'Lista de Usuarios',
    users_manage: 'Gestionar usuarios del sistema',
    users_name: 'Nombre Completo',
    users_email: 'Correo Electrónico',
    users_role: 'Rol',
    users_password: 'Contraseña',
    users_confirm_password: 'Confirmar Contraseña',
    users_password_requirements: 'Mínimo 7 caracteres, 1 mayúscula, 1 símbolo especial (*,+,-,_,@,#,$,%,^,&,!,?), números y letras',
    users_password_weak: 'La contraseña no cumple con los requisitos de seguridad',
    users_password_mismatch: 'Las contraseñas no coinciden',
    users_created_successfully: 'Usuario creado exitosamente',
    
    // Security
    security_title: 'Seguridad',
    security_subtitle: 'Configuración de seguridad del sistema',
    
    // Settings
    settings_title: 'Configuración',
    settings_subtitle: 'Configuración general del sistema',
    
    // Roles
    roles_super_administrador: 'Super Administrador',
    roles_administrador: 'Administrador',
    roles_coordinador: 'Coordinador',
    roles_analista: 'Analista',
    roles_visualizador: 'Visualizador',
    
    // Status
    status_validado: 'Validado',
    status_en_validacion: 'En Validación',
    status_por_revalidar: 'Por Revalidar',
    status_vencido: 'Vencido',
    status_proximo: 'Próximo a Vencer',
    status_revalidacion: 'En Revalidación',
    status_primera_revision: 'Primera Revisión',
    status_segunda_revision: 'Segunda Revisión',
    status_success: 'Exitoso',
    status_failed: 'Fallido',
    status_warning: 'Advertencia',
    
    // Integrations
    integrations_title: 'Integraciones',
    integrations_subtitle: 'Configuración de servicios externos',
    integrations_email: 'Correo Electrónico',
    integrations_teams: 'Microsoft Teams',
    integrations_google: 'Google Workspace',
    integrations_configure: 'Configurar Integraciones',
    integrations_test_connection: 'Probar Conexión',
    integrations_activity_log: 'Registro de Actividades',
    integrations_email_settings: 'Configuración de Email',
    integrations_teams_settings: 'Configuración de Teams',
    integrations_google_settings: 'Configuración de Google',
    
    // Products
    products_created: 'Producto Creado',
    products_product: 'Producto',
    products_added_successfully: 'agregado exitosamente',
    products_add_product: 'Agregar Producto',
    products_finished_products: 'Productos Terminados',
    products_raw_materials: 'Materias Primas',
    products_packaging_materials: 'Materiales de Empaque',
    products_product_list: 'Lista de Productos',
    products_registered_products: 'Productos registrados en el sistema',
    products_finished_product: 'Producto Terminado',
    products_raw_material: 'Materia Prima',
    products_packaging_material: 'Material de Empaque',
    products_add_new_product: 'Agregar Nuevo Producto',
    products_product_code: 'Código del Producto',
    products_product_name: 'Nombre del Producto',
    products_product_type: 'Tipo de Producto',
    products_select_type: 'Seleccionar tipo',
    products_description: 'Descripción',
    products_product_description: 'Descripción del producto',
  },
  en: {
    // Menu items
    menu_dashboard: 'Dashboard',
    menu_products: 'Products',
    menu_validations: 'Validations',
    menu_equipments: 'Equipment',
    menu_users: 'Users',
    menu_security: 'Security',
    menu_settings: 'Settings',

    // Common
    common_cancel: 'Cancel',
    common_save: 'Save',
    common_edit: 'Edit',
    common_delete: 'Delete',
    common_add: 'Add',
    common_search: 'Search',
    common_filter: 'Filter',
    common_export: 'Export',
    common_import: 'Import',
    common_close: 'Close',
    common_confirm: 'Confirm',
    common_loading: 'Loading...',
    common_all: 'All',
    
    // System
    system_title: 'Validation Management System',
    system_subtitle: 'Comprehensive pharmaceutical validation management',
    
    // Login
    login_title: 'Sign In',
    login_email: 'Email',
    login_password: 'Password',
    login_button: 'Sign In',
    login_loading: 'Signing in...',
    login_success: 'Login successful',
    login_welcome: 'Welcome to the system',
    login_error: 'Authentication error',
    login_logout: 'Logout',
    login_logoutSuccess: 'Logged out successfully',
    
    // Dashboard
    dashboard_title: 'Dashboard',
    dashboard_subtitle: 'System overview',
    dashboard_access_restricted: 'Access Restricted',
    dashboard_contact_administrator: 'Contact administrator for permissions',
    
    // Stats
    stats_validations: 'Validations',
    stats_products: 'Products',
    stats_expiring: 'Expiring',
    stats_expired: 'Expired',
    stats_efficiency: 'Efficiency',
    stats_total_validations: 'Total validations',
    stats_registered_products: 'Registered products',
    stats_next_30_days: 'Next 30 days',
    stats_validation_efficiency: 'Validation efficiency',
    stats_validated: 'Validated',
    stats_in_validation: 'In Validation',
    
    // Analytics
    analytics_title: 'Analytics',
    analytics_subtitle: 'Detailed system analysis',
    
    // Validations
    validations_title: 'Validations',
    validations_subtitle: 'Method and process validation management',
    validations_new: 'New Validation',
    validations_list: 'Validation List',
    validations_manage: 'Manage system validations',
    validations_code: 'Validation Code',
    validations_validation_code: 'Validation Code',
    validations_product: 'Product',
    validations_product_raw_material: 'Product/Raw Material',
    validations_product_raw_material_code: 'Product/RM Code',
    validations_product_code: 'Product Code',
    validations_type: 'Type',
    validations_validation_type: 'Validation Type',
    validations_subcategory: 'Subcategory',
    validations_equipment: 'Equipment',
    validations_equipment_type: 'Equipment Type',
    validations_status: 'Status',
    validations_issue_date: 'Issue Date',
    validations_expiry_date: 'Expiry Date',
    validations_expiry_from: 'Expiry From',
    validations_expiry_to: 'Expiry To',
    validations_search: 'Search validations...',
    validations_search_by_code: 'Search by code',
    validations_search_by_product: 'Search by product',
    validations_search_filters: 'Search Filters',
    validations_clear_filters: 'Clear Filters',
    validations_select_type: 'Select type',
    validations_select_subcategory: 'Select subcategory',
    validations_select_equipment: 'Select equipment',
    validations_select_status: 'Select status',
    validations_filter_by_type: 'Filter by type',
    validations_filter_by_status: 'Filter by status',
    validations_completed: 'Completed validations',
    validations_next30days: 'Expiring soon (30 days)',
    validations_immediate: 'Immediate action required',
    validations_protocols: 'Protocols',
    validations_withDocumentation: 'With documentation',
    validations_files: 'Files',
    validations_actions: 'Actions',
    validations_no_results: 'No results found',
    validations_no_validations: 'No validations registered',
    
    // Validation Types
    validations_processes: 'Processes',
    validations_cleaning: 'Cleaning',
    validations_analytical_methods: 'Analytical Methods',
    validations_computerized_systems: 'Computerized Systems',
    
    // Subcategories
    validations_manufacturing: 'Manufacturing',
    validations_packaging: 'Packaging',
    validations_assay: 'Assay',
    validations_dissolution: 'Dissolution',
    validations_impurities: 'Impurities',
    validations_uniformity: 'Uniformity of Dosage Units',
    validations_identification: 'Identification',
    validations_traces: 'Traces',
    validations_not_applicable: 'Not Applicable',
    validations_initial_validation: 'Initial Validation',
    validations_periodic_revalidation: 'Periodic Revalidation',
    
    // Equipment
    equipments_title: 'Equipment',
    equipments_subtitle: 'Analytical equipment management',
    equipments_add: 'Add Equipment',
    equipments_list: 'Equipment List',
    
    // Products
    products_title: 'Products',
    products_subtitle: 'Product and raw material management',
    products_add: 'Add Product',
    products_list: 'Product List',
    
    // Material Types
    material_types_finished_product: 'Finished Product',
    material_types_raw_material: 'Raw Material',
    material_types_packaging_material: 'Packaging Material',
    material_types_bulk: 'Bulk',
    
    // Users
    users_title: 'Users',
    users_subtitle: 'System user management',
    users_new: 'New User',
    users_list: 'User List',
    users_manage: 'Manage system users',
    users_name: 'Full Name',
    users_email: 'Email',
    users_role: 'Role',
    users_password: 'Password',
    users_confirm_password: 'Confirm Password',
    users_password_requirements: 'Minimum 7 characters, 1 uppercase, 1 special symbol (*,+,-,_,@,#,$,%,^,&,!,?), numbers and letters',
    users_password_weak: 'Password does not meet security requirements',
    users_password_mismatch: 'Passwords do not match',
    users_created_successfully: 'User created successfully',
    
    // Security
    security_title: 'Security',
    security_subtitle: 'System security configuration',
    
    // Settings
    settings_title: 'Settings',
    settings_subtitle: 'General system configuration',
    
    // Roles
    roles_super_administrador: 'Super Administrator',
    roles_administrador: 'Administrator',
    roles_coordinador: 'Coordinator',
    roles_analista: 'Analyst',
    roles_visualizador: 'Viewer',
    
    // Status
    status_validado: 'Validated',
    status_en_validacion: 'In Validation',
    status_por_revalidar: 'For Revalidation',
    status_vencido: 'Expired',
    status_proximo: 'Expiring Soon',
    status_revalidacion: 'In Revalidation',
    status_primera_revision: 'First Review',
    status_segunda_revision: 'Second Review',
    status_success: 'Success',
    status_failed: 'Failed',
    status_warning: 'Warning',
    
    // Integrations
    integrations_title: 'Integrations',
    integrations_subtitle: 'External services configuration',
    integrations_email: 'Email',
    integrations_teams: 'Microsoft Teams',
    integrations_google: 'Google Workspace',
    integrations_configure: 'Configure Integrations',
    integrations_test_connection: 'Test Connection',
    integrations_activity_log: 'Activity Log',
    integrations_email_settings: 'Email Settings',
    integrations_teams_settings: 'Teams Settings',
    integrations_google_settings: 'Google Settings',
    
    // Products
    products_created: 'Product Created',
    products_product: 'Product',
    products_added_successfully: 'added successfully',
    products_add_product: 'Add Product',
    products_finished_products: 'Finished Products',
    products_raw_materials: 'Raw Materials',
    products_packaging_materials: 'Packaging Materials',
    products_product_list: 'Product List',
    products_registered_products: 'Registered products in the system',
    products_finished_product: 'Finished Product',
    products_raw_material: 'Raw Material',
    products_packaging_material: 'Packaging Material',
    products_add_new_product: 'Add New Product',
    products_product_code: 'Product Code',
    products_product_name: 'Product Name',
    products_product_type: 'Product Type',
    products_select_type: 'Select type',
    products_description: 'Description',
    products_product_description: 'Product description',
  },
  pt: {
    // Menu items
    menu_dashboard: 'Painel',
    menu_products: 'Produtos',
    menu_validations: 'Validações',
    menu_equipments: 'Equipamentos',
    menu_users: 'Usuários',
    menu_security: 'Segurança',
    menu_settings: 'Configurações',

    // Common
    common_cancel: 'Cancelar',
    common_save: 'Salvar',
    common_edit: 'Editar',
    common_delete: 'Excluir',
    common_add: 'Adicionar',
    common_search: 'Pesquisar',
    common_filter: 'Filtrar',
    common_export: 'Exportar',
    common_import: 'Importar',
    common_close: 'Fechar',
    common_confirm: 'Confirmar',
    common_loading: 'Carregando...',
    common_all: 'Todos',
    
    // System
    system_title: 'Sistema de Gestão de Validações',
    system_subtitle: 'Gestão integral de validações farmacêuticas',
    
    // Login
    login_title: 'Fazer Login',
    login_email: 'Email',
    login_password: 'Senha',
    login_button: 'Entrar',
    login_loading: 'Entrando...',
    login_success: 'Login realizado com sucesso',
    login_welcome: 'Bem-vindo ao sistema',
    login_error: 'Erro de autenticação',
    login_logout: 'Sair',
    login_logoutSuccess: 'Logout realizado com sucesso',
    
    // Dashboard
    dashboard_title: 'Painel de Controle',
    dashboard_subtitle: 'Visão geral do sistema',
    dashboard_access_restricted: 'Acesso Restrito',
    dashboard_contact_administrator: 'Contate o administrador para obter permissões',
    
    // Stats
    stats_validations: 'Validações',
    stats_products: 'Produtos',
    stats_expiring: 'Vencendo',
    stats_expired: 'Vencidas',
    stats_efficiency: 'Eficiência',
    stats_total_validations: 'Validações totais',
    stats_registered_products: 'Produtos registrados',
    stats_next_30_days: 'Próximos 30 dias',
    stats_validation_efficiency: 'Eficiência de validação',
    stats_validated: 'Validadas',
    stats_in_validation: 'Em Validação',
    
    // Analytics
    analytics_title: 'Analíticas',
    analytics_subtitle: 'Análise detalhada do sistema',
    
    // Validations
    validations_title: 'Validações',
    validations_subtitle: 'Gestão de validações de métodos e processos',
    validations_new: 'Nova Validação',
    validations_list: 'Lista de Validações',
    validations_manage: 'Gerenciar validações do sistema',
    validations_code: 'Código de Validação',
    validations_validation_code: 'Código de Validação',
    validations_product: 'Produto',
    validations_product_raw_material: 'Produto/Matéria-Prima',
    validations_product_raw_material_code: 'Código Produto/MP',
    validations_product_code: 'Código do Produto',
    validations_type: 'Tipo',
    validations_validation_type: 'Tipo de Validação',
    validations_subcategory: 'Subcategoria',
    validations_equipment: 'Equipamento',
    validations_equipment_type: 'Tipo de Equipamento',
    validations_status: 'Status',
    validations_issue_date: 'Data de Emissão',
    validations_expiry_date: 'Data de Vencimento',
    validations_expiry_from: 'Vencimento De',
    validations_expiry_to: 'Vencimento Até',
    validations_search: 'Pesquisar validações...',
    validations_search_by_code: 'Pesquisar por código',
    validations_search_by_product: 'Pesquisar por produto',
    validations_search_filters: 'Filtros de Pesquisa',
    validations_clear_filters: 'Limpar Filtros',
    validations_select_type: 'Selecionar tipo',
    validations_select_subcategory: 'Selecionar subcategoria',
    validations_select_equipment: 'Selecionar equipamento',
    validations_select_status: 'Selecionar status',
    validations_filter_by_type: 'Filtrar por tipo',
    validations_filter_by_status: 'Filtrar por status',
    validations_completed: 'Validações concluídas',
    validations_next30days: 'Vencendo em breve (30 dias)',
    validations_immediate: 'Ação imediata necessária',
    validations_protocols: 'Protocolos',
    validations_withDocumentation: 'Com documentação',
    validations_files: 'Arquivos',
    validations_actions: 'Ações',
    validations_no_results: 'Nenhum resultado encontrado',
    validations_no_validations: 'Nenhuma validação registrada',
    
    // Validation Types
    validations_processes: 'Processos',
    validations_cleaning: 'Limpeza',
    validations_analytical_methods: 'Métodos Analíticos',
    validations_computerized_systems: 'Sistemas Computadorizados',
    
    // Subcategories
    validations_manufacturing: 'Fabricação',
    validations_packaging: 'Embalagem',
    validations_assay: 'Valoração',
    validations_dissolution: 'Dissolução',
    validations_impurities: 'Impurezas',
    validations_uniformity: 'Uniformidade de Unidades de Dosagem',
    validations_identification: 'Identificação',
    validations_traces: 'Traços',
    validations_not_applicable: 'Não Aplicável',
    validations_initial_validation: 'Validação Inicial',
    validations_periodic_revalidation: 'Revalidação Periódica',
    
    // Equipment
    equipments_title: 'Equipamentos',
    equipments_subtitle: 'Gestão de equipamentos analíticos',
    equipments_add: 'Adicionar Equipamento',
    equipments_list: 'Lista de Equipamentos',
    
    // Products
    products_title: 'Produtos',
    products_subtitle: 'Gestão de produtos e matérias-primas',
    products_add: 'Adicionar Produto',
    products_list: 'Lista de Produtos',
    
    // Material Types
    material_types_finished_product: 'Produto Acabado',
    material_types_raw_material: 'Matéria-Prima',
    material_types_packaging_material: 'Material de Embalagem',
    material_types_bulk: 'Granel',
    
    // Users
    users_title: 'Usuários',
    users_subtitle: 'Gestão de usuários do sistema',
    users_new: 'Novo Usuário',
    users_list: 'Lista de Usuários',
    users_manage: 'Gerenciar usuários do sistema',
    users_name: 'Nome Completo',
    users_email: 'Email',
    users_role: 'Função',
    users_password: 'Senha',
    users_confirm_password: 'Confirmar Senha',
    users_password_requirements: 'Mínimo 7 caracteres, 1 maiúscula, 1 símbolo especial (*,+,-,_,@,#,$,%,^,&,!,?), números e letras',
    users_password_weak: 'A senha não atende aos requisitos de segurança',
    users_password_mismatch: 'As senhas não coincidem',
    users_created_successfully: 'Usuário criado com sucesso',
    
    // Security
    security_title: 'Segurança',
    security_subtitle: 'Configuração de segurança do sistema',
    
    // Settings
    settings_title: 'Configurações',
    settings_subtitle: 'Configuração geral do sistema',
    
    // Roles
    roles_super_administrador: 'Super Administrador',
    roles_administrador: 'Administrador',
    roles_coordinador: 'Coordenador',
    roles_analista: 'Analista',
    roles_visualizador: 'Visualizador',
    
    // Status
    status_validado: 'Validado',
    status_en_validacion: 'Em Validação',
    status_por_revalidar: 'Para Revalidação',
    status_vencido: 'Vencido',
    status_proximo: 'Vencendo em Breve',
    status_revalidacion: 'Em Revalidação',
    status_primera_revision: 'Primeira Revisão',
    status_segunda_revision: 'Segunda Revisão',
    status_success: 'Sucesso',
    status_failed: 'Falhou',
    status_warning: 'Aviso',
    
    // Integrations
    integrations_title: 'Integrações',
    integrations_subtitle: 'Configuração de serviços externos',
    integrations_email: 'Email',
    integrations_teams: 'Microsoft Teams',
    integrations_google: 'Google Workspace',
    integrations_configure: 'Configurar Integrações',
    integrations_test_connection: 'Testar Conexão',
    integrations_activity_log: 'Registro de Atividades',
    integrations_email_settings: 'Configurações de Email',
    integrations_teams_settings: 'Configurações do Teams',
    integrations_google_settings: 'Configurações do Google',
    
    // Products
    products_created: 'Produto Criado',
    products_product: 'Produto',
    products_added_successfully: 'adicionado com sucesso',
    products_add_product: 'Adicionar Produto',
    products_finished_products: 'Produtos Acabados',
    products_raw_materials: 'Matérias-Primas',
    products_packaging_materials: 'Materiais de Embalagem',
    products_product_list: 'Lista de Produtos',
    products_registered_products: 'Produtos registrados no sistema',
    products_finished_product: 'Produto Acabado',
    products_raw_material: 'Matéria-Prima',
    products_packaging_material: 'Material de Embalagem',
    products_add_new_product: 'Adicionar Novo Produto',
    products_product_code: 'Código do Produto',
    products_product_name: 'Nome do Produto',
    products_product_type: 'Tipo do Produto',
    products_select_type: 'Selecionar tipo',
    products_description: 'Descrição',
    products_product_description: 'Descrição do produto',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
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
