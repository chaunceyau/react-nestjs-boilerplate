import * as React from 'react'
import { Router } from '@reach/router'
//
import Logout from '../auth/logout'
import { Dashboard } from '../dashboard'
import { Frame } from '../components/frame'
import { Checkout } from '../stripe/checkout'
import { Navigation } from '../components/top-navigation'
import { AccountDetails } from '../account/account-details'
import { Authenticated404 } from '../common/404-authenticated'
import { ManageSubscriptionSection } from '../account/manage-subscription'

export interface IAuthenticatedAppProps {}

export function AuthenticatedApp(props: IAuthenticatedAppProps) {
  return (
    <>
      <Navigation />
      <Router>
        <Dashboard path="dashboard" />
        <Logout path="logout" />
        <Checkout path="checkout" />
        <Frame path="account">
          <Dashboard path="/" />
          <AccountDetails path="details" />
          <ManageSubscriptionSection path="subscription" />
        </Frame>
        <Authenticated404 default />
      </Router>
    </>
  )
}
