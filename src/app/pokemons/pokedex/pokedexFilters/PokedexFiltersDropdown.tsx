import { InputLabel, Select, MenuItem } from '@mui/material';

import React from 'react';
import { POKEDEX_FILTERS } from '../../../../constants/sortAndFilter';

type FiltersDropdownProps = {
  filter: string;
  handleChangeFilter: (filter: string) => void;
  handleChangeFilterValue: (filter: string) => void;
};

export const FiltersDropdown = ({ filter, handleChangeFilter, handleChangeFilterValue }: FiltersDropdownProps) => {
  return (
    <>
      <InputLabel id="filter-label">Filter By</InputLabel>
      <Select
        value={filter}
        label="Filter By"
        onChange={({ target }) => {
          handleChangeFilter(target.value);
          handleChangeFilterValue('');
        }}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <MenuItem value={POKEDEX_FILTERS.NAME}>Name</MenuItem>
        <MenuItem value={POKEDEX_FILTERS.CAPTURED_DATE}>Captured Date</MenuItem>
        <MenuItem value={POKEDEX_FILTERS.HEIGHT_TYPE}>Height Types</MenuItem>
      </Select>
    </>
  );
};
