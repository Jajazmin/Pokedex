import { gql } from 'apollo-boost';

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types
      height
      weight
      abilities {
        ability {
          name
        }
      }
    }
  }
`;
