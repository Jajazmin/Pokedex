import {
    ADD_POKEMON,
    REMOVE_POKEMON,
    SET_POKEMON_LOADING,
    PokemonActionTypes,
    PokemonState,
  } from '../../types/types';
import { 
    ADD_FAVORITE_POKEMON, 
    REMOVE_FAVORITE_POKEMON, 
    PokemonActions, 
} from '../actions/pokemonActions';
  
const initialState: PokemonState = {
  count: 0,
  loading: false,
  error: null,
  pokemons: [],
  favorites: undefined
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
        return {
          ...state,
          count: state.count -1,
        };
      };
      
    const pokemonReducer = (state = initialState, action: PokemonActions): PokemonState => {
        switch (action.type) {
          case ADD_FAVORITE_POKEMON:
            return {
              ...state,
              favorites: action.pokemon
            };
          case REMOVE_FAVORITE_POKEMON:
            return {
              ...state,
              favorites: null
            };
          default:
            return state;
        }
      }
    }
      
      export default pokemonReducer;