import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import client from '../../client';
import { getPokemon } from 'graphql-pokemon';
import {
  ADD_POKEMON,
  REMOVE_POKEMON,
  REMOVE_FAVORITE_POKEMON, 
  ADD_FAVORITE_POKEMON,
  SET_POKEMON_LOADING,
  SET_POKEMON_ERROR,
  SET_POKEMON_SUCCESS,
  Pokemon,
  // LOAD_FAVORITE, 
  // FavoriteActionTypes,   no existe
  PokemonActionTypes,
  PokemonState,
} from '../../types/types';
import { Dispatch } from 'redux';

export const addPokemon = (pokemon: Pokemon): PokemonActionTypes => ({
  type: ADD_POKEMON,
  payload: pokemon,
});

export const removePokemon = (id: number): PokemonActionTypes => ({
  type: REMOVE_POKEMON,
  payload: id,
});

export const setPokemonLoading = (loading: Boolean): PokemonActionTypes => ({
  type: SET_POKEMON_LOADING,
  loading: loading,
});

export const setPokemonError = (error: string): PokemonActionTypes => ({
  type: SET_POKEMON_ERROR,
  error: error,
});

export const setPokemonSuccess = (success: Boolean): PokemonActionTypes => ({
  type: SET_POKEMON_SUCCESS,
  success: success,
});

export const fetchPokemon = (): ThunkAction<void, RootState, unknown, PokemonActionTypes> => {
  return async (dispatch) => {
    dispatch(setPokemonLoading(true));
    try {
      const { data } = await client.query({ query: getPokemon, variables: { name: 'pikachu' } });
      dispatch(setPokemonSuccess(data?.pokemon));
    } catch (error) {
      dispatch(setPokemonError(error.message));
    }
  };
};

// export const ADD_FAVORITE_POKEMON = 'ADD_FAVORITE_POKEMON';
// export const REMOVE_FAVORITE_POKEMON = 'REMOVE_FAVORITE_POKEMON';

// interface AddFavoritePokemonAction {
//   type: typeof ADD_FAVORITE_POKEMON;
//   pokemon: Pokemon;
// }

// interface RemoveFavoritePokemonAction {
//   type: typeof REMOVE_FAVORITE_POKEMON;
//   id: string;
// }

// export type PokemonActions = AddFavoritePokemonAction | RemoveFavoritePokemonAction;

export const addFavoritePokemon = (pokemon: Pokemon) => {
  return (dispatch: Dispatch<PokemonActionTypes>) => {
    dispatch({
      type: ADD_FAVORITE_POKEMON,
      pokemon: pokemon
    });
  }
}

export const removeFavoritePokemon = (id: number) => {
  return (dispatch: Dispatch<PokemonActionTypes>) => {
    dispatch({
      type: REMOVE_FAVORITE_POKEMON,
      id: id
    });
  }
}

// const initialState: PokemonState = {
//   count: 0,
//   pokemons: [],
//   favorites: [],
//   loading: false, // ver si tiene sentido ese valor inicial
//   error: "",
// }

const favoritesReducer = (state: PokemonState, action: PokemonActionTypes): PokemonState => {
  switch (action.type) {
    case ADD_FAVORITE_POKEMON:
      return {
        ...state,
        favorites: state.favorites,
      };
    case REMOVE_FAVORITE_POKEMON:
      return {
        ...state,
        favorites: state.favorites,
      };
    // case LOAD_FAVORITE:
    //   return {
    //     ...state,
    //     favoritePokemon: action.payload,
    //   };
    default:
      return state;
  }
};

export default favoritesReducer;