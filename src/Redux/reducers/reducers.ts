import {
    ADD_POKEMON,
    REMOVE_POKEMON,
    SET_POKEMON_LOADING,
    SET_POKEMON_ERROR,
    SET_POKEMON_SUCCESS,
    PokemonActionTypes,
  } from './types';
import { 
    ADD_FAVORITE_POKEMON, 
    REMOVE_FAVORITE_POKEMON, 
    PokemonActions, 
} from '../actions/pokemonActions';
import { Pokemon } from '../types';
  
  export interface PokemonState {
    count: number;
    loading: boolean;
    error: string | null;
    data: any;
  }
  export interface PokemonState {
    favoritePokemon: Pokemon | null;
  }
  
  const initialState: PokemonState = {
    count: 0,
    loading: false,
    error: null,
    data: null,
  };
  
  const pokemonReducer = (state = initialState, action: PokemonActionTypes): PokemonState => {
    switch (action.type) {
      case ADD_POKEMON:
        return {
          ...state,
          count: state.count + 1,
        };
      case REMOVE_POKEMON:
        return {
          ...state,
          count: state.count - 1,
        };
      case SET_POKEMON_LOADING:
  
      
    const initialState: PokemonState = {
        favoritePokemon: null
      }
      
    const pokemonReducer = (state = initialState, action: PokemonActions): PokemonState => {
        switch (action.type) {
          case ADD_FAVORITE_POKEMON:
            return {
              ...state,
              favoritePokemon: action.pokemon
            };
          case REMOVE_FAVORITE_POKEMON:
            return {
              ...state,
              favoritePokemon: null
            };
          default:
            return state;
        }
      }
      
      export default pokemonReducer;