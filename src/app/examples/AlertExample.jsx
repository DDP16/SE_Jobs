import React from 'react';
import CustomAlert from '../components/common/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import { Button } from '@/components/ui';

// Example: Using CustomAlert with useCustomAlert hook
export default function AlertExample() {
  const {
    alertConfig,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showAlert
  } = useCustomAlert();

  const handleSuccess = () => {
    showSuccess("Operation completed successfully!");
  };

  const handleError = () => {
    showError("Something went wrong!");
  };

  const handleWarning = () => {
    showWarning("Please check your input!");
  };

  const handleInfo = () => {
    showInfo("This is some information for you.");
  };

  const handleCustomAlert = () => {
    showAlert({
      text: "Custom alert with specific styling!",
      severity: "success",
      variant: "outlined",
      color: "primary",
      autoHideDuration: 3000
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Custom Alert Examples</h2>
      
      <div className="space-x-2">
        <Button onClick={handleSuccess} variant="default">
          Show Success
        </Button>
        <Button onClick={handleError} variant="destructive">
          Show Error
        </Button>
        <Button onClick={handleWarning} variant="outline">
          Show Warning
        </Button>
        <Button onClick={handleInfo} variant="secondary">
          Show Info
        </Button>
        <Button onClick={handleCustomAlert} variant="ghost">
          Custom Alert
        </Button>
      </div>

      {/* Custom Alert Component */}
      <CustomAlert
        {...alertConfig}
        onClose={hideAlert}
      />
    </div>
  );
}

/*
// Alternative usage: Direct component usage
function DirectUsageExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Show Alert
      </Button>
      
      <CustomAlert
        text="Direct usage alert!"
        severity="warning"
        variant="filled"
        color="warning"
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={4000}
      />
    </div>
  );
}
*/