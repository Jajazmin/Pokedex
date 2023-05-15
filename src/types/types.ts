export const ADD_POKEMON = 'ADD_POKEMON';
export const REMOVE_POKEMON = 'REMOVE_POKEMON';
export const ADD_FAVORITE_POKEMON = 'ADD_FAVORITE_POKEMON';
export const REMOVE_FAVORITE_POKEMON = 'REMOVE_FAVORITE_POKEMON';

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

export type PokemonActionTypes =
  | AddPokemonAction
  | RemovePokemonAction
  | AddFavoritePokemonAction
  | RemoveFavoritePokemonAction;
