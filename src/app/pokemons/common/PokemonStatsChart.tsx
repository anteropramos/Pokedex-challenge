import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { capitalize } from 'lodash';
import { useMemo } from 'react';
import { PokemonStats } from '../../api/pokemonDetails/route';

export const PokemonStatsChart = (stats: PokemonStats) => {
  const data = useMemo(() => {
    return Object.keys(stats).map((stat) => ({ stat: capitalize(stat), value: stats[stat as keyof PokemonStats] }));
  }, [stats]);

  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stat" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
