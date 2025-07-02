import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types/validation';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Header
    'system.title': 'Sistema de Gestión de Validaciones',
    'system.subtitle': 'Laboratorio Farmacéutico',
    'logout': 'Cerrar sesión',
    
    // Login
    'login.title': 'Sistema de Gestión de Validaciones',
    'login.email': 'Correo electrónico',
    'login.password': 'Contraseña',
    'login.button': 'Iniciar sesión',
    'login.loading': 'Iniciando sesión...',
    'login.success': 'Inicio de sesión exitoso',
    'login.welcome': 'Bienvenido al sistema',
    'login.error': 'Error de autenticación',
    'login.logout': 'Sesión cerrada',
    'login.logoutSuccess': 'Has cerrado sesión exitosamente',
    'login.logoutError': 'No se pudo cerrar la sesión',
    'login.redirecting': 'Redirigiendo...',
    'login.socialLogin': 'Iniciando sesión con {provider}',
    'login.socialError': 'No se pudo iniciar sesión. Verifica que el proveedor esté habilitado.',
    'login.continueGoogle': 'Continuar con Google',
    'login.continueMicrosoft': 'Continuar con Microsoft',
    'login.orContinue': 'O continúa con email',
    
    // Sidebar Menu
    'menu.dashboard': 'Dashboard',
    'menu.products': 'Productos',
    'menu.validations': 'Validaciones',
    'menu.equipments': 'Equipos Analíticos',
    'menu.users': 'Usuarios',
    'menu.security': 'Seguridad',
    'menu.settings': 'Configuración',
    
    // Stats
    'stats.validations': 'Validaciones',
    'stats.products': 'Productos',
    'stats.expiring': 'Próximas a Vencer',
    'stats.efficiency': 'Eficiencia',
    'stats.validated': 'Validadas',
    'stats.expired': 'Vencidas',
    'stats.total_validations': 'Total de validaciones',
    'stats.registered_products': 'Productos registrados',
    'stats.next_30_days': 'Próximos 30 días',
    'stats.validation_efficiency': 'Eficiencia de validación',
    
    // Dashboard
    'dashboard.subtitle': 'Resumen general del sistema de validaciones',
    'dashboard.access_restricted': 'Acceso Restringido',
    'dashboard.contact_administrator': 'Contacta al administrador para obtener permisos',
    
    // Analytics
    'analytics.title': 'Analíticas de Validaciones',
    'analytics.subtitle': 'Análisis estadístico de las validaciones del sistema',
    
    // Security Module
    'security.title': 'Seguridad',
    'security.subtitle': 'Configuración de seguridad y auditoría del sistema',
    'security.settings': 'Configuración de Seguridad',
    'security.settings_desc': 'Configurar políticas de seguridad del sistema',
    'security.permissions': 'Permisos del Sistema',
    'security.permissions_desc': 'Gestionar permisos y roles de usuario',
    'security.audit_log': 'Registro de Auditoría',
    'security.audit_log_desc': 'Historial de actividades de seguridad del sistema',
    'security.two_factor': 'Autenticación de Dos Factores',
    'security.two_factor_desc': 'Requerir 2FA para todos los usuarios',
    'security.password_expiry': 'Expiración de Contraseña (días)',
    'security.session_timeout': 'Tiempo de Sesión (minutos)',
    'security.login_attempts': 'Intentos de Login Máximos',
    'security.audit_logging': 'Registro de Auditoría',
    'security.audit_logging_desc': 'Registrar todas las acciones del sistema',
    'security.encryption': 'Encriptación de Datos',
    'security.encryption_desc': 'Encriptar datos sensibles',
    'security.access_restricted': 'Acceso Restringido',
    'security.no_permissions': 'No tienes permisos para acceder a la configuración de seguridad',
    
    // Products Module
    'products.title': 'Productos',
    'products.subtitle': 'Gestión de productos del sistema',
    'products.manage_system_products': 'Gestión de productos del sistema',
    'products.add_product': 'Agregar Producto',
    'products.add_new_product': 'Agregar Nuevo Producto',
    'products.product_code': 'Código de Producto',
    'products.product_name': 'Nombre del Producto',
    'products.product_type': 'Tipo de Producto',
    'products.description': 'Descripción',
    'products.product_description': 'Descripción del producto',
    'products.select_type': 'Seleccionar tipo',
    'products.finished_products': 'Productos Terminados',
    'products.raw_materials': 'Materias Primas',
    'products.packaging_materials': 'Materiales de Empaque',
    'products.increase_last_month': '+12% desde el mes pasado',
    'products.product_list': 'Lista de Productos',
    'products.registered_products': 'Productos registrados en el sistema',
    'products.module_in_development': 'Módulo de productos en desarrollo',
    'products.created': 'Producto creado',
    'products.product': 'Producto',
    'products.added_successfully': 'agregado exitosamente',
    
    // Validations
    'validations.search_filters': 'Filtros de Búsqueda',
    'validations.clear_filters': 'Limpiar Filtros',
    'validations.validation_type': 'Tipo de Validación',
    'validations.subcategory': 'Subcategoría',
    'validations.validation_code': 'Código de Validación',
    'validations.product_code': 'Código de Producto',
    'validations.equipment_type': 'Tipo de Equipo',
    'validations.status': 'Estado',
    'validations.expiry_from': 'Vencimiento Desde',
    'validations.expiry_to': 'Vencimiento Hasta',
    'validations.select_type': 'Seleccionar tipo',
    'validations.select_subcategory': 'Seleccionar subcategoría',
    'validations.select_equipment': 'Seleccionar equipo',
    'validations.select_status': 'Seleccionar estado',
    'validations.search_by_code': 'Buscar por código',
    'validations.search_by_product': 'Buscar por producto',
    'validations.list': 'Lista de Validaciones',
    'validations.manage': 'Gestionar las validaciones del sistema',
    'validations.add_product_raw_material': 'Agregar Validación',
    'validations.search': 'Buscar validaciones...',
    'validations.product_raw_material': 'Producto/Materia Prima',
    'validations.product_raw_material_code': 'Código Producto/MP',
    'validations.equipment': 'Equipo',
    'validations.expiry_date': 'Fecha de Vencimiento',
    'validations.files': 'Archivos',
    'validations.actions': 'Acciones',
    'validations.no_results': 'No se encontraron resultados',
    'validations.no_validations': 'No hay validaciones registradas',
    'validations.new': 'Nueva Validación',
    'validations.subtitle': 'Gestión de validaciones farmacéuticas',
    'validations.completed': 'Validaciones completadas',
    'validations.next30days': 'Próximas a vencer en 30 días',
    'validations.immediate': 'Requieren atención inmediata',
    'validations.protocols': 'Protocolos',
    'validations.withDocumentation': 'Con documentación adjunta',
    
    // Validation Types
    'validations.processes': 'Procesos',
    'validations.cleaning': 'Limpieza',
    'validations.analytical_methods': 'Métodos Analíticos',
    'validations.computerized_systems': 'Sistemas Computarizados',
    
    // Subcategories
    'validations.manufacturing': 'Fabricación',
    'validations.packaging': 'Empaque',
    'validations.assay': 'Valoración',
    'validations.dissolution': 'Disolución',
    'validations.impurities': 'Impurezas',
    'validations.uniformity': 'Uniformidad de Unidades de Dosificación',
    'validations.identification': 'Identificación',
    'validations.traces': 'Trazas',
    'validations.not_applicable': 'No Aplica',
    'validations.initial_validation': 'Validación Inicial',
    'validations.periodic_revalidation': 'Revalidación Periódica',
    
    // Product Types
    'products.finished_product': 'Producto Terminado',
    'products.raw_material': 'Materia Prima',
    'products.packaging_material': 'Material de Empaque',
    
    // Status
    'status.validado': 'Validado',
    'status.proximo': 'Próximo a Vencer',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'En Revalidación',
    'status.en_validacion': 'En Validación',
    'status.por_revalidar': 'Por Revalidar',
    'status.primera_revision': 'Primera Revisión',
    'status.segunda_revision': 'Segunda Revisión',
    
    // Common
    'common.all': 'Todos',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.add': 'Agregar',
    'common.actions': 'Acciones'
  },
  en: {
    // Header
    'system.title': 'Validation Management System',
    'system.subtitle': 'Pharmaceutical Laboratory',
    'logout': 'Logout',
    
    // Login
    'login.title': 'Validation Management System',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.button': 'Sign In',
    'login.loading': 'Signing in...',
    'login.success': 'Login successful',
    'login.welcome': 'Welcome to the system',
    'login.error': 'Authentication error',
    'login.logout': 'Session closed',
    'login.logoutSuccess': 'You have successfully logged out',
    'login.logoutError': 'Could not log out',
    'login.redirecting': 'Redirecting...',
    'login.socialLogin': 'Signing in with {provider}',
    'login.socialError': 'Could not sign in. Check that the provider is enabled.',
    'login.continueGoogle': 'Continue with Google',
    'login.continueMicrosoft': 'Continue with Microsoft',
    'login.orContinue': 'Or continue with email',
    
    // Sidebar Menu
    'menu.dashboard': 'Dashboard',
    'menu.products': 'Products',
    'menu.validations': 'Validations',
    'menu.equipments': 'Analytical Equipment',
    'menu.users': 'Users',
    'menu.security': 'Security',
    'menu.settings': 'Settings',
    
    // Stats
    'stats.validations': 'Validations',
    'stats.products': 'Products',
    'stats.expiring': 'Expiring',
    'stats.efficiency': 'Efficiency',
    'stats.validated': 'Validated',
    'stats.expired': 'Expired',
    'stats.total_validations': 'Total validations',
    'stats.registered_products': 'Registered products',
    'stats.next_30_days': 'Next 30 days',
    'stats.validation_efficiency': 'Validation efficiency',
    
    // Dashboard
    'dashboard.subtitle': 'General overview of the validation system',
    'dashboard.access_restricted': 'Access Restricted',
    'dashboard.contact_administrator': 'Contact administrator for permissions',
    
    // Analytics
    'analytics.title': 'Validation Analytics',
    'analytics.subtitle': 'Statistical analysis of system validations',
    
    // Security Module
    'security.title': 'Security',
    'security.subtitle': 'System security and audit configuration',
    'security.settings': 'Security Settings',
    'security.settings_desc': 'Configure system security policies',
    'security.permissions': 'System Permissions',
    'security.permissions_desc': 'Manage user permissions and roles',
    'security.audit_log': 'Audit Log',
    'security.audit_log_desc': 'System security activity history',
    'security.two_factor': 'Two-Factor Authentication',
    'security.two_factor_desc': 'Require 2FA for all users',
    'security.password_expiry': 'Password Expiry (days)',
    'security.session_timeout': 'Session Timeout (minutes)',
    'security.login_attempts': 'Maximum Login Attempts',
    'security.audit_logging': 'Audit Logging',
    'security.audit_logging_desc': 'Log all system actions',
    'security.encryption': 'Data Encryption',
    'security.encryption_desc': 'Encrypt sensitive data',
    'security.access_restricted': 'Access Restricted',
    'security.no_permissions': 'You do not have permissions to access security configuration',
    
    // Products Module
    'products.title': 'Products',
    'products.subtitle': 'System product management',
    'products.manage_system_products': 'Manage system products',
    'products.add_product': 'Add Product',
    'products.add_new_product': 'Add New Product',
    'products.product_code': 'Product Code',
    'products.product_name': 'Product Name',
    'products.product_type': 'Product Type',
    'products.description': 'Description',
    'products.product_description': 'Product description',
    'products.select_type': 'Select type',
    'products.finished_products': 'Finished Products',
    'products.raw_materials': 'Raw Materials',
    'products.packaging_materials': 'Packaging Materials',
    'products.increase_last_month': '+12% from last month',
    'products.product_list': 'Product List',
    'products.registered_products': 'Products registered in the system',
    'products.module_in_development': 'Product module in development',
    'products.created': 'Product created',
    'products.product': 'Product',
    'products.added_successfully': 'added successfully',
    
    // Validations
    'validations.search_filters': 'Search Filters',
    'validations.clear_filters': 'Clear Filters',
    'validations.validation_type': 'Validation Type',
    'validations.subcategory': 'Subcategory',
    'validations.validation_code': 'Validation Code',
    'validations.product_code': 'Product Code',
    'validations.equipment_type': 'Equipment Type',
    'validations.status': 'Status',
    'validations.expiry_from': 'Expiry From',
    'validations.expiry_to': 'Expiry To',
    'validations.select_type': 'Select type',
    'validations.select_subcategory': 'Select subcategory',
    'validations.select_equipment': 'Select equipment',
    'validations.select_status': 'Select status',
    'validations.search_by_code': 'Search by code',
    'validations.search_by_product': 'Search by product',
    'validations.list': 'Validation List',
    'validations.manage': 'Manage system validations',
    'validations.add_product_raw_material': 'Add Validation',
    'validations.search': 'Search validations...',
    'validations.product_raw_material': 'Product/Raw Material',
    'validations.product_raw_material_code': 'Product/RM Code',
    'validations.equipment': 'Equipment',
    'validations.expiry_date': 'Expiry Date',
    'validations.files': 'Files',
    'validations.actions': 'Actions',
    'validations.no_results': 'No results found',
    'validations.no_validations': 'No validations registered',
    'validations.new': 'New Validation',
    'validations.subtitle': 'Pharmaceutical validation management',
    'validations.completed': 'Completed validations',
    'validations.next30days': 'Expiring in next 30 days',
    'validations.immediate': 'Require immediate attention',
    'validations.protocols': 'Protocols',
    'validations.withDocumentation': 'With attached documentation',
    
    // Validation Types
    'validations.processes': 'Processes',
    'validations.cleaning': 'Cleaning',
    'validations.analytical_methods': 'Analytical Methods',
    'validations.computerized_systems': 'Computerized Systems',
    
    // Subcategories
    'validations.manufacturing': 'Manufacturing',
    'validations.packaging': 'Packaging',
    'validations.assay': 'Assay',
    'validations.dissolution': 'Dissolution',
    'validations.impurities': 'Impurities',
    'validations.uniformity': 'Uniformity of Dosage Units',
    'validations.identification': 'Identification',
    'validations.traces': 'Traces',
    'validations.not_applicable': 'Not Applicable',
    'validations.initial_validation': 'Initial Validation',
    'validations.periodic_revalidation': 'Periodic Revalidation',
    
    // Product Types
    'products.finished_product': 'Finished Product',
    'products.raw_material': 'Raw Material',
    'products.packaging_material': 'Packaging Material',
    
    // Status
    'status.validado': 'Validated',
    'status.proximo': 'Expiring Soon',
    'status.vencido': 'Expired',
    'status.revalidacion': 'Under Revalidation',
    'status.en_validacion': 'Under Validation',
    'status.por_revalidar': 'Pending Revalidation',
    'status.primera_revision': 'First Review',
    'status.segunda_revision': 'Second Review',
    
    // Common
    'common.all': 'All',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.actions': 'Actions'
  },
  pt: {
    // Header
    'system.title': 'Sistema de Gestão de Validações',
    'system.subtitle': 'Laboratório Farmacêutico',
    'logout': 'Sair',
    
    // Login
    'login.title': 'Sistema de Gestão de Validações',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.button': 'Entrar',
    'login.loading': 'Entrando...',
    'login.success': 'Login bem-sucedido',
    'login.welcome': 'Bem-vindo ao sistema',
    'login.error': 'Erro de autenticação',
    'login.logout': 'Sessão encerrada',
    'login.logoutSuccess': 'Você saiu com sucesso',
    'login.logoutError': 'Não foi possível sair',
    'login.redirecting': 'Redirecionando...',
    'login.socialLogin': 'Entrando com {provider}',
    'login.socialError': 'Não foi possível entrar. Verifique se o provedor está habilitado.',
    'login.continueGoogle': 'Continuar com Google',
    'login.continueMicrosoft': 'Continuar com Microsoft',
    'login.orContinue': 'Ou continue com email',
    
    // Sidebar Menu
    'menu.dashboard': 'Dashboard',
    'menu.products': 'Produtos',
    'menu.validations': 'Validações',
    'menu.equipments': 'Equipamentos Analíticos',
    'menu.users': 'Usuários',
    'menu.security': 'Segurança',
    'menu.settings': 'Configurações',
    
    // Stats
    'stats.validations': 'Validações',
    'stats.products': 'Produtos',
    'stats.expiring': 'Vencendo',
    'stats.efficiency': 'Eficiência',
    'stats.validated': 'Validadas',
    'stats.expired': 'Vencidas',
    'stats.total_validations': 'Total de validações',
    'stats.registered_products': 'Produtos registrados',
    'stats.next_30_days': 'Próximos 30 dias',
    'stats.validation_efficiency': 'Eficiência de validação',
    
    // Dashboard
    'dashboard.subtitle': 'Visão geral do sistema de validações',
    'dashboard.access_restricted': 'Acesso Restrito',
    'dashboard.contact_administrator': 'Entre em contato com o administrador para obter permissões',
    
    // Analytics
    'analytics.title': 'Análises de Validações',
    'analytics.subtitle': 'Análise estatística das validações do sistema',
    
    // Security Module
    'security.title': 'Segurança',
    'security.subtitle': 'Configuração de segurança e auditoria do sistema',
    'security.settings': 'Configurações de Segurança',
    'security.settings_desc': 'Configurar políticas de segurança do sistema',
    'security.permissions': 'Permissões do Sistema',
    'security.permissions_desc': 'Gerenciar permissões e funções de usuário',
    'security.audit_log': 'Log de Auditoria',
    'security.audit_log_desc': 'Histórico de atividades de segurança do sistema',
    'security.two_factor': 'Autenticação de Dois Fatores',
    'security.two_factor_desc': 'Exigir 2FA para todos os usuários',
    'security.password_expiry': 'Expiração de Senha (dias)',
    'security.session_timeout': 'Tempo Limite de Sessão (minutos)',
    'security.login_attempts': 'Tentativas Máximas de Login',
    'security.audit_logging': 'Log de Auditoria',
    'security.audit_logging_desc': 'Registrar todas as ações do sistema',
    'security.encryption': 'Criptografia de Dados',
    'security.encryption_desc': 'Criptografar dados sensíveis',
    'security.access_restricted': 'Acesso Restrito',
    'security.no_permissions': 'Você não tem permissões para acessar as configurações de segurança',
    
    // Products Module
    'products.title': 'Produtos',
    'products.subtitle': 'Gestão de produtos do sistema',
    'products.manage_system_products': 'Gerenciar produtos do sistema',
    'products.add_product': 'Adicionar Produto',
    'products.add_new_product': 'Adicionar Novo Produto',
    'products.product_code': 'Código do Produto',
    'products.product_name': 'Nome do Produto',
    'products.product_type': 'Tipo de Produto',
    'products.description': 'Descrição',
    'products.product_description': 'Descrição do produto',
    'products.select_type': 'Selecionar tipo',
    'products.finished_products': 'Produtos Acabados',
    'products.raw_materials': 'Matérias Primas',
    'products.packaging_materials': 'Materiais de Embalagem',
    'products.increase_last_month': '+12% do mês passado',
    'products.product_list': 'Lista de Produtos',
    'products.registered_products': 'Produtos registrados no sistema',
    'products.module_in_development': 'Módulo de produtos em desenvolvimento',
    'products.created': 'Produto criado',
    'products.product': 'Produto',
    'products.added_successfully': 'adicionado com sucesso',
    
    // Validations
    'validations.search_filters': 'Filtros de Busca',
    'validations.clear_filters': 'Limpar Filtros',
    'validations.validation_type': 'Tipo de Validação',
    'validations.subcategory': 'Subcategoria',
    'validations.validation_code': 'Código de Validação',
    'validations.product_code': 'Código do Produto',
    'validations.equipment_type': 'Tipo de Equipamento',
    'validations.status': 'Status',
    'validations.expiry_from': 'Vencimento De',
    'validations.expiry_to': 'Vencimento Até',
    'validations.select_type': 'Selecionar tipo',
    'validations.select_subcategory': 'Selecionar subcategoria',
    'validations.select_equipment': 'Selecionar equipamento',
    'validations.select_status': 'Selecionar status',
    'validations.search_by_code': 'Buscar por código',
    'validations.search_by_product': 'Buscar por produto',
    'validations.list': 'Lista de Validações',
    'validations.manage': 'Gerenciar validações do sistema',
    'validations.add_product_raw_material': 'Adicionar Validação',
    'validations.search': 'Buscar validações...',
    'validations.product_raw_material': 'Produto/Matéria Prima',
    'validations.product_raw_material_code': 'Código Produto/MP',
    'validations.equipment': 'Equipamento',
    'validations.expiry_date': 'Data de Vencimento',
    'validations.files': 'Arquivos',
    'validations.actions': 'Ações',
    'validations.no_results': 'Nenhum resultado encontrado',
    'validations.no_validations': 'Nenhuma validação registrada',
    'validations.new': 'Nova Validação',
    'validations.subtitle': 'Gestão de validações farmacêuticas',
    'validations.completed': 'Validações concluídas',
    'validations.next30days': 'Vencendo nos próximos 30 dias',
    'validations.immediate': 'Requerem atenção imediata',
    'validations.protocols': 'Protocolos',
    'validations.withDocumentation': 'Com documentação anexada',
    
    // Validation Types
    'validations.processes': 'Processos',
    'validations.cleaning': 'Limpeza',
    'validations.analytical_methods': 'Métodos Analíticos',
    'validations.computerized_systems': 'Sistemas Computadorizados',
    
    // Subcategories
    'validations.manufacturing': 'Fabricação',
    'validations.packaging': 'Embalagem',
    'validations.assay': 'Dosagem',
    'validations.dissolution': 'Dissolução',
    'validations.impurities': 'Impurezas',
    'validations.uniformity': 'Uniformidade de Unidades de Dosagem',
    'validations.identification': 'Identificação',
    'validations.traces': 'Traços',
    'validations.not_applicable': 'Não Aplicável',
    'validations.initial_validation': 'Validação Inicial',
    'validations.periodic_revalidation': 'Revalidação Periódica',
    
    // Product Types
    'products.finished_product': 'Produto Acabado',
    'products.raw_material': 'Matéria Prima',
    'products.packaging_material': 'Material de Embalagem',
    
    // Status
    'status.validado': 'Validado',
    'status.proximo': 'Próximo ao Vencimento',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'Em Revalidação',
    'status.en_validacion': 'Em Validação',
    'status.por_revalidar': 'Pendente de Revalidação',
    'status.primera_revision': 'Primeira Revisão',
    'status.segunda_revision': 'Segunda Revisão',
    
    // Common
    'common.all': 'Todos',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.add': 'Adicionar',
    'common.actions': 'Ações'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key] || key;
    
    // Handle parameter substitution
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    
    return translation;
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
