import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import React from 'react';
import ReactDOM from 'react-dom';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {Provider as ReduxProvider} from 'react-redux';
import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';
import {BrowserRouter as RouteProvider} from 'react-router-dom';

import reducers from './redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const httpLink = new HttpLink ({
  uri: 'https://us-central1-reverse-buy.cloudfunctions.net/api/graphql',
});
const link = onError (({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.map (({message, locations, path}) => {
      console.error (`[graphql error ]: ${message}`);
    });

  if (networkError) console.error (`[Network error ]: ${networkError}`);
});
// Pass your GraphQL endpoint to uri
const client = new ApolloClient ({
  link: ApolloLink.from ([link, httpLink]),

  cache: new InMemoryCache ({
    addTypename: false,
  }),
});

const middleware = [...getDefaultMiddleware ()];
const store = configureStore ({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {},
});

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <RouteProvider>
        <AppComponent />
      </RouteProvider>
    </ReduxProvider>
  </ApolloProvider>
);

ReactDOM.render (ApolloApp (App), document.getElementById ('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister ();
