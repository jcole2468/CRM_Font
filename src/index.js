import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
// import { BrowserRouter as Router } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'

import 'bootstrap/dist/css/bootstrap.min.css';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('crm-user-token')
  console.log("token ",token)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'https://secure-anchorage-76486.herokuapp.com'})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})
console.log(client)
ReactDOM.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>,
  document.getElementById('root')
);

