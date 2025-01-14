'use client';

import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { SortPokemonsButton } from '../common/SortPokemonsButton';

interface PokemonFiltersProps {
  filter: string;
  filterValue: string;
  sort?: string;
  handleChangeFilter: (filter: string) => void;
  handleChangeFilterValue: (filter: string) => void;
  changeSortingOption: (sort: string) => void;
}

export const PokemonFilters = ({
  filter,
  filterValue,
  handleChangeFilter,
  handleChangeFilterValue,
  sort,
  changeSortingOption,
}: PokemonFiltersProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="filter-label">Filter By</InputLabel>
        <Select
          value={filter}
          label="Filter By"
          onChange={({ target }) => {
            handleChangeFilter(target.value);
          }}
          sx={{
            backgroundColor: 'white',
          }}
        >
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'captured-date'}>Captured Date</MenuItem>
          <MenuItem value={'height-types'}>Height Types</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex' }}>
        {filter === 'name' && (
          <TextField
            fullWidth
            size="small"
            label="Filter Value"
            value={filterValue}
            onChange={({ target }) => {
              handleChangeFilterValue(target.value);
            }}
            placeholder={`Enter ${filter}...`}
            sx={{
              backgroundColor: 'white',
            }}
          />
        )}
        {filter === 'captured-date' && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Pick a date"
              value={new Date(filterValue)}
              onChange={(newValue) => {
                const formattedDate = format(newValue!, 'MM-dd-yyyy hh:mm');
                handleChangeFilterValue(formattedDate);
              }}
              sx={{ width: '100%', backgroundColor: 'white' }}
            />
          </LocalizationProvider>
        )}
        <SortPokemonsButton sort={sort} changeSortingOption={changeSortingOption} />
      </Box>
    </Box>
  );
};
