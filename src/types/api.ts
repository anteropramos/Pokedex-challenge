interface Stat {
  stat: {
    name: string;
  };
  base_stat: string;
}

interface Sprite {
  front_default: string;
  back_default: string;
}

export interface PokemonDetailsResponse {
  name: string;
  sprites: Sprite;
  height: number;
  weight: number;
  stats: Stat[];
  types: { type: { name: string } }[];
}

export interface PokemonListingResponse {
  count: number;
  results: { url: string }[];
}
