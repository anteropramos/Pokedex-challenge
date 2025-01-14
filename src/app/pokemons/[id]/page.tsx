'use client';

import { Box } from '@mui/material';
import { PokemonIndividualData } from '../common/PokemonIndividualData';
import { useParams } from 'next/navigation';

const IndividualPokemonPage = () => {
  const params = useParams();

  return (
    <Box
      sx={{
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
        height: '100vh',
      }}
    >
      <PokemonIndividualData pokemonName={(params?.id as string).toLowerCase()} />
    </Box>
  );
};

export default IndividualPokemonPage;
