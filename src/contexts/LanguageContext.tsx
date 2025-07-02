
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
    // System
    'system.title': 'Sistema de Gestión de Validaciones',
    'system.subtitle': 'Control de validaciones farmacéuticas',
    
    // Menu
    'menu.dashboard': 'Panel Principal',
    'menu.validations': 'Validaciones',
    'menu.products': 'Productos',
    'menu.equipments': 'Equipos',
    'menu.users': 'Usuarios',
    'menu.security': 'Seguridad',
    'menu.settings': 'Configuraciones',
    
    // Login
    'login.title': 'Iniciar Sesión',
    'login.email': 'Correo Electrónico',
    'login.password': 'Contraseña',
    'login.button': 'Iniciar Sesión',
    'login.loading': 'Iniciando sesión...',
    'login.success': 'Sesión iniciada',
    'login.welcome': 'Bienvenido al sistema',
    'login.error': 'Error de autenticación',
    'login.logout': 'Cerrar Sesión',
    'login.logoutSuccess': 'Sesión cerrada exitosamente',
    
    // Common
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.add': 'Agregar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.clear': 'Limpiar',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.view': 'Ver',
    'common.download': 'Descargar',
    'common.upload': 'Subir',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.warning': 'Advertencia',
    'common.info': 'Información',
    
    // Stats
    'stats.validated': 'Validadas',
    'stats.expiring': 'Por Vencer',
    'stats.expired': 'Vencidas',
    'stats.in_validation': 'En Validación',
    
    // Status
    'status.validado': 'Validado',
    'status.proximo': 'Próximo a Vencer',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'En Revalidación',
    'status.en_validacion': 'En Validación',
    'status.por_revalidar': 'Por Revalidar',
    'status.primera_revision': 'Primera Revisión',
    'status.segunda_revision': 'Segunda Revisión',
    
    // Validations
    'validations.list': 'Lista de Validaciones',
    'validations.manage': 'Gestionar validaciones del sistema',
    'validations.new': 'Nueva Validación',
    'validations.search': 'Buscar validaciones...',
    'validations.validation_code': 'Código',
    'validations.product_raw_material': 'Tipo de Material',
    'validations.product_raw_material_code': 'Código',
    'validations.validation_type': 'Tipo de Validación',
    'validations.subcategory': 'Subcategoría',
    'validations.equipment': 'Equipo',
    'validations.status': 'Estado',
    'validations.expiry_date': 'Fecha de Vencimiento',
    'validations.files': 'Archivos',
    'validations.actions': 'Acciones',
    'validations.no_results': 'No se encontraron resultados',
    'validations.no_validations': 'No hay validaciones registradas',
    'validations.subtitle': 'Gestión y seguimiento de validaciones',
    'validations.completed': 'validaciones completadas',
    'validations.next30days': 'próximas a vencer en 30 días',
    'validations.immediate': 'requieren atención inmediata',
    'validations.protocols': 'Protocolos',
    'validations.withDocumentation': 'con documentación',
    'validations.processes': 'Procesos',
    'validations.analytical_methods': 'Métodos Analíticos',
    'validations.cleaning': 'Limpieza',
    'validations.computerized_systems': 'Sistemas Computarizados',
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
    
    // Products
    'products.title': 'Gestión de Productos',
    'products.subtitle': 'Administrar productos y materias primas',
    'products.list': 'Lista de Productos',
    'products.manage': 'Gestionar productos del catálogo',
    'products.new': 'Nuevo Producto',
    'products.search': 'Buscar productos...',
    'products.code': 'Código',
    'products.name': 'Nombre',
    'products.type': 'Tipo',
    'products.description': 'Descripción',
    'products.actions': 'Acciones',
    'products.no_results': 'No se encontraron resultados',
    'products.no_products': 'No hay productos registrados',
    'products.finished_product': 'Producto Terminado',
    'products.raw_material': 'Materia Prima',
    'products.packaging_material': 'Material de Empaque',
    'products.bulk': 'Granel',
    
    // Material Types
    'material_types.raw_material': 'Materia Prima',
    'material_types.packaging_material': 'Material de Empaque',
    'material_types.finished_product': 'Producto Terminado',
    'material_types.bulk': 'Granel',
    
    // Users
    'users.title': 'Gestión de Usuarios',
    'users.subtitle': 'Administrar usuarios del sistema',
    'users.list': 'Lista de Usuarios',
    'users.manage': 'Gestionar usuarios del sistema',
    'users.new': 'Nuevo Usuario',
    'users.search': 'Buscar usuarios...',
    'users.name': 'Nombre',
    'users.email': 'Email',
    'users.role': 'Rol',
    'users.status': 'Estado',
    'users.last_login': 'Último Acceso',
    'users.actions': 'Acciones',
    'users.no_results': 'No se encontraron resultados',
    'users.no_users': 'No hay usuarios registrados',
    
    // Roles
    'roles.administrador': 'Administrador',
    'roles.coordinador': 'Coordinador',
    'roles.analista': 'Analista',
    'roles.visualizador': 'Visualizador',
    
    // Security
    'security.title': 'Gestión de Seguridad',
    'security.subtitle': 'Configuración de seguridad y permisos',
    'security.system_permissions': 'Permisos de Sistema',
    'security.role_management': 'Gestión de Roles',
    'security.audit_logs': 'Registros de Auditoría',
    'security.permissions.validation_create': 'Crear Validaciones',
    'security.permissions.validation_edit': 'Editar Validaciones',
    'security.permissions.validation_delete': 'Eliminar Validaciones',
    'security.permissions.validation_view': 'Ver Validaciones',
    'security.permissions.user_management': 'Gestión de Usuarios',
    'security.permissions.system_config': 'Configuración del Sistema',
    
    // Settings
    'settings.title': 'Configuraciones',
    'settings.subtitle': 'Configuración general del sistema'
  },
  en: {
    // System
    'system.title': 'Validation Management System',
    'system.subtitle': 'Pharmaceutical validation control',
    
    // Menu
    'menu.dashboard': 'Dashboard',
    'menu.validations': 'Validations',
    'menu.products': 'Products',
    'menu.equipments': 'Equipment',
    'menu.users': 'Users',
    'menu.security': 'Security',
    'menu.settings': 'Settings',
    
    // Login
    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.button': 'Sign In',
    'login.loading': 'Signing in...',
    'login.success': 'Login successful',
    'login.welcome': 'Welcome to the system',
    'login.error': 'Authentication error',
    'login.logout': 'Logout',
    'login.logoutSuccess': 'Successfully logged out',
    
    // Common
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
    
    // Stats
    'stats.validated': 'Validated',
    'stats.expiring': 'Expiring',
    'stats.expired': 'Expired',
    'stats.in_validation': 'In Validation',
    
    // Status
    'status.validado': 'Validated',
    'status.proximo': 'About to Expire',
    'status.vencido': 'Expired',
    'status.revalidacion': 'In Revalidation',
    'status.en_validacion': 'In Validation',
    'status.por_revalidar': 'To Revalidate',
    'status.primera_revision': 'First Review',
    'status.segunda_revision': 'Second Review',
    
    // Validations
    'validations.list': 'Validations List',
    'validations.manage': 'Manage system validations',
    'validations.new': 'New Validation',
    'validations.search': 'Search validations...',
    'validations.validation_code': 'Code',
    'validations.product_raw_material': 'Material Type',
    'validations.product_raw_material_code': 'Code',
    'validations.validation_type': 'Validation Type',
    'validations.subcategory': 'Subcategory',
    'validations.equipment': 'Equipment',
    'validations.status': 'Status',
    'validations.expiry_date': 'Expiry Date',
    'validations.files': 'Files',
    'validations.actions': 'Actions',
    'validations.no_results': 'No results found',
    'validations.no_validations': 'No validations registered',
    'validations.subtitle': 'Validation management and tracking',
    'validations.completed': 'completed validations',
    'validations.next30days': 'expiring in next 30 days',
    'validations.immediate': 'require immediate attention',
    'validations.protocols': 'Protocols',
    'validations.withDocumentation': 'with documentation',
    'validations.processes': 'Processes',
    'validations.analytical_methods': 'Analytical Methods',
    'validations.cleaning': 'Cleaning',
    'validations.computerized_systems': 'Computerized Systems',
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
    
    // Products
    'products.title': 'Product Management',
    'products.subtitle': 'Manage products and raw materials',
    'products.list': 'Product List',
    'products.manage': 'Manage catalog products',
    'products.new': 'New Product',
    'products.search': 'Search products...',
    'products.code': 'Code',
    'products.name': 'Name',
    'products.type': 'Type',
    'products.description': 'Description',
    'products.actions': 'Actions',
    'products.no_results': 'No results found',
    'products.no_products': 'No products registered',
    'products.finished_product': 'Finished Product',
    'products.raw_material': 'Raw Material',
    'products.packaging_material': 'Packaging Material',
    'products.bulk': 'Bulk',
    
    // Material Types
    'material_types.raw_material': 'Raw Material',
    'material_types.packaging_material': 'Packaging Material',
    'material_types.finished_product': 'Finished Product',
    'material_types.bulk': 'Bulk',
    
    // Users
    'users.title': 'User Management',
    'users.subtitle': 'Manage system users',
    'users.list': 'User List',
    'users.manage': 'Manage system users',
    'users.new': 'New User',
    'users.search': 'Search users...',
    'users.name': 'Name',
    'users.email': 'Email',
    'users.role': 'Role',
    'users.status': 'Status',
    'users.last_login': 'Last Login',
    'users.actions': 'Actions',
    'users.no_results': 'No results found',
    'users.no_users': 'No users registered',
    
    // Roles
    'roles.administrador': 'Administrator',
    'roles.coordinador': 'Coordinator',
    'roles.analista': 'Analyst',
    'roles.visualizador': 'Viewer',
    
    // Security
    'security.title': 'Security Management',
    'security.subtitle': 'Security configuration and permissions',
    'security.system_permissions': 'System Permissions',
    'security.role_management': 'Role Management',
    'security.audit_logs': 'Audit Logs',
    'security.permissions.validation_create': 'Create Validations',
    'security.permissions.validation_edit': 'Edit Validations',
    'security.permissions.validation_delete': 'Delete Validations',
    'security.permissions.validation_view': 'View Validations',
    'security.permissions.user_management': 'User Management',
    'security.permissions.system_config': 'System Configuration',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'General system configuration'
  },
  pt: {
    // System
    'system.title': 'Sistema de Gestão de Validações',
    'system.subtitle': 'Controle de validações farmacêuticas',
    
    // Menu
    'menu.dashboard': 'Painel Principal',
    'menu.validations': 'Validações',
    'menu.products': 'Produtos',
    'menu.equipments': 'Equipamentos',
    'menu.users': 'Usuários',
    'menu.security': 'Segurança',
    'menu.settings': 'Configurações',
    
    // Login
    'login.title': 'Entrar',
    'login.email': 'E-mail',
    'login.password': 'Senha',
    'login.button': 'Entrar',
    'login.loading': 'Entrando...',
    'login.success': 'Login realizado',
    'login.welcome': 'Bem-vindo ao sistema',
    'login.error': 'Erro de autenticação',
    'login.logout': 'Sair',
    'login.logoutSuccess': 'Logout realizado com sucesso',
    
    // Common
    'common.cancel': 'Cancelar',
    'common.save': 'Salvar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.add': 'Adicionar',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    'common.clear': 'Limpar',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.view': 'Ver',
    'common.download': 'Baixar',
    'common.upload': 'Carregar',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.warning': 'Aviso',
    'common.info': 'Informação',
    
    // Stats
    'stats.validated': 'Validados',
    'stats.expiring': 'A Vencer',
    'stats.expired': 'Vencidos',
    'stats.in_validation': 'Em Validação',
    
    // Status
    'status.validado': 'Validado',
    'status.proximo': 'Próximo ao Vencimento',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'Em Revalidação',
    'status.en_validacion': 'Em Validação',
    'status.por_revalidar': 'Para Revalidar',
    'status.primera_revision': 'Primeira Revisão',
    'status.segunda_revision': 'Segunda Revisão',
    
    // Validations
    'validations.list': 'Lista de Validações',
    'validations.manage': 'Gerenciar validações do sistema',
    'validations.new': 'Nova Validação',
    'validations.search': 'Pesquisar validações...',
    'validations.validation_code': 'Código',
    'validations.product_raw_material': 'Tipo de Material',
    'validations.product_raw_material_code': 'Código',
    'validations.validation_type': 'Tipo de Validação',
    'validations.subcategory': 'Subcategoria',
    'validations.equipment': 'Equipamento',
    'validations.status': 'Status',
    'validations.expiry_date': 'Data de Vencimento',
    'validations.files': 'Arquivos',
    'validations.actions': 'Ações',
    'validations.no_results': 'Nenhum resultado encontrado',
    'validations.no_validations': 'Nenhuma validação registrada',
    'validations.subtitle': 'Gestão e acompanhamento de validações',
    'validations.completed': 'validações concluídas',
    'validations.next30days': 'vencendo nos próximos 30 dias',
    'validations.immediate': 'requerem atenção imediata',
    'validations.protocols': 'Protocolos',
    'validations.withDocumentation': 'com documentação',
    'validations.processes': 'Processos',
    'validations.analytical_methods': 'Métodos Analíticos',
    'validations.cleaning': 'Limpeza',
    'validations.computerized_systems': 'Sistemas Computadorizados',
    'validations.manufacturing': 'Fabricação',
    'validations.packaging': 'Embalagem',
    'validations.assay': 'Valoração',
    'validations.dissolution': 'Dissolução',
    'validations.impurities': 'Impurezas',
    'validations.uniformity': 'Uniformidade de Unidades de Dosagem',
    'validations.identification': 'Identificação',
    'validations.traces': 'Traços',
    'validations.not_applicable': 'Não se Aplica',
    'validations.initial_validation': 'Validação Inicial',
    'validations.periodic_revalidation': 'Revalidação Periódica',
    
    // Products
    'products.title': 'Gestão de Produtos',
    'products.subtitle': 'Gerenciar produtos e matérias-primas',
    'products.list': 'Lista de Produtos',
    'products.manage': 'Gerenciar produtos do catálogo',
    'products.new': 'Novo Produto',
    'products.search': 'Pesquisar produtos...',
    'products.code': 'Código',
    'products.name': 'Nome',
    'products.type': 'Tipo',
    'products.description': 'Descrição',
    'products.actions': 'Ações',
    'products.no_results': 'Nenhum resultado encontrado',
    'products.no_products': 'Nenhum produto registrado',
    'products.finished_product': 'Produto Acabado',
    'products.raw_material': 'Matéria-Prima',
    'products.packaging_material': 'Material de Embalagem',
    'products.bulk': 'Granel',
    
    // Material Types
    'material_types.raw_material': 'Matéria-Prima',
    'material_types.packaging_material': 'Material de Embalagem',
    'material_types.finished_product': 'Produto Acabado',
    'material_types.bulk': 'Granel',
    
    // Users
    'users.title': 'Gestão de Usuários',
    'users.subtitle': 'Gerenciar usuários do sistema',
    'users.list': 'Lista de Usuários',
    'users.manage': 'Gerenciar usuários do sistema',
    'users.new': 'Novo Usuário',
    'users.search': 'Pesquisar usuários...',
    'users.name': 'Nome',
    'users.email': 'Email',
    'users.role': 'Função',
    'users.status': 'Status',
    'users.last_login': 'Último Acesso',
    'users.actions': 'Ações',
    'users.no_results': 'Nenhum resultado encontrado',
    'users.no_users': 'Nenhum usuário registrado',
    
    // Roles
    'roles.administrador': 'Administrador',
    'roles.coordinador': 'Coordenador',
    'roles.analista': 'Analista',
    'roles.visualizador': 'Visualizador',
    
    // Security
    'security.title': 'Gestão de Segurança',
    'security.subtitle': 'Configuração de segurança e permissões',
    'security.system_permissions': 'Permissões do Sistema',
    'security.role_management': 'Gestão de Funções',
    'security.audit_logs': 'Registros de Auditoria',
    'security.permissions.validation_create': 'Criar Validações',
    'security.permissions.validation_edit': 'Editar Validações',
    'security.permissions.validation_delete': 'Excluir Validações',
    'security.permissions.validation_view': 'Ver Validações',
    'security.permissions.user_management': 'Gestão de Usuários',
    'security.permissions.system_config': 'Configuração do Sistema',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.subtitle': 'Configuração geral do sistema'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key] || key;
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
