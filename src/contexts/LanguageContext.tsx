
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // System
    'system.title': 'Sistema de Validaciones',
    'system.subtitle': 'Gestión integral de validaciones farmacéuticas',
    
    // Login
    'login.title': 'Iniciar Sesión',
    'login.email': 'Correo Electrónico',
    'login.password': 'Contraseña',
    'login.button': 'Iniciar Sesión',
    'login.loading': 'Cargando...',
    'login.success': 'Inicio de sesión exitoso',
    'login.welcome': 'Bienvenido al sistema',
    'login.error': 'Error de autenticación',
    'login.logout': 'Sesión cerrada',
    'login.logoutSuccess': 'Has cerrado sesión exitosamente',
    
    // Menu
    'menu.dashboard': 'Panel Principal',
    'menu.validations': 'Validaciones',
    'menu.products': 'Productos',
    'menu.equipments': 'Equipos',
    'menu.users': 'Usuarios',
    'menu.security': 'Seguridad',
    'menu.settings': 'Configuraciones',
    'menu.reports': 'Reportes',
    
    // Dashboard
    'dashboard.subtitle': 'Resumen general del sistema de validaciones',
    'dashboard.access_restricted': 'Acceso Restringido',
    'dashboard.contact_administrator': 'Contacte al administrador para obtener permisos',
    
    // Stats
    'stats.validations': 'Validaciones',
    'stats.total_validations': 'Total de validaciones',
    'stats.products': 'Productos',
    'stats.registered_products': 'Productos registrados',
    'stats.expiring': 'Por Vencer',
    'stats.next_30_days': 'Próximos 30 días',
    'stats.efficiency': 'Eficiencia',
    'stats.validation_efficiency': 'Eficiencia de validación',
    'stats.validated': 'Validadas',
    'stats.expired': 'Vencidas',
    
    // Validations
    'validations.subtitle': 'Gestión de validaciones y protocolos',
    'validations.new': 'Nueva Validación',
    'validations.list': 'Lista de Validaciones',
    'validations.manage': 'Gestionar validaciones del sistema',
    'validations.search': 'Buscar validaciones...',
    'validations.validation_code': 'Código de Validación',
    'validations.material_type': 'Tipo de Material',
    'validations.material_code': 'Código de Material',
    'validations.validation_type': 'Tipo de Validación',
    'validations.subcategory': 'Subcategoría',
    'validations.equipment': 'Equipo',
    'validations.status': 'Estado',
    'validations.expiry_date': 'Fecha de Vencimiento',
    'validations.files': 'Archivos',
    'validations.actions': 'Acciones',
    'validations.completed': 'Completadas',
    'validations.next30days': 'Próximos 30 días',
    'validations.immediate': 'Atención inmediata',
    'validations.protocols': 'Protocolos',
    'validations.withDocumentation': 'Con documentación',
    'validations.no_results': 'No se encontraron resultados',
    'validations.no_validations': 'No hay validaciones registradas',
    'validations.product_raw_material': 'Producto/Materia Prima',
    'validations.product_raw_material_code': 'Código',
    'validations.manufacturing': 'Fabricación',
    'validations.packaging': 'Empaque',
    'validations.assay': 'Valoración',
    'validations.dissolution': 'Disolución',
    'validations.impurities': 'Impurezas',
    'validations.uniformity': 'Uniformidad de Unidades de Dosificación',
    'validations.identification': 'Identificación',
    'validations.traces': 'Trazas',
    'validations.not_applicable': 'No Aplica',
    'validations.search_filters': 'Filtros de Búsqueda',
    'validations.filter_by_type': 'Filtrar por tipo',
    'validations.filter_by_status': 'Filtrar por estado',
    'validations.filter_by_equipment': 'Filtrar por equipo',
    'validations.clear_filters': 'Limpiar Filtros',
    'validations.equipment_type': 'Tipo de Equipo',
    'validations.expiry_from': 'Vencimiento desde',
    'validations.expiry_to': 'Vencimiento hasta',
    
    // Validation types
    'validation.procesos': 'Procesos',
    'validation.limpieza': 'Limpieza',
    'validation.metodos': 'Métodos Analíticos',
    'validation.sistemas': 'Sistemas Computarizados',
    
    // Status
    'status.validado': 'Validado',
    'status.proximo': 'Próximo a Vencer',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'En Revalidación',
    'status.en_validacion': 'En Validación',
    'status.por_revalidar': 'Por Revalidar',
    'status.primera_revision': 'Primera Revisión',
    'status.segunda_revision': 'Segunda Revisión',
    'status.success': 'Éxito',
    'status.failed': 'Fallido',
    'status.warning': 'Advertencia',
    
    // Material types
    'material_types.finished_product': 'Producto Terminado',
    'material_types.raw_material': 'Materia Prima',
    'material_types.packaging_material': 'Material de Empaque',
    'material_types.bulk': 'Granel',
    
    // Users
    'users.subtitle': 'Gestión de usuarios del sistema',
    'users.new': 'Nuevo Usuario',
    'users.list': 'Lista de Usuarios',
    'users.manage': 'Gestionar usuarios del sistema',
    'users.name': 'Nombre Completo',
    'users.email': 'Correo Electrónico',
    'users.role': 'Rol',
    'users.password': 'Contraseña',
    'users.password_requirements': 'La contraseña debe tener al menos 7 caracteres, una mayúscula y un símbolo especial',
    'users.password_invalid': 'La contraseña no cumple con los requisitos',
    
    // Roles
    'roles.administrador': 'Administrador',
    'roles.coordinador': 'Coordinador',
    'roles.analista': 'Analista',
    'roles.visualizador': 'Visualizador',
    'roles.administrator': 'Administrador',
    'roles.coordinator': 'Coordinador',
    'roles.analyst': 'Analista',
    'roles.viewer': 'Visualizador',
    
    // Security
    'security.title': 'Seguridad del Sistema',
    'security.subtitle': 'Configuración de seguridad y permisos',
    'security.access_restricted': 'Acceso Restringido',
    'security.no_permissions': 'No tienes permisos para acceder a esta sección',
    'security.new_user': 'Nuevo Usuario',
    'security.add_new_user': 'Agregar Nuevo Usuario',
    'security.full_name': 'Nombre Completo',
    'security.email': 'Correo Electrónico',
    'security.role': 'Rol',
    'security.password': 'Contraseña',
    'security.enter_name': 'Ingrese el nombre completo',
    'security.enter_email': 'Ingrese el correo electrónico',
    'security.enter_password': 'Ingrese una contraseña segura',
    'security.settings': 'Configuraciones de Seguridad',
    'security.settings_desc': 'Configurar parámetros de seguridad del sistema',
    'security.two_factor': 'Autenticación de Dos Factores',
    'security.two_factor_desc': 'Habilitar autenticación de dos factores para mayor seguridad',
    'security.password_expiry': 'Expiración de Contraseña (días)',
    'security.session_timeout': 'Timeout de Sesión (minutos)',
    'security.login_attempts': 'Intentos de Login Máximos',
    'security.audit_logging': 'Registro de Auditoría',
    'security.audit_logging_desc': 'Registrar todas las acciones del sistema',
    'security.encryption': 'Encriptación de Datos',
    'security.encryption_desc': 'Encriptar datos sensibles del sistema',
    'security.permissions': 'Permisos del Sistema',
    'security.permissions_desc': 'Configurar permisos por módulo',
    'security.audit_log': 'Registro de Auditoría',
    'security.audit_log_desc': 'Historial de acciones del sistema',
    'security.date_time': 'Fecha y Hora',
    'security.user': 'Usuario',
    'security.action': 'Acción',
    'security.resource': 'Recurso',
    'security.status': 'Estado',
    'security.ip_address': 'Dirección IP',
    'security.user_created': 'Usuario Creado',
    'security.created_successfully': 'creado exitosamente',
    'security.permission_updated': 'Permiso Actualizado',
    'security.permission_updated_desc': 'El permiso ha sido actualizado correctamente',
    'security.setting_updated': 'Configuración Actualizada',
    'security.setting_updated_desc': 'La configuración ha sido actualizada correctamente',
    
    // Permissions
    'permissions.create_validations': 'Crear Validaciones',
    'permissions.create_validations_desc': 'Permite crear nuevas validaciones',
    'permissions.edit_validations': 'Editar Validaciones',
    'permissions.edit_validations_desc': 'Permite modificar validaciones existentes',
    'permissions.manage_users': 'Gestionar Usuarios',
    'permissions.manage_users_desc': 'Permite crear y modificar usuarios',
    'permissions.export_reports': 'Exportar Reportes',
    'permissions.export_reports_desc': 'Permite exportar reportes del sistema',
    
    // Analytics
    'analytics.title': 'Analíticas del Sistema',
    'analytics.subtitle': 'Estadísticas y métricas de validaciones',
    
    // Notifications
    'notifications.expiry_reminder_6months': 'Recordatorio: Validaciones vencen en 6 meses',
    'notifications.expiry_reminder_3months': 'Recordatorio: Validaciones vencen en 3 meses',
    'notifications.expiry_reminder_1month': 'Alerta: Validaciones vencen en 1 mes',
    'notifications.expiry_expired': 'Alerta: Validaciones vencidas',
    'notifications.email_sent': 'Correo enviado',
    
    // Common
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.view': 'Ver',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.all': 'Todos',
    'common.none': 'Ninguno',
    'common.yes': 'Sí',
    'common.no': 'No',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
  },
  en: {
    // System
    'system.title': 'Validation System',
    'system.subtitle': 'Comprehensive pharmaceutical validation management',
    
    // Login
    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.button': 'Sign In',
    'login.loading': 'Loading...',
    'login.success': 'Login successful',
    'login.welcome': 'Welcome to the system',
    'login.error': 'Authentication error',
    'login.logout': 'Logged out',
    'login.logoutSuccess': 'You have successfully logged out',
    
    // Menu
    'menu.dashboard': 'Dashboard',
    'menu.validations': 'Validations',
    'menu.products': 'Products',
    'menu.equipments': 'Equipment',
    'menu.users': 'Users',
    'menu.security': 'Security',
    'menu.settings': 'Settings',
    'menu.reports': 'Reports',
    
    // Dashboard
    'dashboard.subtitle': 'General overview of the validation system',
    'dashboard.access_restricted': 'Access Restricted',
    'dashboard.contact_administrator': 'Contact administrator for permissions',
    
    // Stats
    'stats.validations': 'Validations',
    'stats.total_validations': 'Total validations',
    'stats.products': 'Products',
    'stats.registered_products': 'Registered products',
    'stats.expiring': 'Expiring',
    'stats.next_30_days': 'Next 30 days',
    'stats.efficiency': 'Efficiency',
    'stats.validation_efficiency': 'Validation efficiency',
    'stats.validated': 'Validated',
    'stats.expired': 'Expired',
    
    // Validations
    'validations.subtitle': 'Validation and protocol management',
    'validations.new': 'New Validation',
    'validations.list': 'Validation List',
    'validations.manage': 'Manage system validations',
    'validations.search': 'Search validations...',
    'validations.validation_code': 'Validation Code',
    'validations.material_type': 'Material Type',
    'validations.material_code': 'Material Code',
    'validations.validation_type': 'Validation Type',
    'validations.subcategory': 'Subcategory',
    'validations.equipment': 'Equipment',
    'validations.status': 'Status',
    'validations.expiry_date': 'Expiry Date',
    'validations.files': 'Files',
    'validations.actions': 'Actions',
    'validations.completed': 'Completed',
    'validations.next30days': 'Next 30 days',
    'validations.immediate': 'Immediate attention',
    'validations.protocols': 'Protocols',
    'validations.withDocumentation': 'With documentation',
    'validations.no_results': 'No results found',
    'validations.no_validations': 'No validations registered',
    'validations.product_raw_material': 'Product/Raw Material',
    'validations.product_raw_material_code': 'Code',
    'validations.manufacturing': 'Manufacturing',
    'validations.packaging': 'Packaging',
    'validations.assay': 'Assay',
    'validations.dissolution': 'Dissolution',
    'validations.impurities': 'Impurities',
    'validations.uniformity': 'Uniformity of Dosage Units',
    'validations.identification': 'Identification',
    'validations.traces': 'Traces',
    'validations.not_applicable': 'Not Applicable',
    'validations.search_filters': 'Search Filters',
    'validations.filter_by_type': 'Filter by type',
    'validations.filter_by_status': 'Filter by status',
    'validations.filter_by_equipment': 'Filter by equipment',
    'validations.clear_filters': 'Clear Filters',
    'validations.equipment_type': 'Equipment Type',
    'validations.expiry_from': 'Expiry from',
    'validations.expiry_to': 'Expiry to',
    
    // Validation types
    'validation.procesos': 'Processes',
    'validation.limpieza': 'Cleaning',
    'validation.metodos': 'Analytical Methods',
    'validation.sistemas': 'Computer Systems',
    
    // Status
    'status.validado': 'Validated',
    'status.proximo': 'About to Expire',
    'status.vencido': 'Expired',
    'status.revalidacion': 'Revalidation',
    'status.en_validacion': 'In Validation',
    'status.por_revalidar': 'To Revalidate',
    'status.primera_revision': 'First Review',
    'status.segunda_revision': 'Second Review',
    'status.success': 'Success',
    'status.failed': 'Failed',
    'status.warning': 'Warning',
    
    // Material types
    'material_types.finished_product': 'Finished Product',
    'material_types.raw_material': 'Raw Material',
    'material_types.packaging_material': 'Packaging Material',
    'material_types.bulk': 'Bulk',
    
    // Users
    'users.subtitle': 'System user management',
    'users.new': 'New User',
    'users.list': 'User List',
    'users.manage': 'Manage system users',
    'users.name': 'Full Name',
    'users.email': 'Email',
    'users.role': 'Role',
    'users.password': 'Password',
    'users.password_requirements': 'Password must have at least 7 characters, one uppercase and one special symbol',
    'users.password_invalid': 'Password does not meet requirements',
    
    // Roles
    'roles.administrador': 'Administrator',
    'roles.coordinador': 'Coordinator',
    'roles.analista': 'Analyst',
    'roles.visualizador': 'Viewer',
    'roles.administrator': 'Administrator',
    'roles.coordinator': 'Coordinator',
    'roles.analyst': 'Analyst',
    'roles.viewer': 'Viewer',
    
    // Security
    'security.title': 'System Security',
    'security.subtitle': 'Security configuration and permissions',
    'security.access_restricted': 'Access Restricted',
    'security.no_permissions': 'You do not have permissions to access this section',
    'security.new_user': 'New User',
    'security.add_new_user': 'Add New User',
    'security.full_name': 'Full Name',
    'security.email': 'Email',
    'security.role': 'Role',
    'security.password': 'Password',
    'security.enter_name': 'Enter full name',
    'security.enter_email': 'Enter email address',
    'security.enter_password': 'Enter secure password',
    'security.settings': 'Security Settings',
    'security.settings_desc': 'Configure system security parameters',
    'security.two_factor': 'Two-Factor Authentication',
    'security.two_factor_desc': 'Enable two-factor authentication for enhanced security',
    'security.password_expiry': 'Password Expiry (days)',
    'security.session_timeout': 'Session Timeout (minutes)',
    'security.login_attempts': 'Maximum Login Attempts',
    'security.audit_logging': 'Audit Logging',
    'security.audit_logging_desc': 'Log all system actions',
    'security.encryption': 'Data Encryption',
    'security.encryption_desc': 'Encrypt sensitive system data',
    'security.permissions': 'System Permissions',
    'security.permissions_desc': 'Configure permissions by module',
    'security.audit_log': 'Audit Log',
    'security.audit_log_desc': 'System action history',
    'security.date_time': 'Date & Time',
    'security.user': 'User',
    'security.action': 'Action',
    'security.resource': 'Resource',
    'security.status': 'Status',
    'security.ip_address': 'IP Address',
    'security.user_created': 'User Created',
    'security.created_successfully': 'created successfully',
    'security.permission_updated': 'Permission Updated',
    'security.permission_updated_desc': 'Permission has been updated successfully',
    'security.setting_updated': 'Setting Updated',
    'security.setting_updated_desc': 'Setting has been updated successfully',
    
    // Permissions
    'permissions.create_validations': 'Create Validations',
    'permissions.create_validations_desc': 'Allows creating new validations',
    'permissions.edit_validations': 'Edit Validations',
    'permissions.edit_validations_desc': 'Allows modifying existing validations',
    'permissions.manage_users': 'Manage Users',
    'permissions.manage_users_desc': 'Allows creating and modifying users',
    'permissions.export_reports': 'Export Reports',
    'permissions.export_reports_desc': 'Allows exporting system reports',
    
    // Analytics
    'analytics.title': 'System Analytics',
    'analytics.subtitle': 'Validation statistics and metrics',
    
    // Notifications
    'notifications.expiry_reminder_6months': 'Reminder: Validations expire in 6 months',
    'notifications.expiry_reminder_3months': 'Reminder: Validations expire in 3 months',
    'notifications.expiry_reminder_1month': 'Alert: Validations expire in 1 month',
    'notifications.expiry_expired': 'Alert: Expired validations',
    'notifications.email_sent': 'Email sent',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  pt: {
    // System
    'system.title': 'Sistema de Validações',
    'system.subtitle': 'Gestão integral de validações farmacêuticas',
    
    // Login
    'login.title': 'Entrar',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.button': 'Entrar',
    'login.loading': 'Carregando...',
    'login.success': 'Login realizado com sucesso',
    'login.welcome': 'Bem-vindo ao sistema',
    'login.error': 'Erro de autenticação',
    'login.logout': 'Sessão encerrada',
    'login.logoutSuccess': 'Você saiu com sucesso',
    
    // Menu
    'menu.dashboard': 'Painel Principal',
    'menu.validations': 'Validações',
    'menu.products': 'Produtos',
    'menu.equipments': 'Equipamentos',
    'menu.users': 'Usuários',
    'menu.security': 'Segurança',
    'menu.settings': 'Configurações',
    'menu.reports': 'Relatórios',
    
    // Dashboard
    'dashboard.subtitle': 'Resumo geral do sistema de validações',
    'dashboard.access_restricted': 'Acesso Restrito',
    'dashboard.contact_administrator': 'Contate o administrador para obter permissões',
    
    // Stats
    'stats.validations': 'Validações',
    'stats.total_validations': 'Total de validações',
    'stats.products': 'Produtos',
    'stats.registered_products': 'Produtos registrados',
    'stats.expiring': 'Vencendo',
    'stats.next_30_days': 'Próximos 30 dias',
    'stats.efficiency': 'Eficiência',
    'stats.validation_efficiency': 'Eficiência de validação',
    'stats.validated': 'Validadas',
    'stats.expired': 'Vencidas',
    
    // Validations
    'validations.subtitle': 'Gestão de validações e protocolos',
    'validations.new': 'Nova Validação',
    'validations.list': 'Lista de Validações',
    'validations.manage': 'Gerenciar validações do sistema',
    'validations.search': 'Buscar validações...',
    'validations.validation_code': 'Código de Validação',
    'validations.material_type': 'Tipo de Material',
    'validations.material_code': 'Código do Material',
    'validations.validation_type': 'Tipo de Validação',
    'validations.subcategory': 'Subcategoria',
    'validations.equipment': 'Equipamento',
    'validations.status': 'Status',
    'validations.expiry_date': 'Data de Vencimento',
    'validations.files': 'Arquivos',
    'validations.actions': 'Ações',
    'validations.completed': 'Concluídas',
    'validations.next30days': 'Próximos 30 dias',
    'validations.immediate': 'Atenção imediata',
    'validations.protocols': 'Protocolos',
    'validations.withDocumentation': 'Com documentação',
    'validations.no_results': 'Nenhum resultado encontrado',
    'validations.no_validations': 'Nenhuma validação registrada',
    'validations.product_raw_material': 'Produto/Matéria Prima',
    'validations.product_raw_material_code': 'Código',
    'validations.manufacturing': 'Fabricação',
    'validations.packaging': 'Embalagem',
    'validations.assay': 'Teor',
    'validations.dissolution': 'Dissolução',
    'validations.impurities': 'Impurezas',
    'validations.uniformity': 'Uniformidade de Unidades de Dosagem',
    'validations.identification': 'Identificação',
    'validations.traces': 'Traços',
    'validations.not_applicable': 'Não Aplicável',
    'validations.search_filters': 'Filtros de Busca',
    'validations.filter_by_type': 'Filtrar por tipo',
    'validations.filter_by_status': 'Filtrar por status',
    'validations.filter_by_equipment': 'Filtrar por equipamento',
    'validations.clear_filters': 'Limpar Filtros',
    'validations.equipment_type': 'Tipo de Equipamento',
    'validations.expiry_from': 'Vencimento de',
    'validations.expiry_to': 'Vencimento até',
    
    // Validation types
    'validation.procesos': 'Processos',
    'validation.limpieza': 'Limpeza',
    'validation.metodos': 'Métodos Analíticos',
    'validation.sistemas': 'Sistemas Computadorizados',
    
    // Status
    'status.validado': 'Validado',
    'status.proximo': 'Próximo ao Vencimento',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'Em Revalidação',
    'status.en_validacion': 'Em Validação',
    'status.por_revalidar': 'Para Revalidar',
    'status.primera_revision': 'Primeira Revisão',
    'status.segunda_revision': 'Segunda Revisão',
    'status.success': 'Sucesso',
    'status.failed': 'Falhou',
    'status.warning': 'Aviso',
    
    // Material types
    'material_types.finished_product': 'Produto Terminado',
    'material_types.raw_material': 'Matéria Prima',
    'material_types.packaging_material': 'Material de Embalagem',
    'material_types.bulk': 'Granel',
    
    // Users
    'users.subtitle': 'Gestão de usuários do sistema',
    'users.new': 'Novo Usuário',
    'users.list': 'Lista de Usuários',
    'users.manage': 'Gerenciar usuários do sistema',
    'users.name': 'Nome Completo',
    'users.email': 'Email',
    'users.role': 'Função',
    'users.password': 'Senha',
    'users.password_requirements': 'A senha deve ter pelo menos 7 caracteres, uma maiúscula e um símbolo especial',
    'users.password_invalid': 'A senha não atende aos requisitos',
    
    // Roles
    'roles.administrador': 'Administrador',
    'roles.coordinador': 'Coordenador',
    'roles.analista': 'Analista',
    'roles.visualizador': 'Visualizador',
    'roles.administrator': 'Administrador',
    'roles.coordinator': 'Coordenador',
    'roles.analyst': 'Analista',
    'roles.viewer': 'Visualizador',
    
    // Security
    'security.title': 'Segurança do Sistema',
    'security.subtitle': 'Configuração de segurança e permissões',
    'security.access_restricted': 'Acesso Restrito',
    'security.no_permissions': 'Você não tem permissões para acessar esta seção',
    'security.new_user': 'Novo Usuário',
    'security.add_new_user': 'Adicionar Novo Usuário',
    'security.full_name': 'Nome Completo',
    'security.email': 'Email',
    'security.role': 'Função',
    'security.password': 'Senha',
    'security.enter_name': 'Digite o nome completo',
    'security.enter_email': 'Digite o endereço de email',
    'security.enter_password': 'Digite uma senha segura',
    'security.settings': 'Configurações de Segurança',
    'security.settings_desc': 'Configurar parâmetros de segurança do sistema',
    'security.two_factor': 'Autenticação de Dois Fatores',
    'security.two_factor_desc': 'Habilitar autenticação de dois fatores para maior segurança',
    'security.password_expiry': 'Expiração da Senha (dias)',
    'security.session_timeout': 'Timeout da Sessão (minutos)',
    'security.login_attempts': 'Tentativas Máximas de Login',
    'security.audit_logging': 'Log de Auditoria',
    'security.audit_logging_desc': 'Registrar todas as ações do sistema',
    'security.encryption': 'Criptografia de Dados',
    'security.encryption_desc': 'Criptografar dados sensíveis do sistema',
    'security.permissions': 'Permissões do Sistema',
    'security.permissions_desc': 'Configurar permissões por módulo',
    'security.audit_log': 'Log de Auditoria',
    'security.audit_log_desc': 'Histórico de ações do sistema',
    'security.date_time': 'Data e Hora',
    'security.user': 'Usuário',
    'security.action': 'Ação',
    'security.resource': 'Recurso',
    'security.status': 'Status',
    'security.ip_address': 'Endereço IP',
    'security.user_created': 'Usuário Criado',
    'security.created_successfully': 'criado com sucesso',
    'security.permission_updated': 'Permissão Atualizada',
    'security.permission_updated_desc': 'A permissão foi atualizada com sucesso',
    'security.setting_updated': 'Configuração Atualizada',
    'security.setting_updated_desc': 'A configuração foi atualizada com sucesso',
    
    // Permissions
    'permissions.create_validations': 'Criar Validações',
    'permissions.create_validations_desc': 'Permite criar novas validações',
    'permissions.edit_validations': 'Editar Validações',
    'permissions.edit_validations_desc': 'Permite modificar validações existentes',
    'permissions.manage_users': 'Gerenciar Usuários',
    'permissions.manage_users_desc': 'Permite criar e modificar usuários',
    'permissions.export_reports': 'Exportar Relatórios',
    'permissions.export_reports_desc': 'Permite exportar relatórios do sistema',
    
    // Analytics
    'analytics.title': 'Análises do Sistema',
    'analytics.subtitle': 'Estatísticas e métricas de validações',
    
    // Notifications
    'notifications.expiry_reminder_6months': 'Lembrete: Validações vencem em 6 meses',
    'notifications.expiry_reminder_3months': 'Lembrete: Validações vencem em 3 meses',
    'notifications.expiry_reminder_1month': 'Alerta: Validações vencem em 1 mês',
    'notifications.expiry_expired': 'Alerta: Validações vencidas',
    'notifications.email_sent': 'Email enviado',
    
    // Common
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.view': 'Ver',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.all': 'Todos',
    'common.none': 'Nenhum',
    'common.yes': 'Sim',
    'common.no': 'Não',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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
