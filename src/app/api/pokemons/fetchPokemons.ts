import axios from 'axios';

export const fetchPokemons = async (pageOffset: number) => {
  try {
    return await axios
      .get('/api/pokemons', {
        params: { pageOffset },
      })
      .then((response) => response.data);
  } catch (error: unknown) {
    console.error(error.message);
  }
};
