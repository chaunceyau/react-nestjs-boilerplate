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
      <div className="d-flex flex-column h-100">
        <Navigation user={user} />
        <MainApp user={user} />
      </div>
    </ApolloProvider>
  )
}

function MainApp(props: { user: any }) {
  if (props.user)
    return (
      <div className="container py-2">
        <AuthenticatedApp />
      </div>
    )
  return (
    <div style={{ height: '100vh' }}>
      <UnauthenticatedApp />
    </div>
  )
}

export default App
