import { format } from 'date-fns';

export const formatDate = (value?: string) => {
  if (value) {
    return format(new Date(value), 'yyyy/MM/dd HH:mm');
  }

  return format(new Date(), 'yyyy/MM/dd HH:mm');
};
