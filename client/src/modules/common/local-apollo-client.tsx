import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL || 'http://localhost:5000/graphql',
  credentials: 'include',
  cache: new InMemoryCache()
})
