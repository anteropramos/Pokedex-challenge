import { Box } from '@mui/material';
import React from 'react';
import { PokemonsHeader } from './PokemonsHeader';
import { PokemonsToCatch } from './PokemonsToCatch';
import { Pokemon } from '../../../types/pokemons';

type PokemonsContainerProps = {
  page: number;
  pokedexProgress: number;
  totalCatchedPokemons: number;
  pokemonsToCatch: Pokemon[];
  handleCatchPokemon: (name: string) => void;
  handleToggleStatsModal: (pokemonName?: string) => void;
  handleChangePage: (page: number) => void;
};

export const PokemonsContainer = ({
  totalCatchedPokemons,
  pokemonsToCatch,
  page,
  pokedexProgress,
  handleCatchPokemon,
  handleChangePage,
  handleToggleStatsModal,
}: PokemonsContainerProps) => {
  return (
    <Box
      sx={{
        padding: '1.6rem',
        width: '100%',
        background: 'linear-gradient(45deg, #FF6F61, #F7EB72)',
        overflowY: 'auto',
        flex: 1,
      }}
    >
      <PokemonsHeader totalCatchedPokemons={totalCatchedPokemons} pokedexProgress={pokedexProgress} />
      <PokemonsToCatch
        page={page}
        pokemonsToCatch={pokemonsToCatch}
        totalCatchedPokemons={totalCatchedPokemons}
        handleCatchPokemon={handleCatchPokemon}
        handleChangePage={handleChangePage}
        handleToggleStatsModal={handleToggleStatsModal}
      />
    </Box>
  );
};
