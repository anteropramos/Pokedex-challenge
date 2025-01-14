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

  // it('Should catch the pokemon', async () => {
  //   render(<PokemonMainPage />);

  //   (fetchPokemons as jest.Mock).mockResolvedValue(mockPokemons);
  //   const toCatchPokemon = document.querySelector(`#to-catch-${mockPokemons[0].name}`);
  //   act(() => {
  //     fireEvent.click(toCatchPokemon);
  //   });

  //   expect(document.querySelector(`#catched-${mockPokemons[0].name}`)).toBeInTheDocument();
  //    expect to have date
  // });

  // it('Should release the pokemon', async () => {
  //   mock local storage
  //   select pokemon
  //   release it
  //   check if id in "to-catch"
  // });

  // it('Should open the modal and show the results', async () => {
  //   mock details request
  //   select pokemon
  //   check if modal opens with details
  // });

  it('', () => {
    expect(1).toEqual(1);
  });
});
