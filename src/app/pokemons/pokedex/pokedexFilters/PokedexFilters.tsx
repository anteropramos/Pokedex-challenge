'use client';

import React from 'react';
import { Box, FormControl, Button } from '@mui/material';
import { SortPokemonsButton } from '../../common/SortPokemonsButton';
import { FiltersDropdown } from './PokedexFiltersDropdown';
import { PokedexFilterInputs } from './PokedexFilterInputs';

interface PokedexFiltersProps {
  filter: string;
  filterValue: string;
  sortOption?: string;
  handleChangeFilter: (filter: string) => void;
  handleChangeFilterValue: (filter: string) => void;
  changeSortingOption: (sort: string) => void;
}

export const PokedexFilters = ({
  filter,
  filterValue,
  sortOption,
  handleChangeFilter,
  handleChangeFilterValue,
  changeSortingOption,
}: PokedexFiltersProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <FormControl fullWidth size="small">
        <FiltersDropdown
          filter={filter}
          handleChangeFilter={handleChangeFilter}
          handleChangeFilterValue={handleChangeFilterValue}
        />
      </FormControl>

      <Box sx={{ display: 'flex' }}>
        <PokedexFilterInputs
          filter={filter}
          filterValue={filterValue}
          handleChangeFilterValue={handleChangeFilterValue}
        />

        <Button
          sx={{ marginLeft: '1.2rem' }}
          variant="outlined"
          onClick={() => {
            handleChangeFilterValue('');
          }}
        >
          Clear
        </Button>
        <SortPokemonsButton sortOption={sortOption} changeSortingOption={changeSortingOption} />
      </Box>
    </Box>
  );
};
