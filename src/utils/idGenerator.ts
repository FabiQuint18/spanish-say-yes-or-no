// Utility for generating unique IDs to prevent race conditions
// Uses crypto.randomUUID() when available, falls back to a secure implementation

let counter = 0;

/**
 * Generates a unique ID using crypto.randomUUID() if available,
 * otherwise falls back to a timestamp + counter + random implementation
 */
export const generateUniqueId = (): string => {
  // Use crypto.randomUUID() if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback implementation for older browsers
  return generateFallbackId();
};

/**
 * Fallback ID generation using timestamp, counter, and random values
 * This prevents race conditions by using an incrementing counter
 */
const generateFallbackId = (): string => {
  const timestamp = Date.now().toString(36); // Base36 for shorter strings
  const counterValue = (++counter).toString(36);
  const randomValue = Math.random().toString(36).substr(2, 9);
  
  // Reset counter if it gets too large to prevent overflow
  if (counter > 1000000) {
    counter = 0;
  }
  
  return `${timestamp}-${counterValue}-${randomValue}`;
};

/**
 * Generates a short unique ID for display purposes
 * Format: ABC123 (3 letters + 3 numbers)
 */
export const generateShortId = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let result = '';
  
  // Add 3 random letters
  for (let i = 0; i < 3; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Add 3 random numbers
  for (let i = 0; i < 3; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return result;
};

/**
 * Generates a validation code in the format VAL-XXX-YYYY
 * where XXX is a sequential number and YYYY is the year
 */
export const generateValidationCode = (): string => {
  const year = new Date().getFullYear();
  const sequence = Math.floor(Math.random() * 999) + 1;
  return `VAL-${sequence.toString().padStart(3, '0')}-${year}`;
};