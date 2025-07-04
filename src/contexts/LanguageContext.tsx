
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
    
    // Validations
    validations_title: 'Validaciones',
    validations_subtitle: 'Gestión de validaciones de métodos y procesos',
    validations_new: 'Nueva Validación',
    validations_list: 'Lista de Validaciones',
    validations_code: 'Código de Validación',
    validations_product: 'Producto',
    validations_type: 'Tipo',
    validations_equipment: 'Equipo',
    validations_status: 'Estado',
    validations_issue_date: 'Fecha Emisión',
    validations_expiry_date: 'Fecha Vencimiento',
    validations_search_by_code: 'Buscar por código',
    validations_filter_by_type: 'Filtrar por tipo',
    validations_filter_by_status: 'Filtrar por estado',
    validations_completed: 'Completadas',
    validations_next30days: 'Próximas a vencer (30 días)',
    validations_immediate: 'Acción inmediata requerida',
    validations_protocols: 'Protocolos',
    validations_withDocumentation: 'Con documentación',
    
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
    security_settings: 'Configuración de Seguridad',
    security_settings_desc: 'Ajustes de seguridad y políticas del sistema',
    security_two_factor: 'Autenticación de Dos Factores',
    security_two_factor_desc: 'Habilitar 2FA para mayor seguridad',
    security_password_expiry: 'Expiración de Contraseña (días)',
    security_session_timeout: 'Tiempo de Sesión (minutos)',
    security_login_attempts: 'Intentos de Login Máximos',
    security_audit_logging: 'Registro de Auditoría',
    security_audit_logging_desc: 'Registrar todas las acciones del sistema',
    security_encryption: 'Cifrado de Datos',
    security_encryption_desc: 'Cifrar datos sensibles',
    security_audit_log: 'Registro de Auditoría',
    security_audit_log_desc: 'Historial de acciones del sistema',
    security_date_time: 'Fecha y Hora',
    security_user: 'Usuario',
    security_action: 'Acción',
    security_resource: 'Recurso',
    security_status: 'Estado',
    security_ip_address: 'Dirección IP',
    security_download_audit: 'Descargar Auditoría',
    security_view_audit_pdf: 'Ver Auditoría PDF',
    security_password_change: 'Cambiar Contraseña',
    security_password_reset: 'Restablecer Contraseña',
    security_setting_updated: 'Configuración actualizada',
    security_setting_updated_desc: 'La configuración de seguridad ha sido actualizada',
    
    // Settings
    settings_title: 'Configuración',
    settings_subtitle: 'Configuración general del sistema',
    
    // Roles
    roles_super_administrador: 'Super Administrador',
    roles_administrador: 'Administrador',
    roles_coordinador: 'Coordinador',
    roles_analista: 'Analista',
    roles_visualizador: 'Visualizador',
    
    // Validation Types
    validation_type_metodos_analiticos: 'Métodos Analíticos',
    validation_type_procesos: 'Procesos',
    validation_type_limpieza: 'Limpieza',
    validation_type_sistemas_computarizados: 'Sistemas Computarizados',
    
    // Validation Statuses
    validation_status_borrador: 'Borrador',
    validation_status_primera_revision: 'Primera Revisión',
    validation_status_segunda_revision: 'Segunda Revisión',
    validation_status_en_validacion: 'En Validación',
    validation_status_validado: 'Validado',
    validation_status_proximo_vencer: 'Próximo a Vencer',
    validation_status_vencido: 'Vencido',
    validation_status_por_revalidar: 'Por Revalidar',
    
    // Product Types
    product_type_producto_terminado: 'Producto Terminado',
    product_type_materia_prima: 'Materia Prima',
    product_type_material_empaque: 'Material de Empaque',
    product_type_granel: 'Granel',
    
    // Equipment Types
    equipment_type_hplc: 'HPLC',
    equipment_type_gc: 'GC',
    equipment_type_uvvis: 'UV-VIS',
    equipment_type_nir: 'NIR',
    equipment_type_raman: 'RAMAN',
    equipment_type_ir: 'IR',
    equipment_type_aa: 'AA',
    equipment_type_karl_fischer: 'Karl Fischer',
    
    // Stats
    stats_validated: 'Validadas',
    stats_expiring: 'Por Vencer',
    stats_expired: 'Vencidas',
    stats_in_validation: 'En Validación',
    
    // Status
    status_success: 'Exitoso',
    status_failed: 'Fallido',
    status_warning: 'Advertencia',
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
    
    // Validations
    validations_title: 'Validations',
    validations_subtitle: 'Method and process validation management',
    validations_new: 'New Validation',
    validations_list: 'Validation List',
    validations_code: 'Validation Code',
    validations_product: 'Product',
    validations_type: 'Type',
    validations_equipment: 'Equipment',
    validations_status: 'Status',
    validations_issue_date: 'Issue Date',
    validations_expiry_date: 'Expiry Date',
    validations_search_by_code: 'Search by code',
    validations_filter_by_type: 'Filter by type',
    validations_filter_by_status: 'Filter by status',
    validations_completed: 'Completed',
    validations_next30days: 'Expiring soon (30 days)',
    validations_immediate: 'Immediate action required',
    validations_protocols: 'Protocols',
    validations_withDocumentation: 'With documentation',
    
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
    security_settings: 'Security Settings',
    security_settings_desc: 'Security settings and system policies',
    security_two_factor: 'Two-Factor Authentication',
    security_two_factor_desc: 'Enable 2FA for enhanced security',
    security_password_expiry: 'Password Expiry (days)',
    security_session_timeout: 'Session Timeout (minutes)',
    security_login_attempts: 'Maximum Login Attempts',
    security_audit_logging: 'Audit Logging',
    security_audit_logging_desc: 'Log all system actions',
    security_encryption: 'Data Encryption',
    security_encryption_desc: 'Encrypt sensitive data',
    security_audit_log: 'Audit Log',
    security_audit_log_desc: 'System action history',
    security_date_time: 'Date & Time',
    security_user: 'User',
    security_action: 'Action',
    security_resource: 'Resource',
    security_status: 'Status',
    security_ip_address: 'IP Address',
    security_download_audit: 'Download Audit',
    security_view_audit_pdf: 'View Audit PDF',
    security_password_change: 'Change Password',
    security_password_reset: 'Reset Password',
    security_setting_updated: 'Setting updated',
    security_setting_updated_desc: 'Security setting has been updated',
    
    // Settings
    settings_title: 'Settings',
    settings_subtitle: 'General system configuration',
    
    // Roles
    roles_super_administrador: 'Super Administrator',
    roles_administrador: 'Administrator',
    roles_coordinador: 'Coordinator',
    roles_analista: 'Analyst',
    roles_visualizador: 'Viewer',
    
    // Validation Types
    validation_type_metodos_analiticos: 'Analytical Methods',
    validation_type_procesos: 'Processes',
    validation_type_limpieza: 'Cleaning',
    validation_type_sistemas_computarizados: 'Computer Systems',
    
    // Validation Statuses
    validation_status_borrador: 'Draft',
    validation_status_primera_revision: 'First Review',
    validation_status_segunda_revision: 'Second Review',
    validation_status_en_validacion: 'In Validation',
    validation_status_validado: 'Validated',
    validation_status_proximo_vencer: 'Expiring Soon',
    validation_status_vencido: 'Expired',
    validation_status_por_revalidar: 'For Revalidation',
    
    // Product Types
    product_type_producto_terminado: 'Finished Product',
    product_type_materia_prima: 'Raw Material',
    product_type_material_empaque: 'Packaging Material',
    product_type_granel: 'Bulk',
    
    // Equipment Types
    equipment_type_hplc: 'HPLC',
    equipment_type_gc: 'GC',
    equipment_type_uvvis: 'UV-VIS',
    equipment_type_nir: 'NIR',
    equipment_type_raman: 'RAMAN',
    equipment_type_ir: 'IR',
    equipment_type_aa: 'AA',
    equipment_type_karl_fischer: 'Karl Fischer',
    
    // Stats
    stats_validated: 'Validated',
    stats_expiring: 'Expiring',
    stats_expired: 'Expired',
    stats_in_validation: 'In Validation',
    
    // Status
    status_success: 'Success',
    status_failed: 'Failed',
    status_warning: 'Warning',
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
    
    // Validations
    validations_title: 'Validações',
    validations_subtitle: 'Gestão de validações de métodos e processos',
    validations_new: 'Nova Validação',
    validations_list: 'Lista de Validações',
    validations_code: 'Código de Validação',
    validations_product: 'Produto',
    validations_type: 'Tipo',
    validations_equipment: 'Equipamento',
    validations_status: 'Status',
    validations_issue_date: 'Data de Emissão',
    validations_expiry_date: 'Data de Vencimento',
    validations_search_by_code: 'Pesquisar por código',
    validations_filter_by_type: 'Filtrar por tipo',
    validations_filter_by_status: 'Filtrar por status',
    validations_completed: 'Completadas',
    validations_next30days: 'Vencendo em breve (30 dias)',
    validations_immediate: 'Ação imediata necessária',
    validations_protocols: 'Protocolos',
    validations_withDocumentation: 'Com documentação',
    
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
    security_settings: 'Configurações de Segurança',
    security_settings_desc: 'Configurações de segurança e políticas do sistema',
    security_two_factor: 'Autenticação de Dois Fatores',
    security_two_factor_desc: 'Habilizar 2FA para maior segurança',
    security_password_expiry: 'Expiração da Senha (dias)',
    security_session_timeout: 'Tempo de Sessão (minutos)',
    security_login_attempts: 'Tentativas Máximas de Login',
    security_audit_logging: 'Registro de Auditoria',
    security_audit_logging_desc: 'Registrar todas as ações do sistema',
    security_encryption: 'Criptografia de Dados',
    security_encryption_desc: 'Criptografar dados sensíveis',
    security_audit_log: 'Registro de Auditoria',
    security_audit_log_desc: 'Histórico de ações do sistema',
    security_date_time: 'Data e Hora',
    security_user: 'Usuário',
    security_action: 'Ação',
    security_resource: 'Recurso',
    security_status: 'Status',
    security_ip_address: 'Endereço IP',
    security_download_audit: 'Baixar Auditoria',
    security_view_audit_pdf: 'Ver Auditoria PDF',
    security_password_change: 'Alterar Senha',
    security_password_reset: 'Redefinir Senha',
    security_setting_updated: 'Configuração atualizada',
    security_setting_updated_desc: 'A configuração de segurança foi atualizada',
    
    // Settings
    settings_title: 'Configurações',
    settings_subtitle: 'Configuração geral do sistema',
    
    // Roles
    roles_super_administrador: 'Super Administrador',
    roles_administrador: 'Administrador',
    roles_coordinador: 'Coordenador',
    roles_analista: 'Analista',
    roles_visualizador: 'Visualizador',
    
    // Validation Types
    validation_type_metodos_analiticos: 'Métodos Analíticos',
    validation_type_procesos: 'Processos',
    validation_type_limpieza: 'Limpeza',
    validation_type_sistemas_computarizados: 'Sistemas Computadorizados',
    
    // Validation Statuses
    validation_status_borrador: 'Rascunho',
    validation_status_primera_revision: 'Primeira Revisão',
    validation_status_segunda_revision: 'Segunda Revisão',
    validation_status_en_validacion: 'Em Validação',
    validation_status_validado: 'Validado',
    validation_status_proximo_vencer: 'Vencendo em Breve',
    validation_status_vencido: 'Vencido',
    validation_status_por_revalidar: 'Para Revalidação',
    
    // Product Types
    product_type_producto_terminado: 'Produto Acabado',
    product_type_materia_prima: 'Matéria-Prima',
    product_type_material_empaque: 'Material de Embalagem',
    product_type_granel: 'Granel',
    
    // Equipment Types
    equipment_type_hplc: 'HPLC',
    equipment_type_gc: 'GC',
    equipment_type_uvvis: 'UV-VIS',
    equipment_type_nir: 'NIR',
    equipment_type_raman: 'RAMAN',
    equipment_type_ir: 'IR',
    equipment_type_aa: 'AA',
    equipment_type_karl_fischer: 'Karl Fischer',
    
    // Stats
    stats_validated: 'Validadas',
    stats_expiring: 'Vencendo',
    stats_expired: 'Vencidas',
    stats_in_validation: 'Em Validação',
    
    // Status
    status_success: 'Sucesso',
    status_failed: 'Falhou',
    status_warning: 'Aviso',
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
