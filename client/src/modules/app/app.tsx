import React from 'react'
import { ApolloProvider } from '@apollo/client'
//
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { Navigation } from '../navigation/navigation'
import { client } from '../common/local-apollo-client'
import { useUser } from '../context/user-context'

function App() {
  const user = useUser()
  return (
    <ApolloProvider client={client}>
      <div>
        <Navigation user={user} />
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </ApolloProvider>
  )
}

export default App
