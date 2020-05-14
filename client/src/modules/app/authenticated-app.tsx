import * as React from 'react';
import { Router } from '@reach/router'
import { Dashboard } from '../dashboard'

export interface IAuthenticatedAppProps {
}

export function AuthenticatedApp (props: IAuthenticatedAppProps) {
  return (
    <Router>
      <Dashboard path="/dashboard" />
      <LoggedIn404 default />
    </Router>
  );
}
const LoggedIn404 = (props: any) => <span>404 page - auth route - not found</span>

