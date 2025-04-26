export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
}

export function ValidateFormForSignUp({
  name,
  email,
  password,
}: SignUpData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!ValidateName(name)) {
    errors.name = 'Invalid name format';
  }
  if (!ValidateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!ValidatePassword(password)) {
    errors.password =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
  }

  return errors;
}

export function ValidateName(name: string): boolean {
  const pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
  return pattern.test(name);
}

export function ValidateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function ValidatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}
