import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { PokemonIndividualData } from './PokemonIndividualData';
import { Pokemon } from '../../types/pokemons';

interface PokemonStatsModalProps {
  isOpen: boolean;
  pokemonName: string;
  pokedex: Pokemon[];
  closeModal: () => void;
  handleAddNoteToPokemon: (pokemonName: string, note: string) => void;
}

export const PokemonStatsModal = ({
  isOpen,
  pokemonName,
  pokedex,
  handleAddNoteToPokemon,
  closeModal,
}: PokemonStatsModalProps) => {
  const pokedexPokemon = pokedex.find((pokemon) => pokemon.name === pokemonName);
  const [note, setNote] = useState(pokedexPokemon?.textNote || '');

  const handleCloseModal = () => {
    handleAddNoteToPokemon(pokemonName, note);
    closeModal();
  };

  const handleChangeNote = ({ target }) => {
    setNote(target.value);
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          padding: 4,
          overflow: 'auto',
        }}
      >
        <PokemonIndividualData
          pokemonName={pokemonName}
          handleChangeNote={handleChangeNote}
          pokedexPokemon={pokedexPokemon}
          note={note}
          handleCloseModal={handleCloseModal}
        />
      </Box>
    </Modal>
  );
};
