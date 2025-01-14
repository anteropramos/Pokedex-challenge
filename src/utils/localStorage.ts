import { Pokemon, PokemonDetails } from '../types/pokemons';

export const saveToLocalStorage = (key: string, value: Pokemon[] | PokemonDetails[] | PokemonDetails | number) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): Pokemon[] | PokemonDetails[] | PokemonDetails | number | null => {
  try {
    const localStorageValue = localStorage.getItem(key);

    if (localStorageValue === null) return null;

    return JSON.parse(localStorageValue);
  } catch (_e: unknown) {
    return null;
  }
};
