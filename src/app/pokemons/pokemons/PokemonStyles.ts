export const StyledPokemonCardStyles = {
  cursor: 'pointer',
  margin: '1rem',
  width: '100%',
  maxWidth: '300px',
  height: '350px',
  padding: '1rem',
  borderRadius: '10px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
};
