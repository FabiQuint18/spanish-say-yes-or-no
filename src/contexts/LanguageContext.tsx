import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types/validation';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  es: {
    // Sistema
    system_title: 'Sistema de Validaciones',
    system_subtitle: 'Gestión y seguimiento de validaciones farmacéuticas',
    
    // Login
    login_title: 'Iniciar Sesión',
    login_email: 'Correo Electrónico',
    login_password: 'Contraseña',
    login_button: 'Ingresar',
    login_loading: 'Cargando...',
    login_success: 'Acceso exitoso',
    login_welcome: 'Bienvenido al sistema',
    login_error: 'Error de acceso',
    login_logout: 'Cerrar Sesión',
    login_logoutSuccess: 'Sesión cerrada exitosamente',
    
    // Menú
    menu_dashboard: 'Panel Principal',
    menu_validations: 'Validaciones',
    menu_products: 'Productos',
    menu_equipments: 'Equipos',
    menu_users: 'Usuarios',
    menu_security: 'Seguridad',
    menu_settings: 'Configuración',
    
    // Validaciones
    validations_subtitle: 'Gestión de validaciones de procesos y métodos analíticos',
    validations_new: 'Nueva Validación',
    validations_list: 'Lista de Validaciones',
    validations_manage: 'Gestionar validaciones del sistema',
    validations_validation_code: 'Código de Validación',
    validations_product_raw_material: 'Producto/Materia Prima',
    validations_product_raw_material_code: 'Código Producto/MP',
    validations_validation_type: 'Tipo de Validación',
    validations_subcategory: 'Subcategoría',
    validations_equipment: 'Equipo',
    validations_status: 'Estado',
    validations_expiry_date: 'Fecha de Vencimiento',
    validations_files: 'Archivos',
    validations_actions: 'Acciones',
    validations_search: 'Buscar validaciones...',
    validations_no_results: 'No se encontraron resultados',
    validations_no_validations: 'No hay validaciones disponibles',
    validations_completed: 'validaciones completadas',
    validations_next30days: 'próximas a vencer en 30 días',
    validations_immediate: 'requieren atención inmediata',
    validations_withDocumentation: 'con documentación',
    validations_protocols: 'Protocolos',
    validations_manufacturing: 'Fabricación',
    validations_packaging: 'Empaque',
    validations_assay: 'Valoración',
    validations_dissolution: 'Disolución',
    validations_impurities: 'Impurezas',
    validations_uniformity: 'Uniformidad de Unidades de Dosificación',
    validations_identification: 'Identificación',
    validations_traces: 'Trazas',
    validations_not_applicable: 'No Aplica',
    
    // Estados
    status_validado: 'Validado',
    status_proximo: 'Próximo a Vencer',
    status_vencido: 'Vencido',
    status_revalidacion: 'En Revalidación',
    status_en_validacion: 'En Validación',
    status_por_revalidar: 'Por Revalidar',
    status_primera_revision: 'Primera Revisión',
    status_segunda_revision: 'Segunda Revisión',
    status_success: 'Exitoso',
    status_failed: 'Fallido',
    status_warning: 'Advertencia',
    
    // Estadísticas
    stats_validated: 'Validados',
    stats_expiring: 'Por Vencer',
    stats_expired: 'Vencidos',
    
    // Usuarios
    users_subtitle: 'Administración de usuarios del sistema',
    users_new: 'Nuevo Usuario',
    users_list: 'Lista de Usuarios',
    users_manage: 'Gestionar usuarios y permisos',
    users_name: 'Nombre',
    users_email: 'Correo Electrónico',
    users_role: 'Rol',
    users_password: 'Contraseña',
    users_password_requirements: 'Mínimo 7 caracteres, 1 mayúscula, 1 símbolo especial',
    users_password_invalid: 'La contraseña no cumple los requisitos',
    users_create_password: 'El usuario recibirá un correo para crear su contraseña',
    
    // Roles
    roles_administrador: 'Administrador',
    roles_coordinador: 'Coordinador',
    roles_analista: 'Analista',  
    roles_visualizador: 'Visualizador',
    roles_administrator: 'Administrador',
    roles_coordinator: 'Coordinador',
    roles_analyst: 'Analista',
    roles_viewer: 'Visualizador',
    
    // Tipos de Material
    material_types_finished_product: 'Producto Terminado',
    material_types_raw_material: 'Materia Prima',
    material_types_packaging_material: 'Material de Empaque',
    material_types_bulk: 'Granel',
    
    // Seguridad
    security_title: 'Seguridad',
    security_subtitle: 'Configuración de seguridad y auditoría del sistema',
    security_settings: 'Configuración de Seguridad',
    security_settings_desc: 'Configurar parámetros de seguridad del sistema',
    security_permissions: 'Permisos',
    security_permissions_desc: 'Gestionar permisos por módulo',
    security_audit_log: 'Registro de Auditoría',
    security_audit_log_desc: 'Historial de actividades del sistema',
    security_date_time: 'Fecha y Hora',
    security_user: 'Usuario',
    security_action: 'Acción',
    security_resource: 'Recurso',
    security_status: 'Estado',
    security_ip_address: 'Dirección IP',
    security_two_factor: 'Autenticación de Dos Factores',
    security_two_factor_desc: 'Habilitar 2FA para mayor seguridad',
    security_password_expiry: 'Expiración de Contraseña (días)',
    security_session_timeout: 'Tiempo de Expiración de Sesión (minutos)',
    security_login_attempts: 'Intentos de Login Máximos',
    security_audit_logging: 'Registro de Auditoría',  
    security_audit_logging_desc: 'Registrar todas las actividades del sistema',
    security_encryption: 'Cifrado de Datos',
    security_encryption_desc: 'Cifrar datos sensibles',
    security_access_restricted: 'Acceso Restringido',
    security_no_permissions: 'No tienes permisos para acceder a este módulo',
    security_new_user: 'Nuevo Usuario',
    security_add_new_user: 'Agregar Nuevo Usuario',
    security_full_name: 'Nombre Completo',
    security_enter_name: 'Ingrese el nombre completo',
    security_email: 'Correo Electrónico',
    security_enter_email: 'Ingrese el correo electrónico',
    security_role: 'Rol',
    security_password: 'Contraseña',
    security_enter_password: 'Ingrese la contraseña',
    security_permission_updated: 'Permiso Actualizado',
    security_permission_updated_desc: 'El permiso ha sido actualizado exitosamente',
    security_setting_updated: 'Configuración Actualizada',
    security_setting_updated_desc: 'La configuración ha sido actualizada exitosamente',
    security_user_created: 'Usuario Creado',
    security_created_successfully: 'creado exitosamente',
    security_password_reset: 'Restablecer Contraseña',
    security_password_change: 'Cambiar Contraseña',
    security_download_audit: 'Descargar Auditoría',
    security_view_audit_pdf: 'Ver Auditoría PDF',
    
    // Permisos
    permissions_create_validations: 'Crear Validaciones',
    permissions_create_validations_desc: 'Permite crear nuevas validaciones',
    permissions_edit_validations: 'Editar Validaciones',
    permissions_edit_validations_desc: 'Permite modificar validaciones existentes',
    permissions_manage_users: 'Gestionar Usuarios',
    permissions_manage_users_desc: 'Permite administrar usuarios del sistema',
    permissions_export_reports: 'Exportar Reportes',
    permissions_export_reports_desc: 'Permite exportar reportes y datos',
    
    // Dashboard
    dashboard_access_restricted: 'Acceso Restringido',
    dashboard_contact_administrator: 'Contacte al administrador para obtener acceso',
    
    // Filtros
    filters_all: 'Todos',
    filters_search_by_code: 'Buscar por código...',
    filters_search_by_product: 'Buscar por producto...',
    filters_validation_type: 'Tipo de Validación',
    filters_subcategory: 'Subcategoría',
    filters_equipment: 'Equipo',
    filters_status: 'Estado',
    filters_clear: 'Limpiar Filtros',
    
    // Común
    common_save: 'Guardar',
    common_cancel: 'Cancelar',
    common_edit: 'Editar',
    common_delete: 'Eliminar',
    common_all: 'Todos',
  },
  en: {
    // Sistema
    system_title: 'Validation System',
    system_subtitle: 'Management and tracking of pharmaceutical validations',
    
    // Login
    login_title: 'Sign In',
    login_email: 'Email',
    login_password: 'Password',
    login_button: 'Sign In',
    login_loading: 'Loading...',
    login_success: 'Access successful',
    login_welcome: 'Welcome to the system',
    login_error: 'Access error',
    login_logout: 'Sign Out',
    login_logoutSuccess: 'Session closed successfully',
    
    // Menu
    menu_dashboard: 'Dashboard',
    menu_validations: 'Validations',
    menu_products: 'Products',
    menu_equipments: 'Equipment',
    menu_users: 'Users',
    menu_security: 'Security',
    menu_settings: 'Settings',
    
    // Validations
    validations_subtitle: 'Management of process and analytical method validations',
    validations_new: 'New Validation',
    validations_list: 'Validation List',
    validations_manage: 'Manage system validations',
    validations_validation_code: 'Validation Code',
    validations_product_raw_material: 'Product/Raw Material',
    validations_product_raw_material_code: 'Product/RM Code',
    validations_validation_type: 'Validation Type',
    validations_subcategory: 'Subcategory',
    validations_equipment: 'Equipment',
    validations_status: 'Status',
    validations_expiry_date: 'Expiry Date',
    validations_files: 'Files',
    validations_actions: 'Actions',
    validations_search: 'Search validations...',
    validations_no_results: 'No results found',
    validations_no_validations: 'No validations available',
    validations_completed: 'completed validations',
    validations_next30days: 'expiring in next 30 days',
    validations_immediate: 'require immediate attention',
    validations_withDocumentation: 'with documentation',
    validations_protocols: 'Protocols',
    validations_manufacturing: 'Manufacturing',
    validations_packaging: 'Packaging',
    validations_assay: 'Assay',
    validations_dissolution: 'Dissolution',
    validations_impurities: 'Impurities',
    validations_uniformity: 'Uniformity of Dosage Units',
    validations_identification: 'Identification',
    validations_traces: 'Traces',
    validations_not_applicable: 'Not Applicable',
    
    // Status
    status_validado: 'Validated',
    status_proximo: 'Expiring Soon',
    status_vencido: 'Expired',
    status_revalidacion: 'In Revalidation',
    status_en_validacion: 'In Validation',
    status_por_revalidar: 'To Revalidate',
    status_primera_revision: 'First Review',
    status_segunda_revision: 'Second Review',
    status_success: 'Success',
    status_failed: 'Failed',
    status_warning: 'Warning',
    
    // Statistics
    stats_validated: 'Validated',
    stats_expiring: 'Expiring',
    stats_expired: 'Expired',
    
    // Users
    users_subtitle: 'System user administration',
    users_new: 'New User',
    users_list: 'User List',
    users_manage: 'Manage users and permissions',
    users_name: 'Name',
    users_email: 'Email',
    users_role: 'Role',
    users_password: 'Password',
    users_password_requirements: 'Minimum 7 characters, 1 uppercase, 1 special symbol',
    users_password_invalid: 'Password does not meet requirements',
    users_create_password: 'User will receive an email to create their password',
    
    // Roles
    roles_administrador: 'Administrator',
    roles_coordinador: 'Coordinator',
    roles_analista: 'Analyst',
    roles_visualizador: 'Viewer',
    roles_administrator: 'Administrator',
    roles_coordinator: 'Coordinator',
    roles_analyst: 'Analyst',
    roles_viewer: 'Viewer',
    
    // Material Types
    material_types_finished_product: 'Finished Product',
    material_types_raw_material: 'Raw Material',
    material_types_packaging_material: 'Packaging Material',
    material_types_bulk: 'Bulk',
    
    // Security
    security_title: 'Security',
    security_subtitle: 'System security and audit configuration',
    security_settings: 'Security Settings',
    security_settings_desc: 'Configure system security parameters',
    security_permissions: 'Permissions',
    security_permissions_desc: 'Manage permissions by module',
    security_audit_log: 'Audit Log',
    security_audit_log_desc: 'System activity history',
    security_date_time: 'Date and Time',
    security_user: 'User',
    security_action: 'Action',
    security_resource: 'Resource',
    security_status: 'Status',
    security_ip_address: 'IP Address',
    security_two_factor: 'Two-Factor Authentication',
    security_two_factor_desc: 'Enable 2FA for enhanced security',
    security_password_expiry: 'Password Expiry (days)',
    security_session_timeout: 'Session Timeout (minutes)',
    security_login_attempts: 'Maximum Login Attempts',
    security_audit_logging: 'audit logging',
    security_audit_logging_desc: 'Log all system activities',
    security_encryption: 'Data Encryption',
    security_encryption_desc: 'Encrypt sensitive data',
    security_access_restricted: 'Access Restricted',
    security_no_permissions: 'You do not have permissions to access this module',
    security_new_user: 'New User',
    security_add_new_user: 'Add New User',
    security_full_name: 'Full Name',
    security_enter_name: 'Enter full name',
    security_email: 'Email',
    security_enter_email: 'Enter email address',
    security_role: 'Role',
    security_password: 'Password',
    security_enter_password: 'Enter password',
    security_permission_updated: 'Permission Updated',
    security_permission_updated_desc: 'Permission has been updated successfully',
    security_setting_updated: 'Setting Updated',
    security_setting_updated_desc: 'Setting has been updated successfully',
    security_user_created: 'User Created',
    security_created_successfully: 'created successfully',
    security_password_reset: 'Reset Password',
    security_password_change: 'Change Password',
    security_download_audit: 'Download Audit',
    security_view_audit_pdf: 'View Audit PDF',
    
    // Permissions
    permissions_create_validations: 'Create Validations',
    permissions_create_validations_desc: 'Allows creating new validations',
    permissions_edit_validations: 'Edit Validations',
    permissions_edit_validations_desc: 'Allows modifying existing validations',
    permissions_manage_users: 'Manage Users',
    permissions_manage_users_desc: 'Allows managing system users',
    permissions_export_reports: 'Export Reports',
    permissions_export_reports_desc: 'Allows exporting reports and data',
    
    // Dashboard
    dashboard_access_restricted: 'Access Restricted',
    dashboard_contact_administrator: 'Contact administrator for access',
    
    // Filters
    filters_all: 'All',
    filters_search_by_code: 'Search by code...',
    filters_search_by_product: 'Search by product...',
    filters_validation_type: 'Validation Type',
    filters_subcategory: 'Subcategory',
    filters_equipment: 'Equipment',
    filters_status: 'Status',
    filters_clear: 'Clear Filters',
    
    // Common
    common_save: 'Save',
    common_cancel: 'Cancel',
    common_edit: 'Edit',
    common_delete: 'Delete',
    common_all: 'All',
  },
  pt: {
    // Sistema
    system_title: 'Sistema de Validações',
    system_subtitle: 'Gestão e acompanhamento de validações farmacêuticas',
    
    // Login
    login_title: 'Entrar',
    login_email: 'Email',
    login_password: 'Senha',
    login_button: 'Entrar',
    login_loading: 'Carregando...',
    login_success: 'Acesso bem-sucedido',
    login_welcome: 'Bem-vindo ao sistema',
    login_error: 'Erro de acesso',
    login_logout: 'Sair',
    login_logoutSuccess: 'Sessão encerrada com sucesso',
    
    // Menu
    menu_dashboard: 'Painel Principal',
    menu_validations: 'Validações',
    menu_products: 'Produtos',
    menu_equipments: 'Equipamentos',
    menu_users: 'Usuários',
    menu_security: 'Segurança',
    menu_settings: 'Configurações',
    
    // Validations
    validations_subtitle: 'Gestão de validações de processos e métodos analíticos',
    validations_new: 'Nova Validação',
    validations_list: 'Lista de Validações',
    validations_manage: 'Gerenciar validações do sistema',
    validations_validation_code: 'Código de Validação',
    validations_product_raw_material: 'Produto/Matéria Prima',
    validations_product_raw_material_code: 'Código Produto/MP',
    validations_validation_type: 'Tipo de Validação',
    validations_subcategory: 'Subcategoria',
    validations_equipment: 'Equipamento',
    validations_status: 'Status',
    validations_expiry_date: 'Data de Vencimento',
    validations_files: 'Arquivos',
    validations_actions: 'Ações',
    validations_search: 'Buscar validações...',
    validations_no_results: 'Nenhum resultado encontrado',
    validations_no_validations: 'Nenhuma validação disponível',
    validations_completed: 'validações concluídas',
    validations_next30days: 'vencendo nos próximos 30 dias',
    validations_immediate: 'requerem atenção imediata',
    validations_withDocumentation: 'com documentação',
    validations_protocols: 'Protocolos',
    validations_manufacturing: 'Fabricação',
    validations_packaging: 'Embalagem',
    validations_assay: 'Valoração',
    validations_dissolution: 'Dissolução',
    validations_impurities: 'Impurezas',
    validations_uniformity: 'Uniformidade de Unidades de Dosagem',
    validations_identification: 'Identificação',
    validations_traces: 'Traços',
    validations_not_applicable: 'Não Aplicável',
    
    // Status
    status_validado: 'Validado',
    status_proximo: 'Próximo ao Vencimento',
    status_vencido: 'Vencido',
    status_revalidacao: 'Em Revalidação',
    status_en_validacion: 'Em Validação',
    status_por_revalidar: 'Para Revalidar',
    status_primera_revision: 'Primeira Revisão',
    status_segunda_revision: 'Segunda Revisão',
    status_success: 'Sucesso',
    status_failed: 'Falhou',
    status_warning: 'Aviso',
    
    // Statistics
    stats_validated: 'Validados',
    stats_expiring: 'Vencendo',
    stats_expired: 'Vencidos',
    
    // Users
    users_subtitle: 'Administração de usuários do sistema',
    users_new: 'Novo Usuário',
    users_list: 'Lista de Usuários',
    users_manage: 'Gerenciar usuários e permissões',
    users_name: 'Nome',
    users_email: 'Email',
    users_role: 'Função',
    users_password: 'Senha',
    users_password_requirements: 'Mínimo 7 caracteres, 1 maiúscula, 1 símbolo especial',
    users_password_invalid: 'A senha não atende aos requisitos',
    users_create_password: 'O usuário receberá um email para criar sua senha',
    
    // Roles
    roles_administrador: 'Administrador',
    roles_coordinador: 'Coordenador',
    roles_analista: 'Analista',
    roles_visualizador: 'Visualizador',
    roles_administrator: 'Administrador',
    roles_coordinator: 'Coordenador',
    roles_analyst: 'Analista',
    roles_viewer: 'Visualizador',
    
    // Material Types
    material_types_finished_product: 'Produto Acabado',
    material_types_raw_material: 'Matéria Prima',
    material_types_packaging_material: 'Material de Embalagem',
    material_types_bulk: 'Granel',
    
    // Security
    security_title: 'Segurança',
    security_subtitle: 'Configuração de segurança e auditoria do sistema',
    security_settings: 'Configurações de Segurança',
    security_settings_desc: 'Configurar parâmetros de segurança do sistema',
    security_permissions: 'Permissões',
    security_permissions_desc: 'Gerenciar permissões por módulo',
    security_audit_log: 'Log de Auditoria',
    security_audit_log_desc: 'Histórico de atividades do sistema',
    security_date_time: 'Data e Hora',
    security_user: 'Usuário',
    security_action: 'Ação',
    security_resource: 'Recurso',
    security_status: 'Status',
    security_ip_address: 'Endereço IP',
    security_two_factor: 'Autenticação de Dois Fatores',
    security_two_factor_desc: 'Habilitar 2FA para maior segurança',
    security_password_expiry: 'Expiração da Senha (dias)',
    security_session_timeout: 'Timeout da Sessão (minutos)',
    security_login_attempts: 'Tentativas Máximas de Login',
    security_audit_logging: 'Log de Auditoria',
    security_audit_logging_desc: 'Registrar todas as atividades do sistema',
    security_encryption: 'Criptografia de Dados',
    security_encryption_desc: 'Criptografar dados sensíveis',
    security_access_restricted: 'Acesso Restrito',
    security_no_permissions: 'Você não tem permissões para acessar este módulo',
    security_new_user: 'Novo Usuário',
    security_add_new_user: 'Adicionar Novo Usuário',
    security_full_name: 'Nome Completo',
    security_enter_name: 'Digite o nome completo',
    security_email: 'Email',
    security_enter_email: 'Digite o endereço de email',
    security_role: 'Função',
    security_password: 'Senha',
    security_enter_password: 'Digite a senha',
    security_permission_updated: 'Permissão Atualizada',
    security_permission_updated_desc: 'A permissão foi atualizada com sucesso',
    security_setting_updated: 'Configuração Atualizada',
    security_setting_updated_desc: 'A configuração foi atualizada com sucesso',
    security_user_created: 'Usuário Criado',
    security_created_successfully: 'criado com sucesso',
    security_password_reset: 'Redefinir Senha',
    security_password_change: 'Alterar Senha',
    security_download_audit: 'Baixar Auditoria',
    security_view_audit_pdf: 'Ver Auditoria PDF',
    
    // Permissions
    permissions_create_validations: 'Criar Validações',
    permissions_create_validations_desc: 'Permite criar novas validações',
    permissions_edit_validations: 'Editar Validações',
    permissions_edit_validations_desc: 'Permite modificar validações existentes',
    permissions_manage_users: 'Gerenciar Usuários',
    permissions_manage_users_desc: 'Permite administrar usuários do sistema',
    permissions_export_reports: 'Exportar Relatórios',
    permissions_export_reports_desc: 'Permite exportar relatórios e dados',
    
    // Dashboard
    dashboard_access_restricted: 'Acesso Restrito',
    dashboard_contact_administrator: 'Entre em contato com o administrador para obter acesso',
    
    // Filtros
    filters_all: 'Todos',
    filters_search_by_code: 'Buscar por código...',
    filters_search_by_product: 'Buscar por produto...',
    filters_validation_type: 'Tipo de Validação',
    filters_subcategory: 'Subcategoria',
    filters_equipment: 'Equipamento',
    filters_status: 'Status',
    filters_clear: 'Limpar Filtros',
    
    // Common
    common_save: 'Salvar',
    common_cancel: 'Cancelar',
    common_edit: 'Excluir',
    common_delete: 'Todos',
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  return useContext(LanguageContext);
};

export { LanguageProvider, useLanguage };
