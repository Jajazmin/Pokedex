import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pokemon } from '../types/types';

interface Props {
  pokemon: Pokemon;
}

const PokemonListItem = ({ pokemon }: Props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('PokemonDetail', { pokemon });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: pokemon.image }} />
        <Text style={styles.name}>{pokemon.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    height: 100,
    width: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default PokemonListItem;
