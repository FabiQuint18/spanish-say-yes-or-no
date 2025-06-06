
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types/validation';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
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
    
    // Dashboard
    'dashboard.quickSearch': 'Búsqueda Rápida',
    'dashboard.searchPlaceholder': 'Buscar por código de producto o validación...',
    'dashboard.recent': 'Validaciones Recientes',
    'dashboard.equipment': 'Equipo',
    'dashboard.expires': 'Vence',
    'dashboard.days': 'días',
    
    // Common
    'select.placeholder': 'Seleccionar',
    'search.placeholder': 'Buscar'
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
    
    // Dashboard
    'dashboard.quickSearch': 'Quick Search',
    'dashboard.searchPlaceholder': 'Search by product or validation code...',
    'dashboard.recent': 'Recent Validations',
    'dashboard.equipment': 'Equipment',
    'dashboard.expires': 'Expires',
    'dashboard.days': 'days',
    
    // Common
    'select.placeholder': 'Select',
    'search.placeholder': 'Search'
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
    
    // Dashboard
    'dashboard.quickSearch': 'Busca Rápida',
    'dashboard.searchPlaceholder': 'Buscar por código de produto ou validação...',
    'dashboard.recent': 'Validações Recentes',
    'dashboard.equipment': 'Equipamento',
    'dashboard.expires': 'Vence',
    'dashboard.days': 'dias',
    
    // Common
    'select.placeholder': 'Selecionar',
    'search.placeholder': 'Buscar'
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
