import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Pokemon } from '../../../types/pokemons';

interface SettingsButtonProps {
  pokemons: Pokemon[];
}

export const PokemonSettingsButton = ({ pokemons }: SettingsButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const exportPokemonsAsCSV = () => {
    if (pokemons?.length === 0) {
      return;
    }

    const headers = Object.keys(pokemons[0]);
    const csvRows: string[] = [];

    csvRows.push(headers.join(','));

    pokemons.forEach((pokemon) => {
      const row = headers.map((header) => {
        const value = pokemon[header as keyof Pokemon];
        return value;
      });

      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'pokemons.csv');
    document.body.appendChild(link);

    link.click();
  };

  return (
    <>
      <Button id="sort-button" onClick={handleClick}>
        <SettingsIcon />
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'sort-button' }}
      >
        <MenuItem
          onClick={() => {
            exportPokemonsAsCSV();
          }}
        >
          Export Pokédex As CSV
        </MenuItem>
      </Menu>
    </>
  );
};
