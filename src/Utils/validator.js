
export const validateUsername = (username) => {
  if (!username || username.trim() === '') {
    return 'Username is required';
  }

  const value = username.trim();

  if (value.length < 3) {
    return 'Username must be at least 3 characters';
  }

  if (value.length > 30) {
    return 'Username must not exceed 30 characters';
  }


  const usernameRegex = /^[A-Za-z]+(?: [A-Za-z]+)?$/;

  if (!usernameRegex.test(value)) {
    return 'Username can contain only letters and one space between two words';
  }

  return null;
};


// Email
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }

  const value = email.trim();

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }

  return null;
};


export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be more than 8 characters';
  }

  if (password.length > 16) {
    return 'Password must not exceed 16 characters';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one capital letter';
  }

  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }

  return null;
};


export const validateConfirmPassword = (
  password,
  confirmPassword
) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return null;
};
export const validateOtp = (otp) => {
  if (!otp || otp.trim() === '') {
    return 'OTP is required';
  }

  const value = otp.trim();

  if (value.length < 6) {
    return 'OTP must be at 6 characters';
  }

  if (value.length >6) {
    return 'OTP must not exceed 6 characters';
  }


  const otpRegex =/^\d{6}$/;

  if (!otpRegex.test(value)) {
    return 'OTP can contain only digits';
  }

  return null;
};
