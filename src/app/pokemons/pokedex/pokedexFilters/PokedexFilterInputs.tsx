'use client';

import React from 'react';
import { Select, MenuItem, TextField, capitalize } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { HEIGHTS, POKEDEX_FILTERS } from '../../../../constants/sortAndFilter';

interface PokedexFiltersProps {
  filter: string;
  filterValue: string;
  handleChangeFilterValue: (filter: string) => void;
}

export const PokedexFilterInputs = ({ filter, filterValue, handleChangeFilterValue }: PokedexFiltersProps) => {
  return (
    <>
      {filter === POKEDEX_FILTERS.NAME && (
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
      {filter === POKEDEX_FILTERS.CAPTURED_DATE && (
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
      {filter === POKEDEX_FILTERS.HEIGHT_TYPE && (
        <Select
          value={filterValue}
          size="small"
          onChange={({ target }) => {
            handleChangeFilterValue(target.value);
          }}
          sx={{
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <MenuItem value={HEIGHTS.SMALL}>{capitalize(HEIGHTS.SMALL)}</MenuItem>
          <MenuItem value={HEIGHTS.MEDIUM}>{capitalize(HEIGHTS.MEDIUM)}</MenuItem>
          <MenuItem value={HEIGHTS.BIG}>{capitalize(HEIGHTS.BIG)}</MenuItem>
        </Select>
      )}
    </>
  );
};
