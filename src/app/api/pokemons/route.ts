import axios from 'axios';
import { NextResponse } from 'next/server';
import { PAGE_LIMIT } from '../../../constants';
import { Pokemon, AllPokemons } from '../../../types/pokemons';
import { PokemonListingResponse } from '../../../types/api';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pageOffset = Number(url.searchParams.get('pageOffset'));

    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${pageOffset}`);
    const response = data as PokemonListingResponse;

    const allPokemons = await Promise.all(
      response.results.map((data) => axios.get(data.url).then((response) => response.data)),
    );

    const pokemons: Pokemon[] = allPokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      height: pokemon.height / 10,
      weight: pokemon.weight,
    }));

    return NextResponse.json<AllPokemons>({ count: data.count, pokemons });
  } catch (error: unknown) {
    console.error(error.message);
  }
}
