import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { createApolloReducer } from 'redux-apollo';
import { GET_POKEMON } from './graphql';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemon/reducer';
import favoritesReducer from './pokemon/favorites';

const httpLink = createHttpLink({
  uri: 'https://graphql-pokemon2.vercel.app/',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const store = createStore(
  createApolloReducer(client),
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export const getPokemon = (name: string) => {
  return client.query({
    query: GET_POKEMON,
    variables: { name },
  });
};

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  favorites: favoritesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
