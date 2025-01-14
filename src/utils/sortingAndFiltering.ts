import { compareAsc, compareDesc, isAfter, parseISO } from 'date-fns';
import { POKEDEX_FILTERS, HEIGHT_TYPES, SORT_OPTIONS } from '../constants/sortAndFilter';
import { Pokemon } from '../types/pokemons';

export const filterPokemons = (filter: string, filterValue: string, pokemons: Pokemon[]): Pokemon[] => {
  switch (filter) {
    case POKEDEX_FILTERS.NAME:
      pokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith((filterValue as string).toLowerCase()),
      );
      break;
    case POKEDEX_FILTERS.CAPTURED_DATE:
      pokemons = pokemons.filter((pokemon) => isAfter(new Date(pokemon.capturedDate!), new Date(filterValue!)));
      break;

    case POKEDEX_FILTERS.HEIGHT_TYPE:
      const { min, max } = HEIGHT_TYPES[filterValue as keyof typeof HEIGHT_TYPES];
      return pokemons.filter((pokemon) => pokemon.height >= min && pokemon.height <= max);

    default:
      break;
  }
  return pokemons;
};

export const sortPokemons = (sortOption: string, pokemons: Pokemon[]) => {
  if (sortOption === SORT_OPTIONS.NAME_ASCENDING) {
    pokemons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === SORT_OPTIONS.NAME_DESCENDING) {
    pokemons.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === SORT_OPTIONS.CAPTURED_DATE_ASCENDING) {
    pokemons.sort((a, b) => compareAsc(parseISO(a.capturedDate!), parseISO(b.capturedDate!)));
  } else if (sortOption === SORT_OPTIONS.CAPTURED_DATE_DESCENDING) {
    pokemons.sort((a, b) => compareDesc(parseISO(a.capturedDate!), parseISO(b.capturedDate!)));
  }

  return pokemons;
};
