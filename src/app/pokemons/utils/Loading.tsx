import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};
