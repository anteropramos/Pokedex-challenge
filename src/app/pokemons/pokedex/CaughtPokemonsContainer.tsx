'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import { PokemonFilters } from './PokemonFilters';
import { CaughtPokemonCard } from './CaughtPokemonCard';
import { PokemonSettingsButton } from '../common/PokemonSettingsButton';
import { Pokemon } from '../../types/pokemons';
import { filterPokemons, sortPokemons } from '../../utils/sortingAndFiltering';

interface CaughtPokemonsContainerProps {
  pokemons: Pokemon[];
  openStatsModal: (pokemonName: string) => void;
  handleReleasePokemons: (name: string[]) => void;
}

export const CaughtPokemonsContainer = ({
  pokemons,
  handleReleasePokemons,
  openStatsModal,
}: CaughtPokemonsContainerProps) => {
  const [filter, setFilter] = useState('name');
  const [filterValue, setFilterValue] = useState<string>('');

  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(pokemons);

  const [sort, setSort] = useState<string | undefined>();

  const filteredAndSortedPokemons = useMemo(() => {
    let updatedPokemons = [...pokemons];

    if (filter && filterValue) {
      updatedPokemons = filterPokemons(filter, filterValue, updatedPokemons);
    }

    if (sort) {
      updatedPokemons = sortPokemons(sort, updatedPokemons);
    }

    return updatedPokemons;
  }, [filter, filterValue, pokemons, sort]);

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
    setFilterValue('');
  };

  const handleChangeFilterValue = (filter: string) => {
    setFilterValue(filter);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    sortPokemons(value, filteredPokemons);
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#FF6F61', overflowY: 'auto', padding: '1.2rem', width: { xs: '100%', md: '30%' } }}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              margin: 'auto',
              alignContent: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: '1.2rem',
                textAlign: 'center',
                justifySelf: 'center',
                color: 'black',
              }}
            >
              Pokédex ({filteredPokemons.length})
            </Typography>
            <Box sx={{ alignSelf: 'start' }}>
              <PokemonSettingsButton pokemons={pokemons} />
            </Box>
          </Box>
          <PokemonFilters
            filter={filter}
            filterValue={filterValue}
            handleChangeFilter={handleChangeFilter}
            handleChangeFilterValue={handleChangeFilterValue}
            sort={sort}
            changeSortingOption={handleSortChange}
          />
          <Button
            variant="contained"
            onClick={releasePokemons}
            disabled={selectedPokemons.length === 0}
            color="warning"
            sx={{
              width: '100%',
              marginTop: 3,
              marginBottom: 3,
              fontWeight: 'bold',
            }}
          >
            Release Pokémons
          </Button>
        </Box>
        {(filteredPokemons || []).map((pokemon, index) => (
          <CaughtPokemonCard
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
