jest.mock('../../api/fetchPokemons', () => ({
  fetchPokemons: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockPokemons = [
  { id: 1, name: 'Pikachu', image: 'front' },
  { id: 2, name: 'charmender', image: 'front' },
];

describe('GET', () => {
  // separar teste por concerns

  // it('Should catch the pokemon and release it', async () => {
  //   render(<PokemonMainPage />);

  //   (fetchPokemons as jest.Mock).mockResolvedValue(mockPokemons);
  //   const toCatchPokemon = document.querySelector(`#to-catch-${mockPokemons[0].name}`);
  //   act(() => {
  //     fireEvent.click(toCatchPokemon);
  //   });

  //   expect(document.querySelector(`#catched-${mockPokemons[0].name}`)).toBeInTheDocument();

  //   expect(document.querySelector(`#release-pokemons-button`)).toBeDisabled();
  //   act(() => {
  //     fireEvent.click(document.querySelector(`#catched-pokemon-checkbox-${mockPokemons[0].name}`));
  //   });

  //   const releaseBtn = document.querySelector(`#release-pokemons-button`);
  //   expect(releaseBtn).toBeEnabled();

  //   act(() => {
  //     fireEvent.click(releaseBtn);
  //   });

  //   expect(toCatchPokemon).toBeInTheDocument();
  // });

  //fazer teste para ao abrir modal, verificar que faz o request e dá display de tudo

  it('', () => {
    expect(1).toEqual(1);
  });
});
