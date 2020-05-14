import React from 'react'
import { useQuery } from '@apollo/react-hooks'
//
import {
  login,
  register,
  logout,
  QUERY_CURRENT_USER
} from '../auth/auth-client'
import { LoadingIndicator } from '../misc/loading-indicator'

const AuthContext = React.createContext()

function AuthProvider(props) {
  const { loading, data, error, refetch, called, updateQuery } = useQuery(
    QUERY_CURRENT_USER,
    { fetchPolicy: 'network-only' }
  )

  const firstAttemptIncomplete = called && loading && !data
  if (firstAttemptIncomplete) {
    if (loading) return <LoadingIndicator />
    if (error) {
      return (
        <div css={{ color: 'red' }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      )
    }
  }

  const login = form => login(form).then(refetch)
  const register = form => register(form)

  const logout = () =>
    logout().then(() => updateQuery(_prev => ({ currentUser: null })))

  return (
    <AuthContext.Provider
      value={{
        data: data && data.currentUser,
        login,
        logout,
        register
      }}
      {...props}
    />
  )
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
