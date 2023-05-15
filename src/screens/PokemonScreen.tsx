import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addFavoritePokemon } from '../store/favorites';
import { Pokemon } from '../types/types';
import { getPokemonDetails } from '../api/pokemon';
import PokemonListScreen from './FavoritesScreen';
import FavoritesScreen from './FavoritesScreen';

const Tab = createBottomTabNavigator();

const Container = styled.View`
  flex: 1;
`;

const TabBarContainer = styled.View`
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #e5e5e5;
`;

const TabBarButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabBarLabel = styled.Text<{ focused: boolean }>`
  font-size: 12px;
  color: ${({ focused }) => (focused ? '#FF6B00' : '#BFBFBF')};
  margin-top: 4px;
`;

const PokemonScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const favorites = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    const fetchPokemonDetails = async (id: number) => {
      try {
        const pokemon = await getPokemonDetails(id);
        setSelectedPokemon(pokemon);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching Pokemon details. Please try again.');
        setLoading(false);
      }
    };
    fetchPokemonDetails(1);
  }, []);

  const handleAddFavorite = () => {
    if (selectedPokemon) {
      dispatch(addFavoritePokemon(selectedPokemon));
    }
  };

  if (loading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>{error}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Tab.Navigator
        tabBarOptions={{
          style: { borderTopWidth: 0 },
          showLabel: false,
          tabStyle: { paddingBottom: 5 },
        }}
        tabBar={(props) => (
          <TabBarContainer>
            <TabBarButton {...props} onPress={() => props.navigation.navigate('PokemonList')}>
              <MaterialIcons
                name="list"
                size={24}
                color={props.focused ? '#FF6B00' : '#BFBFBF'}
              />
              <TabBarLabel focused={props.focused}>List</TabBarLabel>
            </TabBarButton>
            <TabBarButton onPress={() => handleAddFavorite()}>
              <MaterialIcons name="favorite-border" size={24} color="#BFBFBF" />
              <TabBarLabel focused={false}>Favorite</TabBarLabel>
            </TabBarButton>
          </TabBarContainer>
        )}
      >
        <Tab.Screen name="PokemonList" component={PokemonListScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </Container>
  );
        };

        export default PokemonScreen;
