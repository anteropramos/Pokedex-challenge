export interface AllPokemons {
  count: number;
  pokemons: Pokemon[];
}

export interface Pokemon {
  id: string;
  name: string;
  image?: string | string[];
  capturedDate?: string;
  textNote?: string;
}

export interface PokemonDetails extends Pokemon {
  height: number;
  weight: number;
  stats: PokemonStats;
  types: string[];
}

export interface PokemonStats {
  hp: string;
  atk: string;
  def: string;
  specialAtk: string;
  specialDef: string;
  speed: string;
}
