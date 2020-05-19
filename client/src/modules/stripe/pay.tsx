import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement } from '@stripe/react-stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

export function Pay() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <h1>lol</h1>
        <CardSection />
      </div>
    </Elements>
  )
}

/**
 * Use the CSS tab above to style your Element's container.
 */

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}

function CardSection() {
  return (
    <label>
      Card details
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  )
}
