
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
    'menu.settings': 'Configuración',
    
    // Stats
    'stats.total': 'Total Validaciones',
    'stats.validated': 'Validadas',
    'stats.expiring': 'Próximas a Vencer',
    'stats.expired': 'Vencidas',
    
    // Filters
    'filters.title': 'Filtros de Búsqueda',
    'filters.clear': 'Limpiar Filtros',
    'filters.productType': 'Tipo de Producto',
    'filters.equipmentType': 'Equipo Analítico',
    'filters.validationType': 'Tipo de Validación',
    'filters.status': 'Estado',
    'filters.productCode': 'Código de Producto',
    'filters.validationCode': 'Código de Validación',
    'filters.expiryFrom': 'Vencimiento Desde',
    'filters.expiryTo': 'Vencimiento Hasta',
    
    // Product Types
    'product.terminado': 'Producto Terminado',
    'product.materia': 'Materia Prima',
    'product.envase': 'Material de Envase',
    
    // Validation Types
    'validation.procesos': 'Procesos',
    'validation.limpieza': 'Limpieza',
    'validation.metodos': 'Métodos Analíticos',
    
    // Status
    'status.validado': 'Validado',
    'status.proximo': 'Próximo a Vencer',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'En Revalidación',
    'status.en_validacion': 'En Validación',
    'status.por_revalidar': 'Por Revalidar',
    'status.primera_revision': 'Primera Revisión',
    'status.segunda_revision': 'Segunda Revisión',
    
    // Dashboard
    'dashboard.quickSearch': 'Búsqueda Rápida',
    'dashboard.searchPlaceholder': 'Buscar por código de producto o validación...',
    'dashboard.recent': 'Validaciones Recientes',
    'dashboard.equipment': 'Equipo',
    'dashboard.expires': 'Vence',
    'dashboard.days': 'días',
    'dashboard.analytics': 'Análisis de Validaciones',
    'dashboard.byType': 'Por Tipo de Validación',
    'dashboard.byStatus': 'Por Estado',
    'dashboard.byEquipment': 'Por Equipo',
    
    // Validations Module
    'validations.subtitle': 'Gestiona Las Validaciones Del Sistema',
    'validations.new': 'Nueva Validación',
    'validations.completed': 'Validaciones Completadas',
    'validations.next30days': 'En Los Próximos 30 Días',
    'validations.immediate': 'Requieren Atención Inmediata',
    'validations.protocols': 'Protocolos Realizados',
    'validations.withDocumentation': 'Con Documentación',
    
    // Common
    'select.placeholder': 'Seleccionar',
    'search.placeholder': 'Buscar',
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
    'menu.settings': 'Settings',
    
    // Stats
    'stats.total': 'Total Validations',
    'stats.validated': 'Validated',
    'stats.expiring': 'Expiring Soon',
    'stats.expired': 'Expired',
    
    // Filters
    'filters.title': 'Search Filters',
    'filters.clear': 'Clear Filters',
    'filters.productType': 'Product Type',
    'filters.equipmentType': 'Analytical Equipment',
    'filters.validationType': 'Validation Type',
    'filters.status': 'Status',
    'filters.productCode': 'Product Code',
    'filters.validationCode': 'Validation Code',
    'filters.expiryFrom': 'Expiry From',
    'filters.expiryTo': 'Expiry To',
    
    // Product Types
    'product.terminado': 'Finished Product',
    'product.materia': 'Raw Material',
    'product.envase': 'Packaging Material',
    
    // Validation Types
    'validation.procesos': 'Processes',
    'validation.limpieza': 'Cleaning',
    'validation.metodos': 'Analytical Methods',
    
    // Status
    'status.validado': 'Validated',
    'status.proximo': 'Expiring Soon',
    'status.vencido': 'Expired',
    'status.revalidacion': 'Under Revalidation',
    'status.en_validacion': 'Under Validation',
    'status.por_revalidar': 'Pending Revalidation',
    'status.primera_revision': 'First Review',
    'status.segunda_revision': 'Second Review',
    
    // Dashboard
    'dashboard.quickSearch': 'Quick Search',
    'dashboard.searchPlaceholder': 'Search by product or validation code...',
    'dashboard.recent': 'Recent Validations',
    'dashboard.equipment': 'Equipment',
    'dashboard.expires': 'Expires',
    'dashboard.days': 'days',
    'dashboard.analytics': 'Validation Analytics',
    'dashboard.byType': 'By Validation Type',
    'dashboard.byStatus': 'By Status',
    'dashboard.byEquipment': 'By Equipment',
    
    // Validations Module
    'validations.subtitle': 'Manage System Validations',
    'validations.new': 'New Validation',
    'validations.completed': 'Completed Validations',
    'validations.next30days': 'In The Next 30 Days',
    'validations.immediate': 'Require Immediate Attention',
    'validations.protocols': 'Protocols Completed',
    'validations.withDocumentation': 'With Documentation',
    
    // Common
    'select.placeholder': 'Select',
    'search.placeholder': 'Search',
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
    'menu.settings': 'Configurações',
    
    // Stats
    'stats.total': 'Total de Validações',
    'stats.validated': 'Validadas',
    'stats.expiring': 'Próximas ao Vencimento',
    'stats.expired': 'Vencidas',
    
    // Filters
    'filters.title': 'Filtros de Busca',
    'filters.clear': 'Limpar Filtros',
    'filters.productType': 'Tipo de Produto',
    'filters.equipmentType': 'Equipamento Analítico',
    'filters.validationType': 'Tipo de Validação',
    'filters.status': 'Status',
    'filters.productCode': 'Código do Produto',
    'filters.validationCode': 'Código de Validação',
    'filters.expiryFrom': 'Vencimento De',
    'filters.expiryTo': 'Vencimento Até',
    
    // Product Types
    'product.terminado': 'Produto Acabado',
    'product.materia': 'Matéria Prima',
    'product.envase': 'Material de Embalagem',
    
    // Validation Types
    'validation.procesos': 'Processos',
    'validation.limpieza': 'Limpeza',
    'validation.metodos': 'Métodos Analíticos',
    
    // Status
    'status.validado': 'Validado',
    'status.proximo': 'Próximo ao Vencimento',
    'status.vencido': 'Vencido',
    'status.revalidacion': 'Em Revalidação',
    'status.en_validacion': 'Em Validação',
    'status.por_revalidar': 'Pendente de Revalidação',
    'status.primera_revision': 'Primeira Revisão',
    'status.segunda_revision': 'Segunda Revisão',
    
    // Dashboard
    'dashboard.quickSearch': 'Busca Rápida',
    'dashboard.searchPlaceholder': 'Buscar por código de produto ou validação...',
    'dashboard.recent': 'Validações Recentes',
    'dashboard.equipment': 'Equipamento',
    'dashboard.expires': 'Vence',
    'dashboard.days': 'dias',
    'dashboard.analytics': 'Análise de Validações',
    'dashboard.byType': 'Por Tipo de Validação',
    'dashboard.byStatus': 'Por Status',
    'dashboard.byEquipment': 'Por Equipamento',
    
    // Validations Module
    'validations.subtitle': 'Gerencie as Validações do Sistema',
    'validations.new': 'Nova Validação',
    'validations.completed': 'Validações Concluídas',
    'validations.next30days': 'Nos Próximos 30 Dias',
    'validations.immediate': 'Requerem Atenção Imediata',
    'validations.protocols': 'Protocolos Realizados',
    'validations.withDocumentation': 'Com Documentação',
    
    // Common
    'select.placeholder': 'Selecionar',
    'search.placeholder': 'Buscar',
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
