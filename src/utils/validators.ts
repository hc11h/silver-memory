/**
 * Check if string is a valid email address
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};

/**
 * Validate phone number (E.164 international standard)
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const regex = /^\+?[1-9]\d{7,14}$/;
  return regex.test(phone);
};

/**
 * Check if a string is a valid UUID v4
 */
export const isValidUUID = (uuid: string): boolean => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

/**
 * Check if a string is a valid ISO 8601 date
 */
export const isValidISODate = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Check if a string is a valid URL
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Check if a string is a valid username (alphanumeric + underscores, 3-20 chars)
 */
export const isValidUsername = (username: string): boolean => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

/**
 * Check if a password is strong enough
 * Must include: min 8 chars, 1 upper, 1 lower, 1 number, 1 special
 */
export const isStrongPassword = (password: string): boolean => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}])[A-Za-z\d@$!%*?&()[\]{}]{8,}$/;
  return regex.test(password);
};

/**
 * Check if a string is alphanumeric only
 */
export const isAlphanumeric = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(value);
};

/**
 * Check if a string is numeric
 */
export const isNumeric = (value: string): boolean => {
  return /^\d+$/.test(value);
};
