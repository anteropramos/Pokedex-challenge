'use client';

import { Box, Button, Card, styled, Typography } from '@mui/material';
import React from 'react';
import { capitalize } from 'lodash';
import { FormattedLabel } from './pokemons/utils/FormattedLabel';
import { ShareButton } from './pokemons/common/ShareButton';
import { Pokemon } from './types/pokemons';

type CaughtPokemon = {
  pokemon: Pokemon;
  caught: boolean;
  openStatsModal: (pokemonName: string) => void;
  handleCatchPokemon?: (name: string) => void;
};

const StyledCard = styled(Card)`
  cursor: pointer;
  margin: 1rem;
  width: 100%;
  max-width: 300px;
  height: 350px;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledImg = styled('img')<{ caught?: boolean }>`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: all 0.3s ease;

  ${({ caught }) =>
    !caught &&
    `
      filter: grayscale(100%);
      opacity: 0.6;
  `}
`;

export const ToCatchPokemonCard = ({ pokemon, caught, handleCatchPokemon, openStatsModal }: CaughtPokemon) => {
  const handleClickPokemon = () => {
    openStatsModal(pokemon.name);
  };

  const formattedDate = pokemon.capturedDate ? `Captured on ${pokemon.capturedDate}` : 'Not captured yet';

  return (
    <StyledCard>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={handleClickPokemon}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}></Box>
        <StyledImg caught={caught} src={pokemon.image as string} />
        <Typography variant="h6">{capitalize(pokemon.name)}</Typography>
        <FormattedLabel label={formattedDate} />{' '}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleCatchPokemon!(pokemon.name);
          }}
          sx={{
            background: 'linear-gradient(45deg, #FF6F61, #F7EB72)',
          }}
        >
          Catch
        </Button>
        <ShareButton
          toShare={`http://localhost:3000/pokemons/${pokemon.name}`}
          message="Link was copied to clipboard!"
          variant="success"
        />
      </Box>
    </StyledCard>
  );
};
