export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const getValidationMessage = (field: string, value: string): string => {
  switch (field) {
    case 'name':
      if (!validateRequired(value)) return 'Name is required';
      if (!validateName(value)) return 'Name must be between 2 and 50 characters';
      return '';
    case 'email':
      if (!validateRequired(value)) return 'Email is required';
      if (!validateEmail(value)) return 'Please enter a valid email address';
      return '';
    case 'courses':
      if (!validateRequired(value)) return 'At least one course must be selected';
      return '';
    default:
      return '';
  }
};