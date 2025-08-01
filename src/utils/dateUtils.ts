
import { ValidationStatus } from '@/types/validation';

export const calculateExpiryDate = (issueDate: string): string => {
  const issue = new Date(issueDate);
  const expiry = new Date(issue);
  expiry.setFullYear(expiry.getFullYear() + 5);
  return expiry.toISOString().split('T')[0];
};

export const getValidationStatus = (expiryDate: string): ValidationStatus => {
  // Use UTC dates to avoid timezone issues
  const today = new Date();
  const todayUTC = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const expiry = new Date(expiryDate);
  const expiryUTC = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
  
  const diffTime = expiryUTC.getTime() - todayUTC.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'vencido';
  } else if (diffDays <= 90) { // 3 meses
    return 'proximo_vencer';
  } else {
    return 'validado';
  }
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    return date.toLocaleDateString('es-ES');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Fecha inválida';
  }
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  // Use UTC dates to avoid timezone issues
  const today = new Date();
  const todayUTC = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const expiry = new Date(expiryDate);
  const expiryUTC = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
  
  const diffTime = expiryUTC.getTime() - todayUTC.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
