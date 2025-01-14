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
  height: number;
  weight: number;
}

export interface PokemonDetails extends Pokemon {
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
