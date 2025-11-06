import * as React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomAlert({ 
  text = "This is a default alert message!", 
  severity = "info", 
  variant = "filled", 
  color,
  open = false,
  onClose,
  autoHideDuration = 6000,
  ...props 
}) {
  const [internalOpen, setInternalOpen] = React.useState(open);

  // Update internal state when prop changes
  React.useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  const showAlert = () => {
    setInternalOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setInternalOpen(false);
    
    // Call parent's onClose if provided
    if (onClose) {
      onClose(event, reason);
    }
  };

  return (
    <div>
      <Snackbar 
        open={internalOpen} 
        autoHideDuration={autoHideDuration} 
        onClose={handleClose}
        {...props}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant={variant}
          color={color}
          sx={{ width: '100%' }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );

}

// PropTypes for type checking
CustomAlert.propTypes = {
  text: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  autoHideDuration: PropTypes.number,
};
