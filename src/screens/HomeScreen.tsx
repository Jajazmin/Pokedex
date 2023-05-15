import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PokemonListItem from '../components/PokemonListItem';
import { RootState } from '../store';
import { fetchPokemon } from '../Redux/actions/pokemonActions';
import PokemonListHeader from '../components/PokemonListHeader';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, pokemons } = useSelector(
    (state: RootState) => state.pokemon
  );

  React.useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  return (
    <FlatList
      data={pokemons}
      renderItem={({ item }) => <PokemonListItem pokemon={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<PokemonListHeader />}
    />
  );
};

export default HomeScreen;
