import { Box, Typography, LinearProgress } from '@mui/material';
import { LOCAL_STORAGE_VALUES } from '../../constants';
import { getFromLocalStorage } from '../../utils/localStorage';

interface PokedexProgressBarProps {
  pokedexProgress: number;
  pokedexTotalPokemons: number;
}

export const PokedexProgressBar = ({ pokedexProgress, pokedexTotalPokemons }: PokedexProgressBarProps) => {
  const totalPokemons = getFromLocalStorage(LOCAL_STORAGE_VALUES.TOTAL_POKEMONS) as number;

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Box>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', color: 'black' }}>
          {`Pokédex progress: ${pokedexProgress.toFixed(2)}%`}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ textAlign: 'center', marginBottom: '1.2rem', color: 'black' }}
        >
          {`${pokedexTotalPokemons} caught out of ${totalPokemons}`}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={pokedexProgress}
          sx={{
            height: 10,
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );
};
