import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

import rootReducer from './store';
import PokemonScreen from './screens/PokemonScreen';

export const getPokemonDetails = async (id: number): Promise<Pokemon> => {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    const data = await response.json();
  
    const pokemon: Pokemon = {
      id: data.id,
      name: capitalizeFirstLetter(data.name),
      image: `${BASE_URL}/pokemon/${id}.png`,
      description: 'A Pokemon',
      types: data.types.map((type: any) => type.type.name),
      abilities: data.abilities.map((ability: any) => ability.ability.name),
      maxHP: data.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat ?? 0,
      abilitiesDetails: [],
    };
  
    await Promise.all(
      data.abilities.map(async (ability: any) => {
        const response = await fetch(`${BASE_URL}/ability/${ability.ability.name}`);
        const abilityData = await response.json();
        pokemon.abilitiesDetails!.push({
          name: capitalizeFirstLetter(ability.ability.name),
          strength: abilityData.effect_entries[0].effect.length,
        });
      })
    );
  
    return pokemon;
  };
  

const Container = styled.View`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
`;

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <PokemonScreen />
      </Container>
    </Provider>
  );
};

export default App;
