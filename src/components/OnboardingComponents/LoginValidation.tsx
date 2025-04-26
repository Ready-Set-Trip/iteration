export interface LoginData {
  email: string;
  password: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export function ValidateForm({ email, password }: LoginData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!ValidateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!ValidatePassword(password)) {
    errors.password =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
  }

  return errors;
}

export function ValidateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function ValidatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}
