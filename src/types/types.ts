export const ADD_POKEMON = 'ADD_POKEMON';
export const REMOVE_POKEMON = 'REMOVE_POKEMON';

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
  
  export interface PokemonFavorite {
    id: number;
    name: string;
    image: string;
  }
  
  export interface PokemonState {
    pokemons: Pokemon[];
    favorite: PokemonFavorite | null;
  }

  export interface PokemonAbility {
    name: string;
    strength: number;
  }
  
  interface AddPokemonAction {
    type: typeof ADD_POKEMON;
    payload: Pokemon;
  }
  
  interface RemovePokemonAction {
    type: typeof REMOVE_POKEMON;
    payload: number;
  }
  

  export type PokemonActionTypes = AddPokemonAction | RemovePokemonAction;
  