import axios from 'axios';

export const fetchPokemonDetatils = async (name: string) => {
  try {
    return await axios.get(`/api/pokemonDetails?name=${name}`).then((response) => response.data);
  } catch (error: unknown) {
    console.error(error?.message);
  }
};
