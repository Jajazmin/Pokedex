import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../actions/pokemonActions';

const PokemonListHeader = () => {
  const { loading, error, pokemons } = useSelector(
    (state: RootState) => state.pokemon
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {loading
          ? 'Loading...'
          : error
          ? 'Error fetching Pokemons'
          : `Showing ${pokemons.length} Pokemons`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PokemonListHeader;
