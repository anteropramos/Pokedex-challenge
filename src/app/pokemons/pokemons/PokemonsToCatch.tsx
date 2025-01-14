import React from 'react';
import Grid from '@mui/material/Grid2';
import { Pagination, Typography } from '@mui/material';
import { LOCAL_STORAGE_VALUES, PAGE_LIMIT } from '../../constants';
import { ToCatchPokemonCard } from '../../ToCatchPokemonCard';
import { Pokemon } from '../../types/pokemons';
import { getFromLocalStorage } from '../../utils/localStorage';

type PokemonsToCatchProps = {
  pokemonsToCatch: Pokemon[];
  page: number;
  totalCatchedPokemons: number;
  handleCatchPokemon: (name: string) => void;
  handleToggleStatsModal: (pokemonName?: string) => void;
  handleChangePage: (page: number) => void;
};

export const PokemonsToCatch = ({
  page,
  pokemonsToCatch,
  totalCatchedPokemons,
  handleCatchPokemon,
  handleToggleStatsModal,
  handleChangePage,
}: PokemonsToCatchProps) => {
  const totalPokemons = getFromLocalStorage(LOCAL_STORAGE_VALUES.TOTAL_POKEMONS) as number;

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    handleChangePage(value);
  };

  const paginationComponent = (
    <Pagination
      page={page}
      count={Math.floor((totalPokemons - totalCatchedPokemons - 1) / PAGE_LIMIT)}
      sx={{ justifySelf: 'center' }}
      onChange={onChangePage}
    />
  );

  return (
    <>
      {paginationComponent}
      {pokemonsToCatch.length === 0 ? (
        <Typography>You&apos;ve catched&apos;em all!&apos;</Typography>
      ) : (
        <Grid container spacing={2}>
          {(pokemonsToCatch || []).map((pokemon, index) => (
            <Grid key={`${pokemon.name}-${index}`} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
              <ToCatchPokemonCard
                key={`${pokemon.name}-${index}`}
                pokemon={pokemon}
                caught={false}
                openStatsModal={handleToggleStatsModal}
                handleCatchPokemon={handleCatchPokemon}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {paginationComponent}
    </>
  );
};
