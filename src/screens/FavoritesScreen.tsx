import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFavoritePokemon } from '../store/actions';
import { Pokemon } from '../types';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const EmptyFavorites = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyFavoritesText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

const PokemonItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const PokemonImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const PokemonName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: #f44336;
  padding: 10px;
  margin-left: auto;
  border-radius: 5px;
`;

const RemoveButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const favoritePokemon = useSelector((state: RootState) => state.favoritePokemon);

  const handleRemoveFavorite = (pokemon: Pokemon) => {
    dispatch(removeFavoritePokemon(pokemon));
  };

  const renderPokemonItem = ({ item }: { item: Pokemon }) => (
    <PokemonItem>
      <PokemonImage source={{ uri: item.image }} />
      <View>
        <PokemonName>{item.name}</PokemonName>
        <Text>Max HP: {item.maxHP}</Text>
        {item.abilities.length > 0 && <Text>Abilities: {item.abilities.join(', ')}</Text>}
      </View>
      <RemoveButton onPress={() => handleRemoveFavorite(item)}>
        <RemoveButtonText>Eliminar de favoritos</RemoveButtonText>
      </RemoveButton>
    </PokemonItem>
  );

  const renderEmptyFavorites = () => (
    <EmptyFavorites>
      <Text>No tienes Pokémon favoritos.</Text>
      <EmptyFavoritesText>¿Qué estás esperando? Encuentra tu Pokémon favorito y agrégalo a tu familia.</EmptyFavoritesText>
    </EmptyFavorites>
  );

  return (
    <Container>
      {favoritePokemon.length > 0 ? (
        <FlatList
          data={favoritePokemon}
          renderItem={renderPokemonItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        renderEmptyFavorites()
      )}
    </Container>
  );
};

export default FavoritesScreen;