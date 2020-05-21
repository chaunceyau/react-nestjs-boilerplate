import React from 'react'
//
import { Card } from '../components/card'
import { Button } from '../components/button'

interface CardManageSubscriptionProps {}

export function CardManageSubscription(props: CardManageSubscriptionProps) {
  return (
    <Card
      title="Manage Subscription"
      cta={
        <img
          src={require('../../assets/stripe.png')}
          style={{ height: 24, width: 'auto' }}
        />
      }
    >
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-3">
          Subscriptions are securely managed by Stripe. Click change plan below
          to manage your subscription details.
        </span>
        <div className="bg-gray-200 rounded p-3 mt-0 mb-3">
          <span className="block text-gray-600 font-bold">Current Plan</span>
          <span className="text-gray-500">Premium Membership - Monthly</span>
        </div>
        <a
          href={
            process.env.SUBSCRIPTION_REDIRECT_ENDPOINT ||
            'http://localhost:5000/subscription'
          }
        >
          <Button color="red">Change plan</Button>
        </a>
      </div>
    </Card>
  )
}
