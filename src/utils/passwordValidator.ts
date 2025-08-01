// Comprehensive password validation utility
// Implements strong password requirements and checks for common weak passwords

interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  score: number; // 0-100
}

// Common weak passwords to reject
const COMMON_PASSWORDS = new Set([
  'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'password1',
  'qwerty123', 'admin123', '12345678', 'Password1', 'Password123',
  'welcome123', 'user123', 'test123', 'demo123', 'super123',
  'Admin123!', 'Super123!', 'Coord123!', 'Analyst123!', 'Viewer123!'
]);

// Sequential patterns to detect
const SEQUENTIAL_PATTERNS = [
  '123456', '654321', 'abcdef', 'fedcba', 'qwerty', 'asdfgh',
  'zxcvbn', '098765', '567890', 'mnbvcx'
];

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];
  let score = 0;

  // Basic length check (minimum 8 characters for better security)
  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  } else if (password.length >= 8) {
    score += 10;
  }

  if (password.length >= 12) {
    score += 10; // Bonus for longer passwords
  }

  // Character variety checks
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);

  if (!hasLowercase) {
    errors.push('La contraseña debe contener al menos una letra minúscula');
  } else {
    score += 10;
  }

  if (!hasUppercase) {
    errors.push('La contraseña debe contener al menos una letra mayúscula');
  } else {
    score += 10;
  }

  if (!hasNumbers) {
    errors.push('La contraseña debe contener al menos un número');
  } else {
    score += 15;
  }

  if (!hasSpecialChars) {
    errors.push('La contraseña debe contener al menos un carácter especial (!@#$%^&*...)');
  } else {
    score += 15;
  }

  // Check for common passwords
  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    errors.push('Esta contraseña es demasiado común y fácil de adivinar');
    score = Math.max(0, score - 30);
  }

  // Check for sequential patterns
  const lowerPassword = password.toLowerCase();
  for (const pattern of SEQUENTIAL_PATTERNS) {
    if (lowerPassword.includes(pattern)) {
      errors.push('La contraseña no debe contener secuencias comunes (123456, qwerty, etc.)');
      score = Math.max(0, score - 20);
      break;
    }
  }

  // Check for repeated characters
  const repeatedChars = /(.)\1{2,}/.test(password);
  if (repeatedChars) {
    errors.push('La contraseña no debe contener más de 2 caracteres consecutivos iguales');
    score = Math.max(0, score - 15);
  }

  // Check for personal information patterns (basic check)
  const hasPersonalInfo = checkPersonalInfo(password);
  if (hasPersonalInfo) {
    errors.push('La contraseña no debe contener información personal obvia');
    score = Math.max(0, score - 20);
  }

  // Bonus points for character variety
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.7) {
    score += 10; // Good character variety
  }

  // Calculate strength based on score
  let strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  if (score < 30) {
    strength = 'weak';
  } else if (score < 60) {
    strength = 'medium';
  } else if (score < 80) {
    strength = 'strong';
  } else {
    strength = 'very-strong';
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    score: Math.min(100, score)
  };
};

// Check for basic personal information patterns
const checkPersonalInfo = (password: string): boolean => {
  const lowerPassword = password.toLowerCase();
  
  // Check for common personal info patterns
  const personalPatterns = [
    /admin/i, /user/i, /test/i, /demo/i, /company/i,
    /\d{4}/, // Years like 2024, 1990, etc.
    /enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/i,
    /january|february|march|april|may|june|july|august|september|october|november|december/i
  ];

  return personalPatterns.some(pattern => pattern.test(password));
};

// Generate password strength indicator text
export const getPasswordStrengthText = (strength: string): string => {
  switch (strength) {
    case 'weak':
      return 'Muy débil';
    case 'medium':
      return 'Débil';
    case 'strong':
      return 'Fuerte';
    case 'very-strong':
      return 'Muy fuerte';
    default:
      return 'Desconocido';
  }
};

// Generate password strength color
export const getPasswordStrengthColor = (strength: string): string => {
  switch (strength) {
    case 'weak':
      return 'text-red-600';
    case 'medium':
      return 'text-orange-600';
    case 'strong':
      return 'text-green-600';
    case 'very-strong':
      return 'text-green-700';
    default:
      return 'text-gray-600';
  }
};