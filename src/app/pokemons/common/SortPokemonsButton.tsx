import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { capitalize } from 'lodash';

interface SortButtonProps {
  sort: string | undefined;
  changeSortingOption: (sort: string) => void;
}

export enum SORT_OPTIONS {
  CAPTURED_DATE_DESCENDING = 'captured-date-descending',
  CAPTURED_DATE_ASCENDING = 'captured-date-ascending',
  NAME_ASCENDING = 'name-ascending',
  NAME_DESCENDING = 'name-descending',
}

export const SortPokemonsButton = ({ sort, changeSortingOption }: SortButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSortOption = (option: string) => {
    changeSortingOption(option);
    handleClose();
  };

  return (
    <>
      <Button id="sort-button" onClick={handleClick}>
        <SortIcon />
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'sort-button' }}
      >
        {Object.entries(SORT_OPTIONS).map(([key, value]) => (
          <MenuItem key={key} onClick={() => handleChangeSortOption(value)} selected={sort === value}>
            {capitalize(key.split('_').join(' '))}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
