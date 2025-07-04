
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types/validation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Sistema
    system_title: 'Sistema de Validaciones',
    system_subtitle: 'Control de Calidad Farmacéutica',
    
    // Login
    login_title: 'Iniciar Sesión',
    login_email: 'Correo Electrónico',
    login_password: 'Contraseña',
    login_button: 'Iniciar Sesión',
    login_loading: 'Ingresando...',
    login_success: 'Inicio de sesión exitoso',
    login_error: 'Error al iniciar sesión',
    login_welcome: 'Bienvenido al sistema',
    login_logout: 'Cerrar Sesión',
    login_logoutSuccess: 'Sesión cerrada exitosamente',
    
    // Menú
    menu_dashboard: 'Dashboard',
    menu_validations: 'Validaciones',
    menu_products: 'Productos',
    menu_equipments: 'Equipos',
    menu_users: 'Usuarios',
    menu_security: 'Seguridad',
    menu_settings: 'Configuración',
    
    // Dashboard
    dashboard_title: 'Dashboard',
    dashboard_subtitle: 'Panel de Control del Sistema',
    dashboard_total_validations: 'Total Validaciones',
    dashboard_pending_validations: 'Validaciones Pendientes',
    dashboard_completed_validations: 'Validaciones Completadas',
    dashboard_expired_validations: 'Validaciones Vencidas',
    dashboard_recent_validations: 'Validaciones Recientes',
    dashboard_validation_trends: 'Tendencias de Validación',
    dashboard_filter_by_type: 'Filtrar por Tipo',
    dashboard_all_types: 'Todos los Tipos',
    
    // Validaciones
    validations_title: 'Validaciones',
    validations_subtitle: 'Gestión de Validaciones de Procesos',
    validations_new: 'Nueva Validación',
    validations_list: 'Lista de Validaciones',
    validations_search: 'Buscar validaciones',
    validations_search_by_code: 'Buscar por código',
    validations_all: 'Todas',
    validations_pending: 'Pendientes',
    validations_in_progress: 'En Progreso',
    validations_completed: 'Completadas',
    validations_expired: 'Vencidas',
    validations_filter_status: 'Filtrar por Estado',
    validations_filter_type: 'Filtrar por Tipo',
    validations_filter_equipment: 'Filtrar por Equipo',
    validations_filter_user: 'Filtrar por Usuario',
    validations_process: 'Proceso',
    validations_cleaning: 'Limpieza',
    validations_analytical: 'Analítico',
    validations_computer: 'Sistema Informático',
    
    // Productos
    products_title: 'Productos',
    products_subtitle: 'Gestión de Productos',
    products_add_product: 'Agregar Producto',
    products_finished_products: 'Productos Terminados',
    products_raw_materials: 'Materias Primas',
    products_packaging_materials: 'Materiales de Empaque',
    products_increase_last_month: '+20.1% del mes pasado',
    products_product_list: 'Lista de Productos',
    products_registered_products: 'Productos registrados en el sistema',
    products_module_in_development: 'Módulo de productos en desarrollo',
    products_add_new_product: 'Agregar Nuevo Producto',
    products_product_code: 'Código del Producto',
    products_product_name: 'Nombre del Producto',
    products_product_type: 'Tipo de Producto',
    products_description: 'Descripción',
    products_product_description: 'Descripción del producto',
    products_select_type: 'Seleccionar tipo',
    products_finished_product: 'Producto Terminado',
    products_raw_material: 'Materia Prima',
    products_packaging_material: 'Material de Empaque',
    products_created: 'Producto Creado',
    products_product: 'Producto',
    products_added_successfully: 'agregado exitosamente',
    
    // Equipos
    equipments_title: 'Equipos',
    equipments_subtitle: 'Gestión de Equipos Analíticos',
    equipments_add: 'Agregar Equipo',
    equipments_list: 'Lista de Equipos',
    
    // Usuarios
    users_title: 'Usuarios',
    users_subtitle: 'Gestión de Usuarios del Sistema',
    users_new: 'Nuevo Usuario',
    users_list: 'Lista de Usuarios',
    users_manage: 'Gestionar usuarios del sistema',
    users_name: 'Nombre Completo',
    users_email: 'Correo Electrónico',
    users_role: 'Rol',
    users_create_password: 'El usuario deberá crear su contraseña al ingresar por primera vez',
    users_password_requirements: 'La contraseña debe tener al menos 7 caracteres, 1 mayúscula y 1 símbolo especial (*,+,etc)',
    users_create_local_password: 'Crear Contraseña',
    users_password: 'Contraseña',
    users_confirm_password: 'Confirmar Contraseña',
    users_password_mismatch: 'Las contraseñas no coinciden',
    users_password_weak: 'La contraseña no cumple los requisitos mínimos',
    users_created_successfully: 'Usuario creado exitosamente',
    
    // Roles
    roles_administrador: 'Administrador',
    roles_coordinador: 'Coordinador',
    roles_analista: 'Analista',
    roles_visualizador: 'Visualizador',
    
    // Seguridad
    security_title: 'Seguridad',
    security_subtitle: 'Configuración de Seguridad del Sistema',
    security_password_change: 'Cambio de Contraseña',
    security_audit_trail: 'Registro de Auditoría',
    security_access_control: 'Control de Acceso',
    security_session_management: 'Gestión de Sesiones',
    security_download_audit: 'Descargar Auditoría',
    security_view_audit_pdf: 'Ver Auditoría PDF',
    security_change_password: 'Cambiar Contraseña',
    security_forgot_password: 'Recuperar Contraseña',
    security_current_password: 'Contraseña Actual',
    security_new_password: 'Nueva Contraseña',
    security_confirm_new_password: 'Confirmar Nueva Contraseña',
    security_password_changed: 'Contraseña cambiada exitosamente',
    security_audit_downloaded: 'Registro de auditoría descargado',
    
    // Configuración
    settings_title: 'Configuración',
    settings_subtitle: 'Configuración del Sistema',
    settings_company_info: 'Información de la Empresa',
    settings_system_config: 'Configuración del Sistema',
    settings_backup_config: 'Configuración de Respaldo',
    settings_save: 'Guardar Configuración',
    settings_export: 'Exportar Configuración',
    settings_import: 'Importar Configuración',
    settings_backup_enabled: 'Respaldo Automático Habilitado',
    settings_backup_frequency: 'Frecuencia de Respaldo',
    settings_backup_location: 'Ubicación de Respaldo',
    settings_backup_retention: 'Retención de Respaldos',
    settings_backup_now: 'Respaldar Ahora',
    settings_download_backup: 'Descargar Respaldo',
    settings_restore_backup: 'Restaurar Respaldo',
    settings_backup_created: 'Respaldo creado exitosamente',
    settings_backup_downloaded: 'Respaldo descargado exitosamente',
    
    // Común
    common_save: 'Guardar',
    common_cancel: 'Cancelar',
    common_edit: 'Editar',
    common_delete: 'Eliminar',
    common_search: 'Buscar',
    common_filter: 'Filtrar',
    common_export: 'Exportar',
    common_import: 'Importar',
    common_download: 'Descargar',
    common_upload: 'Subir',
    common_view: 'Ver',
    common_close: 'Cerrar',
    common_confirm: 'Confirmar',
    common_loading: 'Cargando...',
    common_error: 'Error',
    common_success: 'Éxito',
    common_warning: 'Advertencia',
    common_info: 'Información',
    common_yes: 'Sí',
    common_no: 'No',
    common_all: 'Todos',
  },
  en: {
    // Sistema
    system_title: 'Validation System',
    system_subtitle: 'Pharmaceutical Quality Control',
    
    // Login
    login_title: 'Sign In',
    login_email: 'Email',
    login_password: 'Password',
    login_button: 'Sign In',
    login_loading: 'Signing in...',
    login_success: 'Sign in successful',
    login_error: 'Sign in error',
    login_welcome: 'Welcome to the system',
    login_logout: 'Sign Out',
    login_logoutSuccess: 'Signed out successfully',
    
    // Menú
    menu_dashboard: 'Dashboard',
    menu_validations: 'Validations',
    menu_products: 'Products',
    menu_equipments: 'Equipment',
    menu_users: 'Users',
    menu_security: 'Security',
    menu_settings: 'Settings',
    
    // Dashboard
    dashboard_title: 'Dashboard',
    dashboard_subtitle: 'System Control Panel',
    dashboard_total_validations: 'Total Validations',
    dashboard_pending_validations: 'Pending Validations',
    dashboard_completed_validations: 'Completed Validations',
    dashboard_expired_validations: 'Expired Validations',
    dashboard_recent_validations: 'Recent Validations',
    dashboard_validation_trends: 'Validation Trends',
    dashboard_filter_by_type: 'Filter by Type',
    dashboard_all_types: 'All Types',
    
    // Validaciones
    validations_title: 'Validations',
    validations_subtitle: 'Process Validation Management',
    validations_new: 'New Validation',
    validations_list: 'Validation List',
    validations_search: 'Search validations',
    validations_search_by_code: 'Search by code',
    validations_all: 'All',
    validations_pending: 'Pending',
    validations_in_progress: 'In Progress',
    validations_completed: 'Completed',
    validations_expired: 'Expired',
    validations_filter_status: 'Filter by Status',
    validations_filter_type: 'Filter by Type',
    validations_filter_equipment: 'Filter by Equipment',
    validations_filter_user: 'Filter by User',
    validations_process: 'Process',
    validations_cleaning: 'Cleaning',
    validations_analytical: 'Analytical',
    validations_computer: 'Computer System',
    
    // Productos
    products_title: 'Products',
    products_subtitle: 'Product Management',
    products_add_product: 'Add Product',
    products_finished_products: 'Finished Products',
    products_raw_materials: 'Raw Materials',
    products_packaging_materials: 'Packaging Materials',
    products_increase_last_month: '+20.1% from last month',
    products_product_list: 'Product List',
    products_registered_products: 'Products registered in the system',
    products_module_in_development: 'Product module in development',
    products_add_new_product: 'Add New Product',
    products_product_code: 'Product Code',
    products_product_name: 'Product Name',
    products_product_type: 'Product Type',
    products_description: 'Description',
    products_product_description: 'Product description',
    products_select_type: 'Select type',
    products_finished_product: 'Finished Product',
    products_raw_material: 'Raw Material',
    products_packaging_material: 'Packaging Material',
    products_created: 'Product Created',
    products_product: 'Product',
    products_added_successfully: 'added successfully',
    
    // Equipos
    equipments_title: 'Equipment',
    equipments_subtitle: 'Analytical Equipment Management',
    equipments_add: 'Add Equipment',
    equipments_list: 'Equipment List',
    
    // Usuarios
    users_title: 'Users',
    users_subtitle: 'System User Management',
    users_new: 'New User',
    users_list: 'User List',
    users_manage: 'Manage system users',
    users_name: 'Full Name',
    users_email: 'Email',
    users_role: 'Role',
    users_create_password: 'User must create password on first login',
    users_password_requirements: 'Password must have at least 7 characters, 1 uppercase and 1 special symbol (*,+,etc)',
    users_create_local_password: 'Create Password',
    users_password: 'Password',
    users_confirm_password: 'Confirm Password',
    users_password_mismatch: 'Passwords do not match',
    users_password_weak: 'Password does not meet minimum requirements',
    users_created_successfully: 'User created successfully',
    
    // Roles
    roles_administrador: 'Administrator',
    roles_coordinador: 'Coordinator',
    roles_analista: 'Analyst',
    roles_visualizador: 'Viewer',
    
    // Seguridad
    security_title: 'Security',
    security_subtitle: 'System Security Configuration',
    security_password_change: 'Password Change',
    security_audit_trail: 'Audit Trail',
    security_access_control: 'Access Control',
    security_session_management: 'Session Management',
    security_download_audit: 'Download Audit',
    security_view_audit_pdf: 'View Audit PDF',
    security_change_password: 'Change Password',
    security_forgot_password: 'Forgot Password',
    security_current_password: 'Current Password',
    security_new_password: 'New Password',
    security_confirm_new_password: 'Confirm New Password',
    security_password_changed: 'Password changed successfully',
    security_audit_downloaded: 'Audit trail downloaded',
    
    // Configuración
    settings_title: 'Settings',
    settings_subtitle: 'System Settings',
    settings_company_info: 'Company Information',
    settings_system_config: 'System Configuration',
    settings_backup_config: 'Backup Configuration',
    settings_save: 'Save Settings',
    settings_export: 'Export Settings',
    settings_import: 'Import Settings',
    settings_backup_enabled: 'Automatic Backup Enabled',
    settings_backup_frequency: 'Backup Frequency',
    settings_backup_location: 'Backup Location',
    settings_backup_retention: 'Backup Retention',
    settings_backup_now: 'Backup Now',
    settings_download_backup: 'Download Backup',
    settings_restore_backup: 'Restore Backup',
    settings_backup_created: 'Backup created successfully',
    settings_backup_downloaded: 'Backup downloaded successfully',
    
    // Común
    common_save: 'Save',
    common_cancel: 'Cancel',
    common_edit: 'Edit',
    common_delete: 'Delete',
    common_search: 'Search',
    common_filter: 'Filter',
    common_export: 'Export',
    common_import: 'Import',
    common_download: 'Download',
    common_upload: 'Upload',
    common_view: 'View',
    common_close: 'Close',
    common_confirm: 'Confirm',
    common_loading: 'Loading...',
    common_error: 'Error',
    common_success: 'Success',
    common_warning: 'Warning',
    common_info: 'Information',
    common_yes: 'Yes',
    common_no: 'No',
    common_all: 'All',
  },
  pt: {
    // Sistema
    system_title: 'Sistema de Validações',
    system_subtitle: 'Controle de Qualidade Farmacêutica',
    
    // Login
    login_title: 'Entrar',
    login_email: 'Email',
    login_password: 'Senha',
    login_button: 'Entrar',
    login_loading: 'Entrando...',
    login_success: 'Login realizado com sucesso',
    login_error: 'Erro no login',
    login_welcome: 'Bem-vindo ao sistema',
    login_logout: 'Sair',
    login_logoutSuccess: 'Logout realizado com sucesso',
    
    // Menú
    menu_dashboard: 'Dashboard',
    menu_validations: 'Validações',
    menu_products: 'Produtos',
    menu_equipments: 'Equipamentos',
    menu_users: 'Usuários',
    menu_security: 'Segurança',
    menu_settings: 'Configurações',
    
    // Dashboard
    dashboard_title: 'Dashboard',
    dashboard_subtitle: 'Painel de Controle do Sistema',
    dashboard_total_validations: 'Total de Validações',
    dashboard_pending_validations: 'Validações Pendentes',
    dashboard_completed_validations: 'Validações Concluídas',
    dashboard_expired_validations: 'Validações Vencidas',
    dashboard_recent_validations: 'Validações Recentes',
    dashboard_validation_trends: 'Tendências de Validação',
    dashboard_filter_by_type: 'Filtrar por Tipo',
    dashboard_all_types: 'Todos os Tipos',
    
    // Validaciones
    validations_title: 'Validações',
    validations_subtitle: 'Gestão de Validações de Processos',
    validations_new: 'Nova Validação',
    validations_list: 'Lista de Validações',
    validations_search: 'Buscar validações',
    validations_search_by_code: 'Buscar por código',
    validations_all: 'Todas',
    validations_pending: 'Pendentes',
    validations_in_progress: 'Em Progresso',
    validations_completed: 'Concluídas',
    validations_expired: 'Vencidas',
    validations_filter_status: 'Filtrar por Status',
    validations_filter_type: 'Filtrar por Tipo',
    validations_filter_equipment: 'Filtrar por Equipamento',
    validations_filter_user: 'Filtrar por Usuário',
    validations_process: 'Processo',
    validations_cleaning: 'Limpeza',
    validations_analytical: 'Analítico',
    validations_computer: 'Sistema Computacional',
    
    // Produtos
    products_title: 'Produtos',
    products_subtitle: 'Gestão de Produtos',
    products_add_product: 'Adicionar Produto',
    products_finished_products: 'Produtos Acabados',
    products_raw_materials: 'Matérias-Primas',
    products_packaging_materials: 'Materiais de Embalagem',
    products_increase_last_month: '+20.1% do mês passado',
    products_product_list: 'Lista de Produtos',
    products_registered_products: 'Produtos registrados no sistema',
    products_module_in_development: 'Módulo de produtos em desenvolvimento',
    products_add_new_product: 'Adicionar Novo Produto',
    products_product_code: 'Código do Produto',
    products_product_name: 'Nome do Produto',
    products_product_type: 'Tipo de Produto',
    products_description: 'Descrição',
    products_product_description: 'Descrição do produto',
    products_select_type: 'Selecionar tipo',
    products_finished_product: 'Produto Acabado',
    products_raw_material: 'Matéria-Prima',
    products_packaging_material: 'Material de Embalagem',
    products_created: 'Produto Criado',
    products_product: 'Produto',
    products_added_successfully: 'adicionado com sucesso',
    
    // Equipos
    equipments_title: 'Equipamentos',
    equipments_subtitle: 'Gestão de Equipamentos Analíticos',
    equipments_add: 'Adicionar Equipamento',
    equipments_list: 'Lista de Equipamentos',
    
    // Usuarios
    users_title: 'Usuários',
    users_subtitle: 'Gestão de Usuários do Sistema',
    users_new: 'Novo Usuário',
    users_list: 'Lista de Usuários',
    users_manage: 'Gerenciar usuários do sistema',
    users_name: 'Nome Completo',
    users_email: 'Email',
    users_role: 'Função',
    users_create_password: 'Usuário deve criar senha no primeiro login',
    users_password_requirements: 'A senha deve ter pelo menos 7 caracteres, 1 maiúscula e 1 símbolo especial (*,+,etc)',
    users_create_local_password: 'Criar Senha',
    users_password: 'Senha',
    users_confirm_password: 'Confirmar Senha',
    users_password_mismatch: 'As senhas não coincidem',
    users_password_weak: 'A senha não atende aos requisitos mínimos',
    users_created_successfully: 'Usuário criado com sucesso',
    
    // Roles
    roles_administrador: 'Administrador',
    roles_coordinador: 'Coordenador',
    roles_analista: 'Analista',
    roles_visualizador: 'Visualizador',
    
    // Segurança
    security_title: 'Segurança',
    security_subtitle: 'Configuração de Segurança do Sistema',
    security_password_change: 'Mudança de Senha',
    security_audit_trail: 'Trilha de Auditoria',
    security_access_control: 'Controle de Acesso',
    security_session_management: 'Gestão de Sessões',
    security_download_audit: 'Baixar Auditoria',
    security_view_audit_pdf: 'Ver Auditoria PDF',
    security_change_password: 'Alterar Senha',
    security_forgot_password: 'Esqueci a Senha',
    security_current_password: 'Senha Atual',
    security_new_password: 'Nova Senha',
    security_confirm_new_password: 'Confirmar Nova Senha',
    security_password_changed: 'Senha alterada com sucesso',
    security_audit_downloaded: 'Trilha de auditoria baixada',
    
    // Configuração
    settings_title: 'Configurações',
    settings_subtitle: 'Configurações do Sistema',
    settings_company_info: 'Informações da Empresa',
    settings_system_config: 'Configuração do Sistema',
    settings_backup_config: 'Configuração de Backup',
    settings_save: 'Salvar Configurações',
    settings_export: 'Exportar Configurações',
    settings_import: 'Importar Configurações',
    settings_backup_enabled: 'Backup Automático Habilitado',
    settings_backup_frequency: 'Frequência de Backup',
    settings_backup_location: 'Local do Backup',
    settings_backup_retention: 'Retenção de Backups',
    settings_backup_now: 'Fazer Backup Agora',
    settings_download_backup: 'Baixar Backup',
    settings_restore_backup: 'Restaurar Backup',
    settings_backup_created: 'Backup criado com sucesso',
    settings_backup_downloaded: 'Backup baixado com sucesso',
    
    // Comum
    common_save: 'Salvar',
    common_cancel: 'Cancelar',
    common_edit: 'Editar',
    common_delete: 'Excluir',
    common_search: 'Buscar',
    common_filter: 'Filtrar',
    common_export: 'Exportar',
    common_import: 'Importar',
    common_download: 'Baixar',
    common_upload: 'Enviar',
    common_view: 'Ver',
    common_close: 'Fechar',
    common_confirm: 'Confirmar',
    common_loading: 'Carregando...',
    common_error: 'Erro',
    common_success: 'Sucesso',
    common_warning: 'Aviso',
    common_info: 'Informação',
    common_yes: 'Sim',
    common_no: 'Não',
    common_all: 'Todos',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
