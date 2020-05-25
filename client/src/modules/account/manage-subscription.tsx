import React, { useState, useEffect } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { gql, useMutation } from '@apollo/client'
//
import { Card } from '../components/card'
import { Button } from '../components/button'
import { SubscriptionFeature } from './subscription-feature'

interface ManageSubscriptionSectionProps {
  path: string
}
const MUTATION_CREATE_CHECKOUT_SESSION = gql`
  mutation MutationCreateCheckoutSession {
    checkoutSession: createCheckoutSession
  }
`
export function ManageSubscriptionSection(
  props: ManageSubscriptionSectionProps
) {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  const [createCheckoutSession, { loading, data, error }] = useMutation(
    MUTATION_CREATE_CHECKOUT_SESSION
  )

  useEffect(() => {
    const stripePromise = loadStripe(
      'pk_test_X5U7Ozit1B3vyzqdvDQx6dQz00cZrffvCw'
    )
      .then(res => setStripe(res))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    async function redirectMe() {
      if (stripe) {
        const info = await stripe.redirectToCheckout({
          sessionId: data.checkoutSession
        })
      }
    }
    if (data && data.checkoutSession) {
      redirectMe()
    }
  }, [loading, data, stripe])

  return (
    <>
      {/* <Card
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
    </Card> */}
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
            Subscriptions are securely managed by Stripe. Select a plan below to
            upgrade your account.
          </span>
          <div className="grid gap-8 grid-cols-2">
            <div className="border border-gray-400 shadow rounded p-3 mt-0">
              <span className="block text-red-400 font-bold">
                Monthly Subscription
              </span>
              <span className="text-gray-500 mb-1 block">$5 per month</span>
              <div className="mt-4">
                <Button
                  color="red"
                  fluid
                  loading={!stripe || loading}
                  onClick={createCheckoutSession}
                  // onClick={async () => {
                  //   console.log('data')
                  //   try {
                  //     console.log('data1')
                  //     await createCheckoutSession()
                  //     console.log('data', data)
                  //     if (stripe && data && data.checkoutSession) {
                  //       console.log('STRIPE :)', data)
                  //       const info = await stripe.redirectToCheckout({
                  //         sessionId: data.checkoutSession
                  //       })
                  //       console.log(info)
                  //     } else {
                  //       console.log('NO STRIPE')
                  //     }
                  //   } catch (error) {
                  //     console.log(error)
                  //   }
                  // }}
                >
                  Subscribe Monthly
                </Button>
              </div>
            </div>
            <div className="border border-gray-400 rounded shadow p-3 mt-0">
              <span className="block text-red-400 font-bold">
                Annual Subscription
              </span>
              <span className="text-gray-500 mb-1 block">$50 per year</span>
              <div className="mt-4">
                <Button color="red" fluid>
                  Subscribe Yearly
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
{
  /* <a
href={
  process.env.SUBSCRIPTION_REDIRECT_ENDPOINT ||
  'http://localhost:5000/subscription'
}
>
<Button color="red">Change plan</Button>
</a> */
}
