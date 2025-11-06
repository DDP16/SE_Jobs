import { useState, useCallback } from 'react';

export const useCustomAlert = () => {
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    text: '',
    severity: 'info',
    variant: 'filled',
    color: undefined,
    autoHideDuration: 6000,
  });

  const showAlert = useCallback(({
    text = '',
    severity = 'info',
    variant = 'filled',
    color,
    autoHideDuration = 6000,
  }) => {
    setAlertConfig({
      open: true,
      text,
      severity,
      variant,
      color,
      autoHideDuration,
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlertConfig(prev => ({
      ...prev,
      open: false,
    }));
  }, []);

  // Shorthand methods for different alert types
  const showSuccess = useCallback((text, options = {}) => {
    showAlert({ text, severity: 'success', ...options });
  }, [showAlert]);

  const showError = useCallback((text, options = {}) => {
    showAlert({ text, severity: 'error', ...options });
  }, [showAlert]);

  const showWarning = useCallback((text, options = {}) => {
    showAlert({ text, severity: 'warning', ...options });
  }, [showAlert]);

  const showInfo = useCallback((text, options = {}) => {
    showAlert({ text, severity: 'info', ...options });
  }, [showAlert]);

  return {
    alertConfig,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};