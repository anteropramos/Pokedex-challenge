'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';

import { PokemonStatsModal } from './common/PokemonDetailsModal';
import { useManagePokedex } from '../hooks/useManagePokedex';
import { Message } from './utils/Message';
import { Loading } from './utils/Loading';
import { PokemonsContainer } from './pokemons/PokemonsContainer';
import { CaughtPokemonsContainer } from './pokedex/CaughtPokemonsContainer';

export const PokemonMainPage = () => {
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState('');

  const {
    pokedex,
    pokedexProgress,
    pokemonsToCatch,
    isLoading,
    page,
    alertIsOn,
    alertMessage,
    handleReleasePokemons,
    handleCatchPokemon,
    handleChangePage,
    handleAddNoteToPokemon,
  } = useManagePokedex();

  const handleToggleStatsModal = (pokemonName?: string) => {
    setIsStatModalOpen((prevValue) => !prevValue);

    if (typeof pokemonName === 'string') {
      setSelectedPokemon(pokemonName);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { md: '100vh' },
          zIndex: 1,
        }}
      >
        <CaughtPokemonsContainer
          pokemons={pokedex}
          openStatsModal={handleToggleStatsModal}
          handleReleasePokemons={handleReleasePokemons}
        />
        <PokemonsContainer
          page={page}
          pokemonsToCatch={pokemonsToCatch}
          handleCatchPokemon={handleCatchPokemon}
          handleChangePage={handleChangePage}
          handleToggleStatsModal={handleToggleStatsModal}
          pokedexProgress={pokedexProgress}
          totalCatchedPokemons={pokedex.length}
        />
      </Box>

      {isLoading && <Loading />}

      {isStatModalOpen && (
        <PokemonStatsModal
          isOpen={isStatModalOpen}
          closeModal={handleToggleStatsModal}
          pokemonName={selectedPokemon}
          pokedex={pokedex}
          handleAddNoteToPokemon={handleAddNoteToPokemon}
        />
      )}

      {alertIsOn && <Message message={alertMessage.message} variant={alertMessage.severity!} />}
    </>
  );
};
