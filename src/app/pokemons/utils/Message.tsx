import { Alert, AlertColor, Box } from '@mui/material';
import React from 'react';

type MessageProps = {
  message: string;
  variant: AlertColor;
};

export const Message = ({ message, variant }: MessageProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}
    >
      <Alert severity={variant}>{message}</Alert>
    </Box>
  );
};
