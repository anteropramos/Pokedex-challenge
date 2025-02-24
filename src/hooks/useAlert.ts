import { useState } from 'react';
import { AlertColor } from '@mui/material';
import { AlertMessage } from '../types/common';

export const useAlert = () => {
  const [alertIsOn, setAlertIsOn] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({ message: '' });

  const showAlert = (message: string, severity: AlertColor) => {
    setAlertIsOn(true);
    setAlertMessage({ message, severity });

    setTimeout(() => {
      setAlertIsOn(false);
    }, 3000);
  };

  return { alertIsOn, alertMessage, showAlert };
};
