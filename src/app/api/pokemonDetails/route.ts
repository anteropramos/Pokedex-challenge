import { NextResponse } from 'next/server';
import axios from 'axios';
import { PokemonDetails } from '../../types/pokemons';
import { PokemonDetailsResponse } from '../../types/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchParams.get('name')}`);
    const pokemonData = data as PokemonDetailsResponse;

    const pokemonDetails: PokemonDetails = {
      id: pokemonData.name,
      name: pokemonData.name,
      image: [pokemonData.sprites.front_default, pokemonData.sprites.back_default].filter((image) => Boolean(image)),
      height: pokemonData.height / 10,
      weight: pokemonData.weight / 10,
      stats: {
        hp: pokemonData.stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? '0',
        atk: pokemonData.stats.find((stat) => stat.stat.name === 'attack')?.base_stat ?? '0',
        def: pokemonData.stats.find((stat) => stat.stat.name === 'defense')?.base_stat ?? '0',
        specialAtk: pokemonData.stats.find((stat) => stat.stat.name === 'special-attack')?.base_stat ?? '0',
        specialDef: pokemonData.stats.find((stat) => stat.stat.name === 'special-defense')?.base_stat ?? '0',
        speed: pokemonData.stats.find((stat) => stat.stat.name === 'speed')?.base_stat ?? '0',
      },
      types: pokemonData.types.map((type) => type.type.name),
    };

    return NextResponse.json(pokemonDetails);
  } catch (error: unknown) {
    console.error('Error fetching Pokémon details:', error.message);
    return NextResponse.json({ error: 'Failed to fetch Pokémon details' }, { status: 500 });
  }
}
