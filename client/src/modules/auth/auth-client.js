import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
//
import { client } from '../common/local-apollo-client'

export const QUERY_CURRENT_USER = gql`
  query QUERY_CURRENT_USER {
    currentUser {
      id
    }
  }
`
function handleUserResponse({ data }) {
  if (!data) return { data: null }
  return data.login
}

function login({ email, password }) {
  return client
    .mutate({
      mutation: MUTATION_LOGIN_USER,
      variables: { email, password }
    })
    .then(handleUserResponse)
    .catch(err => Promise.reject(err))
}

function register({ email, password }) {
  return client.mutate({
    mutation: MUTATION_REGISTER_USER,
    variables: { email, password }
  })
}

export function useRegistration() {
  const [registerMutation, { loading, data, error }] = useMutation(
    MUTATION_REGISTER_USER
  )

  return {
    registerMutation,
    loading,
    data,
    error
  }
}

function logout() {
  return client.mutate({
    mutation: gql`
      mutation LogoutUser {
        logout
      }
    `
  })
}

const MUTATION_REGISTER_USER = gql`
  mutation MUTATION_REGISTER_USER($email: String!, $password: String!) {
    createAccount(createAccountInput: { email: $email, password: $password }) {
      id
    }
  }
`

const MUTATION_LOGIN_USER = gql`
  mutation MUTATION_LOGIN_USER($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      id
    }
  }
`

export { login, register, logout }
