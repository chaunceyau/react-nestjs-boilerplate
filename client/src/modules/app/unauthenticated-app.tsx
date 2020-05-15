import * as React from 'react'
import { Router, Redirect } from '@reach/router'
//
import Login from '../auth/login'
import Register from '../auth/register'

export interface IUnauthenticatedAppProps {}

export function UnauthenticatedApp(props: IUnauthenticatedAppProps) {
  return (
    <>
      <Router>
        <Login path="/auth/login" />
        <Register path="/auth/register" />
        <Redirect from="/" to="/auth/login" noThrow default />
      </Router>
    </>
  )
}
