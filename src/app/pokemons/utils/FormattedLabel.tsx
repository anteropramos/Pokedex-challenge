import { Typography } from '@mui/material';
import React from 'react';

type FormattedLabelProps = { label: string };

export const FormattedLabel = ({ label }: FormattedLabelProps) => {
  return (
    <Typography
      variant="body2"
      sx={{
        textAlign: 'center',
        color: 'grey',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
    >
      {label}
    </Typography>
  );
};
