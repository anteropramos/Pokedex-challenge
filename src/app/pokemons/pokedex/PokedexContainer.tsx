'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import { PokedexFilters } from './pokedexFilters/PokedexFilters';
import { PokedexCard } from './PokedexCard';
import { PokemonSettingsButton } from '../common/PokemonSettingsButton';
import {
  FilterContainerStyles,
  PokedexContainerStyles,
  ReleasePokemonButtonStyles,
  ReleaseTitleStyles,
  StickyContainerStyles,
} from './PokedexStyles';
import { Pokemon } from '../../../types/pokemons';
import { filterPokemons, sortPokemons } from '../../../utils/sortingAndFiltering';
import { POKEDEX_FILTERS } from '../../../constants/sortAndFilter';

interface PokedexContainerProps {
  pokemons: Pokemon[];
  openStatsModal: (pokemonName: string) => void;
  handleReleasePokemons: (name: string[]) => void;
}

export const PokedexContainer = ({ pokemons, handleReleasePokemons, openStatsModal }: PokedexContainerProps) => {
  const [filter, setFilter] = useState(POKEDEX_FILTERS.NAME);
  const [filterValue, setFilterValue] = useState<string>('');

  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(pokemons || []);

  const [sortOption, setSortOption] = useState<string | undefined>();

  const filteredAndSortedPokemons = useMemo(() => {
    let updatedPokemons = [...pokemons];

    if (filter && filterValue) {
      updatedPokemons = filterPokemons(filter, filterValue, updatedPokemons);
    }

    if (sortOption) {
      updatedPokemons = sortPokemons(sortOption, updatedPokemons);
    }

    return updatedPokemons;
  }, [filter, filterValue, pokemons, sortOption]);

  useEffect(() => {
    setFilteredPokemons(filteredAndSortedPokemons);
  }, [filteredAndSortedPokemons]);

  const handleSelectPokemons = (name: string) => {
    const foundPokemonIndex = selectedPokemons.findIndex((selectedPokemon) => selectedPokemon === name);
    if (foundPokemonIndex !== -1) {
      setSelectedPokemons((prevValue) => prevValue.filter((selectedPokemon) => selectedPokemon !== name));
      return;
    }

    setSelectedPokemons((prevValue) => [...prevValue, name]);
  };

  const releasePokemons = () => {
    handleReleasePokemons(selectedPokemons);
    setSelectedPokemons([]);
  };

  const handleChangeFilter = (filter: string) => {
    setFilter(filter);
  };

  const handleChangeFilterValue = (filter: string) => {
    setFilterValue(filter);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    sortPokemons(value, filteredPokemons);
  };

  return (
    <>
      <Box sx={PokedexContainerStyles}>
        <Box sx={StickyContainerStyles}>
          <Box sx={FilterContainerStyles}>
            <Typography variant="h4" sx={ReleaseTitleStyles}>
              Pokédex ({filteredPokemons.length})
            </Typography>
            <Box sx={{ alignSelf: 'start' }}>
              <PokemonSettingsButton pokemons={pokemons} />
            </Box>
          </Box>

          <PokedexFilters
            filter={filter}
            filterValue={filterValue}
            sortOption={sortOption}
            handleChangeFilter={handleChangeFilter}
            handleChangeFilterValue={handleChangeFilterValue}
            changeSortingOption={handleSortChange}
          />

          <Button
            id={'release-pokemons-button'}
            variant="contained"
            onClick={releasePokemons}
            disabled={selectedPokemons.length === 0}
            color="warning"
            sx={ReleasePokemonButtonStyles}
          >
            Release Pokémons
          </Button>
        </Box>
        {/* virtualizer lista para melhorar performance */}
        {(filteredPokemons || []).map((pokemon, index) => (
          <PokedexCard
            key={`${pokemon.name}-${index}`}
            pokemon={pokemon}
            openStatsModal={openStatsModal}
            handleSelectPokemons={handleSelectPokemons}
          />
        ))}
        {filteredPokemons.length === 0 && <Typography>There are no pokemons</Typography>}
      </Box>
    </>
  );
};
