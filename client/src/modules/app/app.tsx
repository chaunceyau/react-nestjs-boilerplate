import React from 'react'
import { ApolloProvider } from '@apollo/client'
//
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { client } from '../common/local-apollo-client'
import { useUser } from '../context/user-context'

function App() {
  const user = useUser()
  return (
    <ApolloProvider client={client}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </ApolloProvider>
  )
}

export default App
