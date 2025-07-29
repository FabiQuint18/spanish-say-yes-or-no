
import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { Language } from '@/types/validation';

/**
 * Translation data structure with comprehensive multi-language support
 * Organized by language and feature modules for better maintainability
 */
const translations = {
  es: {
    // System
    'system.title': 'Sistema de Validaciones',
    'system.subtitle': 'Gestión Farmacéutica',
    
    // Login
    'login.title': 'Sistema de Validaciones',
    'login.email': 'Correo Electrónico',
    'login.password': 'Contraseña',
    'login.button': 'Iniciar Sesión',
    'login.loading': 'Iniciando sesión...',
    'login.success': 'Inicio de sesión exitoso',
    'login.welcome': '¡Bienvenido al sistema!',
    'login.error': 'Error de autenticación',
    'login.logout': 'Cerrar Sesión',
    'login.logoutSuccess': 'Sesión cerrada exitosamente',
    
    // Menu
    'menu.dashboard': 'Dashboard',
    'menu.validations': 'Validaciones',
    'menu.products': 'Productos',
    'menu.equipments': 'Equipos',
    'menu.users': 'Usuarios',
    'menu.settings': 'Configuraciones',
    'menu.security': 'Seguridad',
    
    // Dashboard
    'dashboard.title': 'Panel de Control',
    'dashboard.subtitle': 'Resumen general del sistema',
    'dashboard.access_restricted': 'Acceso Restringido',
    'dashboard.contact_administrator': 'Contacte al administrador para obtener acceso',
    
    // Common
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.add': 'Agregar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.actions': 'Acciones',
    'common.status': 'Estado',
    'common.date': 'Fecha',
    'common.name': 'Nombre',
    'common.type': 'Tipo',
    'common.description': 'Descripción',
    'common.observations': 'Observaciones',
    'common.all': 'Todos',
    'common.error': 'Error',
    'common.loading': 'Cargando...',
    'common.confirm': 'Confirmar',
    'common.close': 'Cerrar',
    'common.view': 'Ver',
    'common.download': 'Descargar',
    'common.upload': 'Subir',
    'common.required': 'Requerido',
    'common.optional': 'Opcional',
    
    // Validations
    'validations.title': 'Gestión de Validaciones',
    'validations.subtitle': 'Administrar validaciones farmacéuticas',
    'validations.list': 'Lista de Validaciones',
    'validations.manage': 'Gestionar validaciones del sistema',
    'validations.new': 'Nueva Validación',
    'validations.validation_code': 'Código de Validación',
    'validations.material_name': 'Nombre del Material',
    'validations.product_code': 'Código de Producto/MP',
    'validations.validation_type': 'Tipo de Validación',
    'validations.subcategory': 'Subcategoría',
    'validations.equipment': 'Equipo',
    'validations.equipment_type': 'Tipo de Equipo',
    'validations.validity_date': 'Fecha de Vigencia',
    'validations.expiry_date': 'Fecha de Vencimiento',
    'validations.material_type': 'Tipo de Material',
    'validations.files': 'Archivos',
    'validations.actions': 'Acciones',
    'validations.search': 'Buscar validaciones...',
    'validations.search_filters': 'Filtros de Búsqueda',
    'validations.clear_filters': 'Limpiar Filtros',
    'validations.select_type': 'Seleccionar tipo',
    'validations.select_subcategory': 'Seleccionar subcategoría',
    'validations.search_by_code': 'Buscar por código',
    'validations.select_equipment': 'Seleccionar equipo',
    'validations.select_status': 'Seleccionar estado',
    'validations.expiry_from': 'Vencimiento desde',
    'validations.expiry_to': 'Vencimiento hasta',
    'validations.no_results': 'No se encontraron resultados',
    'validations.no_validations': 'No hay validaciones registradas',
    'validations.completed': 'Validaciones completadas',
    'validations.next30days': 'Próximos 30 días',
    'validations.immediate': 'Atención inmediata',
    'validations.protocols': 'Protocolos',
    'validations.withDocumentation': 'Con documentación',
    'validations.status': 'Estado de Validación',
    
    // Filters
    'filters.title': 'Filtros de Búsqueda',
    'filters.validation_type': 'Tipo de Validación',
    'filters.subcategory': 'Subcategoría',
    'filters.validation_code': 'Código de Validación',
    'filters.material_type': 'Tipo de Material',
    'filters.equipment_type': 'Tipo de Equipo',
    'filters.status': 'Estado',
    'filters.expiry_until': 'Vencimiento hasta',
    'filters.clear_all': 'Limpiar todos los filtros',
    'filters.apply': 'Aplicar filtros',
    
    // Validation Types
    'validation_types.processes': 'Procesos',
    'validation_types.cleaning': 'Limpieza',
    'validation_types.analytical_methods': 'Métodos Analíticos',
    'validation_types.computerized_systems': 'Sistemas Computarizados',
    
    // Subcategories
    'subcategories.manufacturing': 'Fabricación',
    'subcategories.packaging': 'Empaque',
    'subcategories.assay': 'Valoración',
    'subcategories.dissolution': 'Disolución',
    'subcategories.impurities': 'Impurezas',
    'subcategories.uniformity': 'Uniformidad de Unidades de Dosificación',
    'subcategories.identification': 'Identificación',
    'subcategories.traces': 'Trazas',
    'subcategories.not_applicable': 'No Aplica',
    'subcategories.initial_validation': 'Validación Inicial',
    'subcategories.periodic_revalidation': 'Revalidación Periódica',
    
    // Material Types
    'material_types.raw_material': 'Materia Prima',
    'material_types.packaging_material': 'Material de Empaque',
    'material_types.finished_product': 'Producto Terminado',
    'material_types.bulk': 'Granel',
    
    // Equipment Types
    'equipment_types.analytical': 'Analítico',
    'equipment_types.production': 'Producción',
    'equipment_types.packaging': 'Empaque',
    'equipment_types.cleaning': 'Limpieza',
    'equipment_types.hvac': 'HVAC',
    'equipment_types.utility': 'Servicios',
    
    // Status
    'status.validado': 'Validado',
    'status.en_validacion': 'En Validación',
    'status.proximo': 'Próximo a Vencer',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'En Revalidación',
    'status.por_revalidar': 'Por Revalidar',
    'status.primera_revision': 'Primera Revisión',
    'status.segunda_revision': 'Segunda Revisión',
    'status.success': 'Exitoso',
    'status.failed': 'Fallido',
    'status.warning': 'Advertencia',
    'status.active': 'Activo',
    'status.inactive': 'Inactivo',
    'status.pending': 'Pendiente',
    'status.approved': 'Aprobado',
    'status.rejected': 'Rechazado',
    
    // Products
    'products.title': 'Gestión de Productos',
    'products.subtitle': 'Administrar productos y materias primas',
    'products.add': 'Agregar Producto',
    'products.list': 'Lista de Productos',
    'products.validation_type': 'Tipo de Validación',
    'products.subcategory': 'Subcategoría',
    'products.observations': 'Observaciones',
    'products.expiry_date': 'Fecha de Vencimiento',
    'products.product_observations': 'Observaciones del producto',
    
    // Equipments
    'equipments.title': 'Gestión de Equipos',
    'equipments.subtitle': 'Administrar equipos de laboratorio',
    'equipments.add': 'Agregar Equipo',
    'equipments.list': 'Lista de Equipos',
    
    // Users
    'users.title': 'Gestión de Usuarios',
    'users.subtitle': 'Administrar usuarios del sistema',
    'users.list': 'Lista de Usuarios',
    'users.manage': 'Gestionar usuarios y permisos',
    'users.new': 'Nuevo Usuario',
    'users.name': 'Nombre Completo',
    'users.email': 'Correo Electrónico',
    'users.role': 'Rol',
    'users.password': 'Contraseña',
    'users.confirm.password': 'Confirmar Contraseña',
    'users.password.requirements': 'La contraseña debe tener al menos 7 caracteres, 1 mayúscula y 1 símbolo especial',
    'users.password.weak': 'La contraseña no cumple con los requisitos de seguridad',
    'users.password.mismatch': 'Las contraseñas no coinciden',
    'users.created.successfully': 'Usuario creado exitosamente',
    
    // Roles
    'roles.super_administrador': 'Super Administrador',
    'roles.administrador': 'Administrador',
    'roles.coordinador': 'Coordinador',
    'roles.analista': 'Analista',
    'roles.visualizador': 'Visualizador',
    
    // Settings
    'settings.title': 'Configuraciones del Sistema',
    'settings.subtitle': 'Personalizar configuraciones generales',
    
    // Security
    'security.title': 'Configuraciones de Seguridad',
    'security.subtitle': 'Gestionar seguridad y auditoría',
    
    // Stats
    'stats.validations': 'Validaciones',
    'stats.products': 'Productos',
    'stats.expiring': 'Por Vencer',
    'stats.expired': 'Vencidos',
    'stats.validated': 'Validados',
    'stats.total_validations': 'Total de validaciones',
    'stats.registered_products': 'Productos registrados',
    'stats.next_30_days': 'Próximos 30 días',
    
    // Analytics
    'analytics.title': 'Analíticas del Sistema',
    'analytics.subtitle': 'Análisis detallado de validaciones',
    
    // Excel Import
    'excel.import': 'Importar Excel',
    'excel.import.success': 'Importación Exitosa',
    'excel.import.error': 'Error de Importación',
    'excel.import.processing': 'Se procesaron {count} validaciones desde Excel',
    'excel.import.format_error': 'Error al procesar el archivo Excel. Verifique el formato.',
    'excel.import.file_type_error': 'Solo se permiten archivos Excel (.xlsx, .xls)',
    
    // Form Labels
    'form.document_code': 'Código del Documento',
    'form.product_code': 'Código de Producto o Materia Prima',
    'form.product_name': 'Nombre del Producto',
    'form.material_type': 'Tipo de Material',
    'form.validation_type': 'Tipo de Validación',
    'form.subcategory': 'Subcategoría',
    'form.equipment_type': 'Tipo de Equipo',
    'form.status': 'Estado',
    'form.validity_date': 'Fecha de Vigencia',
    'form.expiry_date': 'Fecha de Vencimiento',
    'form.select_material_type': 'Seleccionar tipo de material',
    'form.select_type': 'Seleccionar tipo',
    'form.select_subcategory': 'Seleccionar subcategoría',
    'form.select_equipment': 'Seleccionar equipo',
    'form.select_status': 'Seleccionar estado',
    'form.required_fields': 'Por favor completa los campos requeridos',
    'form.validation_created': 'Validación Creada',
    'form.validation_updated': 'Validación Actualizada',
    'form.new_validation': 'Nueva validación {code} creada exitosamente',
    'form.updated_validation': 'Actualización de validación {code} actualizada exitosamente',
    'form.edit_validation': 'Editar Validación',
    'form.new_validation_title': 'Nueva Validación',
    'form.create_validation': 'Crear Validación',
    'form.update_validation': 'Actualizar Validación',
    
    // Table and List
    'table.number': 'Número',
    'table.no_files': 'Sin archivos',
    'table.sort': 'Ordenar',
    'table.alphabetically': 'Alfabéticamente',
    'table.by_date': 'Por Fecha Vigencia',
    'table.oldest_to_newest': 'De lo más antiguo a lo más reciente',
    'table.newest_to_oldest': 'De lo más reciente a lo más antiguo',
    'table.a_to_z': 'A-Z',
    'table.z_to_a': 'Z-A',
    
    // Print and Export
    'print.preview': 'Vista Previa',
    'print.print': 'Imprimir',
    'print.download_pdf': 'Descargar PDF',
    'print.cancel': 'Cancelar',
    'print.report_title': 'Listado de Validaciones',
    'print.generation_date': 'Fecha de generación',
    'print.total_records': 'Total de registros',
    'print.pharmaceutical_system': 'Sistema de Gestión de Validaciones Farmacéuticas',
    'print.auto_generated': 'Documento generado automáticamente por el Sistema de Gestión de Validaciones',
    'print.contact_admin': 'Para más información contacte al administrador del sistema'
  },
  
  en: {
    // System
    'system.title': 'Validation System',
    'system.subtitle': 'Pharmaceutical Management',
    
    // Login
    'login.title': 'Validation System',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.button': 'Sign In',
    'login.loading': 'Signing in...',
    'login.success': 'Login successful',
    'login.welcome': 'Welcome to the system!',
    'login.error': 'Authentication error',
    'login.logout': 'Sign Out',
    'login.logoutSuccess': 'Successfully signed out',
    
    // Menu
    'menu.dashboard': 'Dashboard',
    'menu.validations': 'Validations',
    'menu.products': 'Products',
    'menu.equipments': 'Equipment',
    'menu.users': 'Users',
    'menu.settings': 'Settings',
    'menu.security': 'Security',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'System overview',
    'dashboard.access_restricted': 'Access Restricted',
    'dashboard.contact_administrator': 'Contact administrator for access',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.name': 'Name',
    'common.type': 'Type',
    'common.description': 'Description',
    'common.observations': 'Observations',
    'common.all': 'All',
    'common.error': 'Error',
    'common.loading': 'Loading...',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.required': 'Required',
    'common.optional': 'Optional',
    
    // Validations
    'validations.title': 'Validation Management',
    'validations.subtitle': 'Manage pharmaceutical validations',
    'validations.list': 'Validation List',
    'validations.manage': 'Manage system validations',
    'validations.new': 'New Validation',
    'validations.validation_code': 'Validation Code',
    'validations.material_name': 'Material Name',
    'validations.product_code': 'Product/RM Code',
    'validations.validation_type': 'Validation Type',
    'validations.subcategory': 'Subcategory',
    'validations.equipment': 'Equipment',
    'validations.equipment_type': 'Equipment Type',
    'validations.validity_date': 'Validity Date',
    'validations.expiry_date': 'Expiry Date',
    'validations.material_type': 'Material Type',
    'validations.files': 'Files',
    'validations.actions': 'Actions',
    'validations.search': 'Search validations...',
    'validations.search_filters': 'Search Filters',
    'validations.clear_filters': 'Clear Filters',
    'validations.select_type': 'Select type',
    'validations.select_subcategory': 'Select subcategory',
    'validations.search_by_code': 'Search by code',
    'validations.select_equipment': 'Select equipment',
    'validations.select_status': 'Select status',
    'validations.expiry_from': 'Expiry from',
    'validations.expiry_to': 'Expiry to',
    'validations.no_results': 'No results found',
    'validations.no_validations': 'No validations registered',
    'validations.completed': 'Completed validations',
    'validations.next30days': 'Next 30 days',
    'validations.immediate': 'Immediate attention',
    'validations.protocols': 'Protocols',
    'validations.withDocumentation': 'With documentation',
    'validations.status': 'Validation Status',
    
    // Filters
    'filters.title': 'Search Filters',
    'filters.validation_type': 'Validation Type',
    'filters.subcategory': 'Subcategory',
    'filters.validation_code': 'Validation Code',
    'filters.material_type': 'Material Type',
    'filters.equipment_type': 'Equipment Type',
    'filters.status': 'Status',
    'filters.expiry_until': 'Expiry until',
    'filters.clear_all': 'Clear all filters',
    'filters.apply': 'Apply filters',
    
    // Validation Types
    'validation_types.processes': 'Processes',
    'validation_types.cleaning': 'Cleaning',
    'validation_types.analytical_methods': 'Analytical Methods',
    'validation_types.computerized_systems': 'Computerized Systems',
    
    // Subcategories
    'subcategories.manufacturing': 'Manufacturing',
    'subcategories.packaging': 'Packaging',
    'subcategories.assay': 'Assay',
    'subcategories.dissolution': 'Dissolution',
    'subcategories.impurities': 'Impurities',
    'subcategories.uniformity': 'Uniformity of Dosage Units',
    'subcategories.identification': 'Identification',
    'subcategories.traces': 'Traces',
    'subcategories.not_applicable': 'Not Applicable',
    'subcategories.initial_validation': 'Initial Validation',
    'subcategories.periodic_revalidation': 'Periodic Revalidation',
    
    // Material Types
    'material_types.raw_material': 'Raw Material',
    'material_types.packaging_material': 'Packaging Material',
    'material_types.finished_product': 'Finished Product',
    'material_types.bulk': 'Bulk',
    
    // Equipment Types
    'equipment_types.analytical': 'Analytical',
    'equipment_types.production': 'Production',
    'equipment_types.packaging': 'Packaging',
    'equipment_types.cleaning': 'Cleaning',
    'equipment_types.hvac': 'HVAC',
    'equipment_types.utility': 'Utilities',
    
    // Status
    'status.validado': 'Validated',
    'status.en_validacion': 'In Validation',
    'status.proximo': 'Expiring Soon',
    'status.vencido': 'Expired',
    'status.revalidacion': 'In Revalidation',
    'status.por_revalidar': 'To Revalidate',
    'status.primera_revision': 'First Review',
    'status.segunda_revision': 'Second Review',
    'status.success': 'Success',
    'status.failed': 'Failed',
    'status.warning': 'Warning',
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.pending': 'Pending',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    
    // Products
    'products.title': 'Product Management',
    'products.subtitle': 'Manage products and raw materials',
    'products.add': 'Add Product',
    'products.list': 'Product List',
    'products.validation_type': 'Validation Type',
    'products.subcategory': 'Subcategory',
    'products.observations': 'Observations',
    'products.expiry_date': 'Expiry Date',
    'products.product_observations': 'Product observations',
    
    // Equipments
    'equipments.title': 'Equipment Management',
    'equipments.subtitle': 'Manage laboratory equipment',
    'equipments.add': 'Add Equipment',
    'equipments.list': 'Equipment List',
    
    // Users
    'users.title': 'User Management',
    'users.subtitle': 'Manage system users',
    'users.list': 'User List',
    'users.manage': 'Manage users and permissions',
    'users.new': 'New User',
    'users.name': 'Full Name',
    'users.email': 'Email Address',
    'users.role': 'Role',
    'users.password': 'Password',
    'users.confirm.password': 'Confirm Password',
    'users.password.requirements': 'Password must have at least 7 characters, 1 uppercase and 1 special symbol',
    'users.password.weak': 'Password does not meet security requirements',
    'users.password.mismatch': 'Passwords do not match',
    'users.created.successfully': 'User created successfully',
    
    // Roles
    'roles.super_administrador': 'Super Administrator',
    'roles.administrador': 'Administrator',
    'roles.coordinador': 'Coordinator',
    'roles.analista': 'Analyst',
    'roles.visualizador': 'Viewer',
    
    // Settings
    'settings.title': 'System Settings',
    'settings.subtitle': 'Customize general settings',
    
    // Security
    'security.title': 'Security Settings',
    'security.subtitle': 'Manage security and audit',
    
    // Stats
    'stats.validations': 'Validations',
    'stats.products': 'Products',
    'stats.expiring': 'Expiring',
    'stats.expired': 'Expired',
    'stats.validated': 'Validated',
    'stats.total_validations': 'Total validations',
    'stats.registered_products': 'Registered products',
    'stats.next_30_days': 'Next 30 days',
    
    // Analytics
    'analytics.title': 'System Analytics',
    'analytics.subtitle': 'Detailed validation analysis'
  },
  
  pt: {
    // System
    'system.title': 'Sistema de Validações',
    'system.subtitle': 'Gestão Farmacêutica',
    
    // Login
    'login.title': 'Sistema de Validações',
    'login.email': 'Endereço de Email',
    'login.password': 'Senha',
    'login.button': 'Entrar',
    'login.loading': 'Entrando...',
    'login.success': 'Login realizado com sucesso',
    'login.welcome': 'Bem-vindo ao sistema!',
    'login.error': 'Erro de autenticação',
    'login.logout': 'Sair',
    'login.logoutSuccess': 'Sessão encerrada com sucesso',
    
    // Menu
    'menu.dashboard': 'Painel',
    'menu.validations': 'Validações',
    'menu.products': 'Produtos',
    'menu.equipments': 'Equipamentos',
    'menu.users': 'Usuários',
    'menu.settings': 'Configurações',
    'menu.security': 'Segurança',
    
    // Dashboard
    'dashboard.title': 'Painel de Controle',
    'dashboard.subtitle': 'Visão geral do sistema',
    'dashboard.access_restricted': 'Acesso Restrito',
    'dashboard.contact_administrator': 'Entre em contato com o administrador para obter acesso',
    
    // Common
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.add': 'Adicionar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.actions': 'Ações',
    'common.status': 'Status',
    'common.date': 'Data',
    'common.name': 'Nome',
    'common.type': 'Tipo',
    'common.description': 'Descrição',
    'common.observations': 'Observações',
    'common.all': 'Todos',
    'common.error': 'Erro',
    'common.loading': 'Carregando...',
    'common.confirm': 'Confirmar',
    'common.close': 'Fechar',
    'common.view': 'Ver',
    'common.download': 'Baixar',
    'common.upload': 'Enviar',
    'common.required': 'Obrigatório',
    'common.optional': 'Opcional',
    
    // Validations
    'validations.title': 'Gestão de Validações',
    'validations.subtitle': 'Gerenciar validações farmacêuticas',
    'validations.list': 'Lista de Validações',
    'validations.manage': 'Gerenciar validações do sistema',
    'validations.new': 'Nova Validação',
    'validations.validation_code': 'Código de Validação',
    'validations.material_name': 'Nome do Material',
    'validations.product_code': 'Código do Produto/MP',
    'validations.validation_type': 'Tipo de Validação',
    'validations.subcategory': 'Subcategoria',
    'validations.equipment': 'Equipamento',
    'validations.equipment_type': 'Tipo de Equipamento',
    'validations.validity_date': 'Data de Validade',
    'validations.expiry_date': 'Data de Vencimento',
    'validations.material_type': 'Tipo de Material',
    'validations.files': 'Arquivos',
    'validations.actions': 'Ações',
    'validations.search': 'Pesquisar validações...',
    'validations.search_filters': 'Filtros de Pesquisa',
    'validations.clear_filters': 'Limpar Filtros',
    'validations.select_type': 'Selecionar tipo',
    'validations.select_subcategory': 'Selecionar subcategoria',
    'validations.search_by_code': 'Pesquisar por código',
    'validations.select_equipment': 'Selecionar equipamento',
    'validations.select_status': 'Selecionar status',
    'validations.expiry_from': 'Vencimento de',
    'validations.expiry_to': 'Vencimento até',
    'validations.no_results': 'Nenhum resultado encontrado',
    'validations.no_validations': 'Nenhuma validação registrada',
    'validations.completed': 'Validações concluídas',
    'validations.next30days': 'Próximos 30 dias',
    'validations.immediate': 'Atenção imediata',
    'validations.protocols': 'Protocolos',
    'validations.withDocumentation': 'Com documentação',
    'validations.status': 'Status da Validação',
    
    // Filters
    'filters.title': 'Filtros de Pesquisa',
    'filters.validation_type': 'Tipo de Validação',
    'filters.subcategory': 'Subcategoria',
    'filters.validation_code': 'Código de Validação',
    'filters.material_type': 'Tipo de Material',
    'filters.equipment_type': 'Tipo de Equipamento',
    'filters.status': 'Status',
    'filters.expiry_until': 'Vencimento até',
    'filters.clear_all': 'Limpar todos os filtros',
    'filters.apply': 'Aplicar filtros',
    
    // Validation Types
    'validation_types.processes': 'Processos',
    'validation_types.cleaning': 'Limpeza',
    'validation_types.analytical_methods': 'Métodos Analíticos',
    'validation_types.computerized_systems': 'Sistemas Computadorizados',
    
    // Subcategories
    'subcategories.manufacturing': 'Fabricação',
    'subcategories.packaging': 'Embalagem',
    'subcategories.assay': 'Valoração',
    'subcategories.dissolution': 'Dissolução',
    'subcategories.impurities': 'Impurezas',
    'subcategories.uniformity': 'Uniformidade de Unidades de Dosagem',
    'subcategories.identification': 'Identificação',
    'subcategories.traces': 'Traços',
    'subcategories.not_applicable': 'Não Aplicável',
    'subcategories.initial_validation': 'Validação Inicial',
    'subcategories.periodic_revalidation': 'Revalidação Periódica',
    
    // Material Types
    'material_types.raw_material': 'Matéria Prima',
    'material_types.packaging_material': 'Material de Embalagem',
    'material_types.finished_product': 'Produto Acabado',
    'material_types.bulk': 'Granel',
    
    // Equipment Types
    'equipment_types.analytical': 'Analítico',
    'equipment_types.production': 'Produção',
    'equipment_types.packaging': 'Embalagem',
    'equipment_types.cleaning': 'Limpeza',
    'equipment_types.hvac': 'HVAC',
    'equipment_types.utility': 'Utilidades',
    
    // Status
    'status.validado': 'Validado',
    'status.en_validacion': 'Em Validação',
    'status.proximo': 'Próximo ao Vencimento',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'Em Revalidação',
    'status.por_revalidar': 'Para Revalidar',
    'status.primera_revision': 'Primeira Revisão',
    'status.segunda_revision': 'Segunda Revisão',
    'status.success': 'Sucesso',
    'status.failed': 'Falhou',
    'status.warning': 'Aviso',
    'status.active': 'Ativo',
    'status.inactive': 'Inativo',
    'status.pending': 'Pendente',
    'status.approved': 'Aprovado',
    'status.rejected': 'Rejeitado',
    
    // Products
    'products.title': 'Gestão de Produtos',
    'products.subtitle': 'Gerenciar produtos e matérias-primas',
    'products.add': 'Adicionar Produto',
    'products.list': 'Lista de Produtos',
    'products.validation_type': 'Tipo de Validação',
    'products.subcategory': 'Subcategoria',
    'products.observations': 'Observações',
    'products.expiry_date': 'Data de Vencimento',
    'products.product_observations': 'Observações do produto',
    
    // Equipments
    'equipments.title': 'Gestão de Equipamentos',
    'equipments.subtitle': 'Gerenciar equipamentos de laboratório',
    'equipments.add': 'Adicionar Equipamento',
    'equipments.list': 'Lista de Equipamentos',
    
    // Users
    'users.title': 'Gestão de Usuários',
    'users.subtitle': 'Gerenciar usuários do sistema',
    'users.list': 'Lista de Usuários',
    'users.manage': 'Gerenciar usuários e permissões',
    'users.new': 'Novo Usuário',
    'users.name': 'Nome Completo',
    'users.email': 'Endereço de Email',
    'users.role': 'Função',
    'users.password': 'Senha',
    'users.confirm.password': 'Confirmar Senha',
    'users.password.requirements': 'A senha deve ter pelo menos 7 caracteres, 1 maiúscula e 1 símbolo especial',
    'users.password.weak': 'A senha não atende aos requisitos de segurança',
    'users.password.mismatch': 'As senhas não coincidem',
    'users.created.successfully': 'Usuário criado com sucesso',
    
    // Roles
    'roles.super_administrador': 'Super Administrador',
    'roles.administrador': 'Administrador',
    'roles.coordinador': 'Coordenador',
    'roles.analista': 'Analista',
    'roles.visualizador': 'Visualizador',
    
    // Settings
    'settings.title': 'Configurações do Sistema',
    'settings.subtitle': 'Personalizar configurações gerais',
    
    // Security
    'security.title': 'Configurações de Segurança',
    'security.subtitle': 'Gerenciar segurança e auditoria',
    
    // Stats
    'stats.validations': 'Validações',
    'stats.products': 'Produtos',
    'stats.expiring': 'Vencendo',
    'stats.expired': 'Vencidos',
    'stats.validated': 'Validados',
    'stats.total_validations': 'Total de validações',
    'stats.registered_products': 'Produtos registrados',
    'stats.next_30_days': 'Próximos 30 dias',
    
    // Analytics
    'analytics.title': 'Análises do Sistema',
    'analytics.subtitle': 'Análise detalhada de validações',
    
    // Excel Import
    'excel.import': 'Importar Excel',
    'excel.import.success': 'Importação Bem-sucedida',
    'excel.import.error': 'Erro de Importação',
    'excel.import.processing': 'Processadas {count} validações do Excel',
    'excel.import.format_error': 'Erro ao processar arquivo Excel. Verifique o formato.',
    'excel.import.file_type_error': 'Apenas arquivos Excel são permitidos (.xlsx, .xls)',
    
    // Form Labels
    'form.document_code': 'Código do Documento',
    'form.product_code': 'Código do Produto ou Matéria Prima',
    'form.product_name': 'Nome do Produto',
    'form.material_type': 'Tipo de Material',
    'form.validation_type': 'Tipo de Validação',
    'form.subcategory': 'Subcategoria',
    'form.equipment_type': 'Tipo de Equipamento',
    'form.status': 'Status',
    'form.validity_date': 'Data de Validade',
    'form.expiry_date': 'Data de Vencimento',
    'form.select_material_type': 'Selecionar tipo de material',
    'form.select_type': 'Selecionar tipo',
    'form.select_subcategory': 'Selecionar subcategoria',
    'form.select_equipment': 'Selecionar equipamento',
    'form.select_status': 'Selecionar status',
    'form.required_fields': 'Por favor complete os campos obrigatórios',
    'form.validation_created': 'Validação Criada',
    'form.validation_updated': 'Validação Atualizada',
    'form.new_validation': 'Nova validação {code} criada com sucesso',
    'form.updated_validation': 'Validação {code} atualizada com sucesso',
    'form.edit_validation': 'Editar Validação',
    'form.new_validation_title': 'Nova Validação',
    'form.create_validation': 'Criar Validação',
    'form.update_validation': 'Atualizar Validação',
    
    // Table and List
    'table.number': 'Número',
    'table.no_files': 'Sem arquivos',
    'table.sort': 'Ordenar',
    'table.alphabetically': 'Alfabeticamente',
    'table.by_date': 'Por Data de Validade',
    'table.oldest_to_newest': 'Do mais antigo ao mais recente',
    'table.newest_to_oldest': 'Do mais recente ao mais antigo',
    'table.a_to_z': 'A-Z',
    'table.z_to_a': 'Z-A',
    
    // Print and Export
    'print.preview': 'Visualizar',
    'print.print': 'Imprimir',
    'print.download_pdf': 'Baixar PDF',
    'print.cancel': 'Cancelar',
    'print.report_title': 'Lista de Validações',
    'print.generation_date': 'Data de geração',
    'print.total_records': 'Total de registros',
    'print.pharmaceutical_system': 'Sistema de Gestão de Validações Farmacêuticas',
    'print.auto_generated': 'Documento gerado automaticamente pelo Sistema de Gestão de Validações',
    'print.contact_admin': 'Para mais informações entre em contato com o administrador do sistema'
  }
} as const;

/**
 * Language context interface with enhanced functionality
 */
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
  availableLanguages: readonly Language[];
}

/**
 * Language context with undefined as default to enforce provider usage
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Props for the LanguageProvider component
 */
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

/**
 * Enhanced Language Provider with performance optimizations and better error handling
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'es'
}) => {
  // Initialize language from localStorage or use default
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
      if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
        return savedLanguage;
      }
    }
    return defaultLanguage;
  });

  /**
   * Enhanced setLanguage function with persistence
   */
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  }, []);

  /**
   * Enhanced translation function with parameter interpolation
   */
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    try {
      const translation = translations[language][key as keyof typeof translations[Language]];
      
      if (!translation) {
        // Only warn in development
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation missing for key: ${key} in language: ${language}`);
        }
        return key;
      }

      // Handle parameter interpolation
      if (params && typeof translation === 'string') {
        return Object.entries(params).reduce((str, [paramKey, value]) => {
          return str.replace(new RegExp(`{${paramKey}}`, 'g'), String(value));
        }, translation);
      }

      return translation;
    } catch (error) {
      console.error(`Error translating key: ${key}`, error);
      return key;
    }
  }, [language]);

  /**
   * Check if current language is right-to-left
   */
  const isRTL = useMemo(() => {
    // Add RTL languages here if needed in the future
    const rtlLanguages: Language[] = [];
    return rtlLanguages.includes(language);
  }, [language]);

  /**
   * Available languages for the application
   */
  const availableLanguages: readonly Language[] = ['es', 'en', 'pt'] as const;

  /**
   * Memoized context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    isRTL,
    availableLanguages
  }), [language, setLanguage, t, isRTL]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Enhanced useLanguage hook with better error handling
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error(
      'useLanguage must be used within a LanguageProvider. ' +
      'Make sure to wrap your component tree with <LanguageProvider>.'
    );
  }
  
  return context;
};

/**
 * Utility function to get translation without hook (for use outside components)
 */
export const getTranslation = (key: string, language: Language = 'es'): string => {
  const translation = translations[language][key as keyof typeof translations[Language]];
  return translation || key;
};

/**
 * Type-safe translation keys (can be extended with specific modules)
 */
export type TranslationKey = keyof typeof translations.es;

/**
 * Utility type for translation parameters
 */
export type TranslationParams = Record<string, string | number>;