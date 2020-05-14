import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
//
import { AuthProvider } from '../context/auth-context'
import { UserProvider } from '../context/user-context'
import { client } from '../common/local-apollo-client'

function AppProviders({ children }: any) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default AppProviders
