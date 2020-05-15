import * as React from 'react'
import { Router } from '@reach/router'
//
import Logout from '../auth/logout'
import { Dashboard } from '../dashboard'
import { useUser } from '../context/user-context'
import { Navigation } from '../navigation/navigation'

export interface IAuthenticatedAppProps {}

export function AuthenticatedApp(props: IAuthenticatedAppProps) {
  const user = useUser()
  return (
    <>
      <Navigation user={user} />
      <Router>
        <Dashboard path="/dashboard" />
        <Logout path="/logout" />
        <LoggedIn404 default />
      </Router>
    </>
  )
}
const LoggedIn404 = (props: any) => (
  <span>404 page - auth route - not found</span>
)
