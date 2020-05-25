import React from 'react'
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe, CreatePaymentMethodCardData } from '@stripe/stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import { TextInput } from '../components/text-input'
import { Button } from '../components/button'
// import { createPaymentMethod } from '../common/utils'
//
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_X5U7Ozit1B3vyzqdvDQx6dQz00cZrffvCw')

export function Pay() {
  return (
    // <Elements stripe={stripePromise}>
      <CardSection />
    // </Elements> 
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

function CardSection(props: any) {
  const stripe = useStripe()
  const elements = useElements()
  function createPaymentMethod({
    cardElement,
    customerId,
    priceId
  }: {
    cardElement: any
    customerId: string
    priceId: string
  }) {
    // CreatePaymentMethodCardData.card:
    if (stripe)
      return stripe
        .createPaymentMethod({
          type: 'card',
          card: cardElement
        })
        .then((result: any) => {
          if (result.error) {
            // displayError(error)
            console.log(result.error)
            console.log('result.error', result)
          } else {
            console.log('result.success', result)
            createSubscription({
              customerId: customerId,
              paymentMethodId: result.paymentMethod.id,
              priceId: priceId
            })
          }
        })
  }
  return (
    <div className="p-10">
      <TextInput
        placeholder="John Doe"
        title="Cardholder's name"
        register={null}
        error={null}
        wrapperClasses="mb-4"
      />
      <label>
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Card details
        </span>
        <div className="bg-white rounded px-3 py-2 border shadow">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </label>
      <br />
      <Button
        fluid={true}
        color='red'
        onClick={() =>
          createPaymentMethod({
            customerId: 'cus_HI7Vs5wOV1e8QA',
            priceId: 'price_HHiap36oY3xKKn',
            cardElement: elements?.getElement(CardElement)
          })
        }
      >
        Pay Now
      </Button>
    </div>
  )
}

function createSubscription({
  customerId,
  paymentMethodId,
  priceId
}: {
  customerId: string
  paymentMethodId: string
  priceId: string
}) {
  return (
    fetch('http://localhost:5000/account/create-subscription', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        customerId: customerId,
        paymentMethodId: paymentMethodId,
        priceId: priceId
      })
    })
      .then(response => {
        console.log(' response.json()')
        return response.json()
      })
      // If the card is declined, display an error to the user.
      .then(result => {
        console.log('result')
        if (result.error) {
          // The card had an error when trying to attach it to a customer.
          throw result
        }
        return result
      })
      // Normalize the result to contain the object returned by Stripe.
      // Add the addional details we need.
      .then(result => {
        console.log('{}')
        return {
          paymentMethodId: paymentMethodId,
          priceId: priceId,
          subscription: result
        }
      })
      // Some payment methods require a customer to be on session
      // to complete the payment process. Check the status of the
      // payment intent to handle these actions.
      .then(handlePaymentMethodRequired)
      // .then(data => {
      //   console.log('handlePaymentThatRequiresCustomerAction', data)
      //   // handlePaymentThatRequiresCustomerAction
      // })
      // If attaching this card to a Customer object succeeds,
      // but attempts to charge the customer fail, you
      // get a requires_payment_method error.
      .then(data => {
        console.log('handleRequiresPaymentMethod', data)
        // handleRequiresPaymentMethod
      })
      // No more actions required. Provision your service for the user.
      .then(data => {
        console.log('onSubscriptionComplete', data)
        // onSubscriptionComplete
      })
      .catch(error => {
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
        // showCardError(error)
        console.log(error)
      })
  )
}
function handlePaymentMethodRequired({
  subscription,
  paymentMethodId,
  priceId,
}: {
  subscription: any,
  paymentMethodId: any,
  priceId: any
}) {
  if (subscription.status === 'active') {
    // subscription is active, no customer actions required.
    return { subscription, priceId, paymentMethodId };
  } else if (
    subscription.latest_invoice.payment_intent.status ===
    'requires_payment_method'
  ) {
    // Using localStorage to manage the state of the retry here,
    // feel free to replace with what you prefer.
    // Store the latest invoice ID and status.
    localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
    localStorage.setItem(
      'latestInvoicePaymentIntentStatus',
      subscription.latest_invoice.payment_intent.status
    );
    throw { error: { message: 'Your card was declined.' } };
  } else {
    return { subscription, priceId, paymentMethodId };
  }
}