'use client';

import { Box, Button, Card, styled, Typography } from '@mui/material';
import React from 'react';
import { capitalize } from 'lodash';
import { FormattedLabel } from '../utils/FormattedLabel';
import { ShareButton } from '../common/ShareButton';
import { Pokemon } from '../../../types/pokemons';
import Image from 'next/image';
import { StyledPokemonCardStyles } from './PokemonStyles';

type CaughtPokemon = {
  pokemon: Pokemon;
  openStatsModal: (pokemonName: string) => void;
  handleCatchPokemon?: (name: string) => void;
};

const StyledImg = styled(Image)`
  width: 100%;
  height: 150px;
  object-fit: cover;
  filter: grayscale(100%);
  opacity: 0.6;
`;

export const ToCatchPokemonCard = ({ pokemon, handleCatchPokemon, openStatsModal }: CaughtPokemon) => {
  const handleClickPokemon = () => {
    openStatsModal(pokemon.name);
  };

  const formattedDate = pokemon.capturedDate ? `Captured on ${pokemon.capturedDate}` : 'Not captured yet';

  return (
    <Card sx={StyledPokemonCardStyles}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={handleClickPokemon}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}></Box>
        <StyledImg src={pokemon.image as string} alt={pokemon.name} width={300} height={350} />
        <Typography variant="h6">{capitalize(pokemon.name)}</Typography>
        <FormattedLabel label={formattedDate} />{' '}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Button
          id={`to-catch-${pokemon.name}`}
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
    </Card>
  );
};
