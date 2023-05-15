export const ADD_POKEMON = 'ADD_POKEMON';
export const REMOVE_POKEMON = 'REMOVE_POKEMON';
export const ADD_FAVORITE_POKEMON = 'ADD_FAVORITE_POKEMON';
export const REMOVE_FAVORITE_POKEMON = 'REMOVE_FAVORITE_POKEMON';
export const SET_POKEMON_LOADING = 'SET_POKEMON_LOADING';
export const SET_POKEMON_ERROR = 'SET_POKEMON_ERROR';
export const SET_POKEMON_SUCCESS = 'SET_POKEMON_SUCCESS';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  abilities: string[];
  maxHP: number;
  abilitiesDetails?: PokemonAbility[];
}

export interface PokemonAbility {
  name: string;
  strength: number;
}

export interface PokemonState {
  count: number;
  pokemons: Pokemon[];
  favorites: Pokemon[] | null;
  loading: boolean;
  error: string | null;
}

interface AddPokemonAction {
  type: typeof ADD_POKEMON;
  payload: Pokemon;
}

interface RemovePokemonAction {
  type: typeof REMOVE_POKEMON;
  payload: number;
}

interface AddFavoritePokemonAction {
  type: typeof ADD_FAVORITE_POKEMON;
  pokemon: Pokemon;
}

interface RemoveFavoritePokemonAction {
  type: typeof REMOVE_FAVORITE_POKEMON;
  id: number;
}

interface LoadingPokemonAction {
  type: typeof SET_POKEMON_LOADING;
  loading: Boolean;
}

interface ErrorPokemonAction {
  type: typeof SET_POKEMON_ERROR;
  error: string;
}

interface SuccessPokemonAction {
  type: typeof SET_POKEMON_SUCCESS;
  success: Boolean;
}

export type PokemonActionTypes =
  | AddPokemonAction
  | RemovePokemonAction
  | AddFavoritePokemonAction
  | RemoveFavoritePokemonAction
  | LoadingPokemonAction
  | ErrorPokemonAction
  | SuccessPokemonAction;
