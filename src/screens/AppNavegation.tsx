import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import PokemonScreen from '../screens/PokemonScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const Container = styled.View`
  flex: 1;
`;

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Container>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Pokemon') {
                iconName = focused ? 'ios-paw' : 'ios-paw-outline';
              } else if (route.name === 'Favorites') {
                iconName = focused ? 'ios-heart' : 'ios-heart-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#e91e63',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Pokemon" component={PokemonScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </Container>
    </NavigationContainer>
  );
};

export default AppNavigator;
