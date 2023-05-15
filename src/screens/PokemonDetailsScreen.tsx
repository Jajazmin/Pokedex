import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import styled from 'styled-components/native';
import { Pokemon, PokemonAbility } from '../types';

type PokemonDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetails'>;

type PokemonDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PokemonDetails'>;

type Props = {
  route: PokemonDetailsScreenRouteProp;
  navigation: PokemonDetailsScreenNavigationProp;
};

const PokemonDetailsScreen: React.FC<Props> = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <Container>
      <Image source={{ uri: pokemon.image }} />
      <Name>{pokemon.name}</Name>
      <MaxHP>Max HP: {pokemon.maxHP}</MaxHP>
      <Description>{pokemon.description}</Description>
      <Row>
        <LabelText>Types:</LabelText>
        <LabelValue>{pokemon.types.join(', ')}</LabelValue>
      </Row>
      <Row>
        <LabelText>Abilities:</LabelText>
        <LabelValue>{pokemon.abilities.join(', ')}</LabelValue>
      </Row>
      {pokemon.abilitiesDetails && (
        <Row>
          <LabelText>Special Abilities:</LabelText>
          <LabelValue>
            {pokemon.abilitiesDetails.map((ability: PokemonAbility) => (
              <Ability key={ability.name}>
                <AbilityName>{ability.name}</AbilityName>
                <AbilityStrength>Strength: {ability.strength}</AbilityStrength>
              </Ability>
            ))}
          </LabelValue>
        </Row>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Image = styled.Image`
  width: 200px;
  height: 200px;
  align-self: center;
  margin-bottom: 10px;
`;

const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const MaxHP = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const LabelText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const LabelValue = styled.Text`
  font-size: 18px;
  flex: 1;
`;

const Ability = styled.View`
  margin-right: 10px;
`;

const AbilityName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const AbilityStrength = styled.Text`
  font-size: 14px;
`;

export default PokemonDetailsScreen;
