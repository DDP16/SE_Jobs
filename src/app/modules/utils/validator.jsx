export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  return confirmPassword === password;
};

// Check that a value is present (non-empty after trimming)
export const validateRequired = (value) => {
  return value !== undefined && value !== null && String(value).trim() !== "";
};

// Year validator: numeric and within reasonable bounds (default 2000..currentYear)
export const validateYear = (year, min = 2000, max = new Date().getFullYear()) => {
  if (year === null || year === undefined || String(year).trim() === "") return false;
  const y = parseInt(String(year).replace(/^0+/, ""), 10);
  return !isNaN(y) && y >= min && y <= max;
};

// Month validator: accept 1-12 or '01'..'12'
export const validateMonth = (month) => {
  if (month === null || month === undefined || String(month).trim() === "") return false;
  const m = parseInt(String(month).replace(/^0+/, ""), 10);
  return !isNaN(m) && m >= 1 && m <= 12;
};

// Validate that end date is the same or after start date.
// If endYear is missing, returns true (useful when "currently studying" is allowed).
export const validateDateOrder = (startYear, startMonth, endYear, endMonth) => {
  if (!startYear || !endYear) return true;
  const sy = parseInt(startYear, 10);
  const ey = parseInt(endYear, 10);
  if (isNaN(sy) || isNaN(ey)) return false;
  if (ey > sy) return true;
  if (ey < sy) return false;
  // same year -> compare months when provided (if missing months, consider valid)
  if (!startMonth || !endMonth) return true;
  const sm = parseInt(startMonth, 10);
  const em = parseInt(endMonth, 10);
  if (isNaN(sm) || isNaN(em)) return false;
  return em >= sm;
};

// Simple phone validator (international-ish, allows +, digits, spaces, dashes, parentheses)
export const validatePhone = (phone) => {
  if (!phone) return false;
  const p = String(phone).trim();
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  return phoneRegex.test(p);
};

// URL validator using the URL constructor
export const validateURL = (value) => {
  if (!value) return false;
  try {
    const u = new URL(String(value));
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

export const validateMinLength = (value, min) => {
  if (value === null || value === undefined) return false;
  return String(value).trim().length >= Number(min || 0);
};

export const validateMaxLength = (value, max) => {
  if (value === null || value === undefined) return true;
  return String(value).trim().length <= Number(max || Infinity);
};
