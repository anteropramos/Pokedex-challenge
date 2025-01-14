import { Typography, Box } from '@mui/material';
import React from 'react';
import { PokedexProgressBar } from '../common/ProgressBar';

type PokemonsHeaderProps = {
  pokedexProgress: number;
  totalCatchedPokemons: number;
};

export const PokemonsHeader = ({ totalCatchedPokemons, pokedexProgress }: PokemonsHeaderProps) => {
  const offline = !navigator.onLine;

  return (
    <>
      {offline && <Typography variant="h4">You&apos;re using offline mode!</Typography>}
      <Typography variant="h4">To catch</Typography>
      <Box sx={{ margin: 'auto', width: '50%' }}>
        <PokedexProgressBar pokedexProgress={pokedexProgress} pokedexTotalPokemons={totalCatchedPokemons} />
      </Box>
    </>
  );
};
