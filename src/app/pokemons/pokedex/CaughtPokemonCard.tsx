import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react';
import { capitalize } from 'lodash';
import Checkbox from '@mui/material/Checkbox';
import { FormattedLabel } from '../utils/FormattedLabel';
import { ShareButton } from '../common/ShareButton';
import { Pokemon } from '../../types/pokemons';

type CaughtPokemon = {
  pokemon: Pokemon;
  openStatsModal: (pokemonName: string) => void;
  handleSelectPokemons: (pokemonName: string) => void;
};

export const CaughtPokemonCard = ({ pokemon, handleSelectPokemons, openStatsModal }: CaughtPokemon) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClickPokemon = () => {
    openStatsModal(pokemon.name);
  };

  const handleSelectPokemon = (pokemonName: string) => {
    setIsSelected((prevValue) => !prevValue);
    handleSelectPokemons(pokemonName);
  };

  const formattedDate = pokemon.capturedDate || 'Not captured yet';

  return (
    <Card sx={{ display: 'flex', marginBottom: '1.2rem', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }} onClick={handleClickPokemon}>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100 }}
          image={pokemon.image as string}
          alt={pokemon.name}
          loading='lazy'
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0.6rem' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {capitalize(pokemon.name)}
            </Typography>
            <FormattedLabel label={`Captured on: ${formattedDate}`}></FormattedLabel>
          </CardContent>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignContent: 'center' }}>
        <Checkbox
          checked={isSelected}
          onChange={() => {
            handleSelectPokemon(pokemon.name);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <ShareButton
          toShare={`http://localhost:3000/pokemons/${pokemon.name}`}
          message="Link was copied to clipboard!"
          variant="success"
        />
      </Box>
    </Card>
  );
};
