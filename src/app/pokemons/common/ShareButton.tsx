import { AlertColor, IconButton } from '@mui/material';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { useAlert } from '../../hooks/useAlert';
import { Message } from '../utils/Message';

type ShareButtonProps = {
  toShare: string;
  message: string;
  variant: AlertColor;
};

export const ShareButton = ({ toShare, message, variant }: ShareButtonProps) => {
  const { alertIsOn, showAlert } = useAlert();

  return (
    <>
      <IconButton
        onClick={() => {
          navigator.clipboard.writeText(toShare);
          showAlert(message, variant);
        }}
      >
        <ShareIcon />
      </IconButton>
      {alertIsOn && <Message message={message} variant={'success'} />}
    </>
  );
};
