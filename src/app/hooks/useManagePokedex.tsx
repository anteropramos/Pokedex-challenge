'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchPokemons } from '../api/fetchPokemons';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_VALUES, PAGE_LIMIT } from '../constants';
import { AlertColor } from '@mui/material';
import { useAlert } from './useAlert';
import { formatDate } from '../utils/date';
import { Pokemon, AllPokemons, PokemonDetails } from '../types/pokemons';

export interface IProps {
  pokedex: Pokemon[];
  pokemonsToCatch: Pokemon[];
  pokedexProgress: number;
  page: number;
  isLoading: boolean;
  alertIsOn: boolean;
  alertMessage: AlertMessage;
  handleCatchPokemon: (name: string) => void;
  handleReleasePokemons: (name: string[]) => void;
  handleChangePage: (page: number) => void;
  handleAddNoteToPokemon: (pokemonName: string, note: string) => void;
}

interface AlertMessage {
  message: string;
  severity?: AlertColor;
}

export const useManagePokedex = (): IProps => {
  const { alertIsOn, alertMessage, showAlert } = useAlert();

  const cachedPokedexValue = getFromLocalStorage(LOCAL_STORAGE_VALUES.POKEDEX) as Pokemon[];
  const cachedTotalNumberOfPokemons = getFromLocalStorage(LOCAL_STORAGE_VALUES.TOTAL_POKEMONS) as number;

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonsToCatch, setPokemonsToCatch] = useState<Pokemon[]>([]);
  const [pokedex, setPokedex] = useState<Pokemon[]>(cachedPokedexValue || []);
  const [totalPokemons, setNumberOfPokemons] = useState<number>(cachedTotalNumberOfPokemons || 0);

  const pokedexProgress = (pokedex.length * 100) / totalPokemons;

  const buildPokedex = useCallback(
    (data: Pokemon[]): Pokemon[] => {
      return data.filter((pokemonToCatch) => !pokedex.some((pokemon) => pokemon.name === pokemonToCatch.name));
    },
    [pokedex],
  );

  const fetchData = useCallback(
    async (pages: number) => {
      if (isLoading) return;

      try {
        setIsLoading(true);

        const offset = pages * PAGE_LIMIT;
        const { count, pokemons }: AllPokemons = await fetchPokemons(offset);

        if (totalPokemons === 0) {
          setNumberOfPokemons(count);
          saveToLocalStorage(LOCAL_STORAGE_VALUES.TOTAL_POKEMONS, count);
        }

        const filteredPokemons = buildPokedex(pokemons);
        if (filteredPokemons.length === 0) {
          setPage((prevValue) => {
            const nextPage = prevValue + 1;
            fetchData(nextPage);
            return nextPage;
          });

          return;
        }

        setPokemonsToCatch(filteredPokemons);

        setNumberOfPokemons(count);
        setIsLoading(false);
      } catch (e: unknown) {
        setIsLoading(false);
        console.error('Error:', e);
      }
    },
    [buildPokedex, isLoading, totalPokemons],
  );

  useEffect(() => {
    fetchData(page);

    // we don't need to fetch data again because we're managing our pokedex locally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleCatchPokemon = useCallback(
    (name: string) => {
      const toCatchIndex = pokemonsToCatch.findIndex((pokemon) => pokemon.name === name);
      const [catched] = pokemonsToCatch.splice(toCatchIndex, 1);

      handleSetPokemonsToCatch([...pokemonsToCatch]);
      handleSetPokedex([
        {
          ...catched,
          capturedDate: catched.capturedDate ? catched.capturedDate : formatDate(),
        },
        ...pokedex,
      ]);

      showAlert(`Congratulations! You've catched ${catched.name}!`, 'success');
    },
    [pokedex, pokemonsToCatch, showAlert],
  );

  const handleReleasePokemons = (names: string[]) => {
    const released: Pokemon[] = pokedex.filter((pokemon) => names.includes(pokemon.name));
    const remainingPokedex = pokedex.filter((pokemon) => !names.includes(pokemon.name));

    handleSetPokemonsToCatch([...released, ...pokemonsToCatch]);
    handleSetPokedex(remainingPokedex);

    showAlert(`You've just released ${released.length} pokémon(s).`, 'warning');
  };

  const handleChangePage = (value: number) => setPage(value);

  const handleAddNoteToPokemon = (pokemonName: string, textNote: string) => {
    const pokemonIndex = pokedex.findIndex((pokemon) => pokemon.name === pokemonName);
    const cachedPokemon = getFromLocalStorage(pokemonName) as PokemonDetails;

    if (pokemonIndex !== -1) {
      const updatedPokemon = { ...pokedex[pokemonIndex], textNote };
      const updatedPokedex = [...pokedex.slice(0, pokemonIndex), updatedPokemon, ...pokedex.slice(pokemonIndex + 1)];

      handleSetPokedex(updatedPokedex);

      if (cachedPokemon) {
        saveToLocalStorage(pokemonName, { ...cachedPokemon, textNote });
      }
    }
  };

  const handleSetPokedex = (pokemons: Pokemon[]) => {
    setPokedex([...pokemons]);
    saveToLocalStorage(LOCAL_STORAGE_VALUES.POKEDEX, [...pokemons]);
  };

  const handleSetPokemonsToCatch = (pokemons: Pokemon[]) => {
    setPokemonsToCatch([...pokemons]);
  };

  return {
    page,
    pokemonsToCatch,
    pokedex,
    pokedexProgress,
    alertIsOn,
    alertMessage,
    isLoading,
    handleChangePage,
    handleReleasePokemons,
    handleCatchPokemon,
    handleAddNoteToPokemon,
  };
};
