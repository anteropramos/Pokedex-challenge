import { fetchPokemonDetatils } from '../../api/fetchPokemonDetails';
import { Button, capitalize, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { PokemonRotator } from './PokemonRotator';
import Grid from '@mui/material/Grid2';
import { PokemonStatsChart } from './PokemonStatsChart';
import { Loading } from '../utils/Loading';
import { Pokemon, PokemonStats } from '../../types/pokemons';

interface PokemonIndividualDataProps {
  pokemonName: string;
  note?: string;
  handleChangeNote?: (event) => void;
  handleCloseModal?: () => void;
  pokedexPokemon?: Pokemon;
}

export const PokemonIndividualData = ({ pokemonName, ...props }: PokemonIndividualDataProps) => {
  const [details, setDetails] = useState<PokemonStats | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const data = await fetchPokemonDetatils(pokemonName);
    setDetails(data);
    setIsLoading(false);
  }, [pokemonName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {details && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" align="center" color="primary" gutterBottom>
              {capitalize(details.name)}
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              <Typography>{`Types: ${details.types.join(', ')}`}</Typography>
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <PokemonRotator images={details.image as string[]} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <PokemonStatsChart {...details.stats} />
          </Grid>

          {props.pokedexPokemon && (
            <>
              <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  id="notes-field"
                  label="Notes"
                  multiline
                  value={props.note}
                  onChange={props.handleChangeNote}
                  variant="outlined"
                  sx={{
                    width: '80%',
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ padding: '0.5rem 2rem', borderRadius: '8px' }}
                  onClick={props.handleCloseModal}
                >
                  Close
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
};
