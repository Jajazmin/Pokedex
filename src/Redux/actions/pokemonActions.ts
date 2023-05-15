import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import client from '../../client';
import { getPokemon } from 'graphql-pokemon';
import {
  ADD_POKEMON,
  REMOVE_POKEMON,
  SET_POKEMON_LOADING,
  SET_POKEMON_ERROR,
  SET_POKEMON_SUCCESS,
  
  PokemonActionTypes,
} from './types';
import { Dispatch } from 'redux';
import { Pokemon } from '../types';
import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITE, FavoriteActionTypes } from '../types/types';
import { Pokemon } from '../types/types';

export const addPokemon = (): PokemonActionTypes => ({
  type: ADD_POKEMON,
});

export const removePokemon = (): PokemonActionTypes => ({
  type: REMOVE_POKEMON,
});

export const setPokemonLoading = (): PokemonActionTypes => ({
  type: SET_POKEMON_LOADING,
});

export const setPokemonError = (error: string): PokemonActionTypes => ({
  type: SET_POKEMON_ERROR,
  payload: error,
});

export const setPokemonSuccess = (pokemon: any): PokemonActionTypes => ({
  type: SET_POKEMON_SUCCESS,
  payload: pokemon,
});

export const fetchPokemon = (): ThunkAction<void, RootState, unknown, PokemonActionTypes> => {
  return async (dispatch) => {
    dispatch(setPokemonLoading());
    try {
      const { data } = await client.query({ query: getPokemon, variables: { name: 'pikachu' } });
      dispatch(setPokemonSuccess(data?.pokemon));
    } catch (error) {
      dispatch(setPokemonError(error.message));
    }
  };
};

export const ADD_FAVORITE_POKEMON = 'ADD_FAVORITE_POKEMON';
export const REMOVE_FAVORITE_POKEMON = 'REMOVE_FAVORITE_POKEMON';

interface AddFavoritePokemonAction {
  type: typeof ADD_FAVORITE_POKEMON;
  pokemon: Pokemon;
}

interface RemoveFavoritePokemonAction {
  type: typeof REMOVE_FAVORITE_POKEMON;
  id: string;
}

export type PokemonActions = AddFavoritePokemonAction | RemoveFavoritePokemonAction;

export const addFavoritePokemon = (pokemon: Pokemon) => {
  return (dispatch: Dispatch<PokemonActions>) => {
    dispatch({
      type: ADD_FAVORITE_POKEMON,
      pokemon: pokemon
    });
  }
}

export const removeFavoritePokemon = (id: string) => {
  return (dispatch: Dispatch<PokemonActions>) => {
    dispatch({
      type: REMOVE_FAVORITE_POKEMON,
      id: id
    });
  }
}

const initialState: FavoriteState = {
  favoritePokemon: null,
};

interface FavoriteState {
  favoritePokemon: Pokemon | null;
}

const favoritesReducer = (state = initialState, action: FavoriteActionTypes): FavoriteState => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favoritePokemon: action.payload,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favoritePokemon: null,
      };
    case LOAD_FAVORITE:
      return {
        ...state,
        favoritePokemon: action.payload,
      };
    default:
      return state;
  }
};

export default favoritesReducer;