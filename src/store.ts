// import { applyMiddleware } from 'redux';   no se usa
import thunk, { ThunkMiddleware } from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';    no se usa
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
// import { createApolloReducer } from 'redux-apollo';     no se usa
import { GET_POKEMON } from './graphql';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {pokemonReducer} from './Redux/reducers/reducers';
import favoritesReducer from './Redux/actions/favorites';

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

const middleware: ThunkMiddleware[] = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;