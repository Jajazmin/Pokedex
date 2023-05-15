export const ADD_POKEMON = 'ADD_POKEMON';
export const REMOVE_POKEMON = 'REMOVE_POKEMON';

interface AddPokemonAction {
  type: typeof ADD_POKEMON;
}

interface RemovePokemonAction {
  type: typeof REMOVE_POKEMON;
}

export type PokemonActionTypes = AddPokemonAction | RemovePokemonAction;

export const addPokemon = (): PokemonActionTypes => {
  return {
    type: ADD_POKEMON,
  };
};

export const removePokemon = (): PokemonActionTypes => {
  return {
    type: REMOVE_POKEMON,
  };
};