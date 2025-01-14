import { isAfter } from 'date-fns';
import { Pokemon } from '../types/pokemons';
import { SORT_OPTIONS } from '../pokemons/common/SortPokemonsButton';

export const filterPokemons = (filter: string, filterValue: string, pokemons: Pokemon[]): Pokemon[] => {
  switch (filter) {
    case 'name':
      pokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith((filterValue as string).toLowerCase()),
      );
      break;
    case 'captured-date':
      pokemons = pokemons.filter((pokemon) => isAfter(new Date(pokemon.capturedDate!), new Date(filterValue!)));
      break;

    case 'height-types':
      break;

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
    pokemons.sort((a, b) => new Date(a.capturedDate!).getTime() - new Date(b.capturedDate!).getTime());
  } else if (sortOption === SORT_OPTIONS.CAPTURED_DATE_DESCENDING) {
    pokemons.sort((a, b) => new Date(b.capturedDate!).getTime() - new Date(a.capturedDate!).getTime());
  }

  return pokemons;
};
