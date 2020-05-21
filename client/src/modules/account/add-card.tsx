import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js'
//
import { TextInput } from '../components/text-input'
import { Button } from '../components/button'
import { useMutation, gql } from '@apollo/client'
//
const stripePromise = loadStripe('pk_test_X5U7Ozit1B3vyzqdvDQx6dQz00cZrffvCw')

export function Pay() {
  return (
    <Elements stripe={stripePromise}>
      <AddCard />
    </Elements>
  )
}

interface AddCardProps {}

const CREATE_PAYMENT_METHOD_MUTATION = gql`
    mutation CreatePaymentMethodMutation ($input: CreatePaymentMethodInput) { 
        createPaymentMethod(input: $input) {
            id
        } 
    }
`

export function AddCard(props: AddCardProps) {
  const stripe = useStripe()
  const elements = useElements()

const [
    mutationCreatePaymentMethod, 
    {loading,data,error}
]= useMutation(CREATE_PAYMENT_METHOD_MUTATION)

  function createPaymentMethod({
    cardElement,
    // customerId,
    // priceId
  }: {
    cardElement: any
    // customerId: string
    // priceId: string
  }) {
    if (stripe) {
      return stripe
        .createPaymentMethod({
          type: 'card',
          card: cardElement
        })
        .then(async (result: any) => {
          if (result.error) {
            // displayError(error)
            console.log(result.error)
            console.log('result.error', result)
          } else {
            console.log('result.success', result)

            try {

                await mutationCreatePaymentMethod({
                    variables: {
                        payment_method_id: result.id,
                        brand: result.card.brand,
                        exp_month: result.card.exp_month,
                        exp_year: result.card.exp_year,
                        last_4: result.card.last4,
                        created: result.created,
                    }
                })
            }catch (err) {
                console.log({err})
            }

            // createSubscription({
            //   customerId: customerId,
            //   paymentMethodId: result.paymentMethod.id,
            //   priceId: priceId
            // })
          }
        })
    }
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
        color="red"
        onClick={() =>
          createPaymentMethod({
            // customerId: 'cus_HI7Vs5wOV1e8QA',
            // priceId: 'price_HHiap36oY3xKKn',
            cardElement: elements?.getElement(CardElement)
          })
        }
      >
        Pay Now
      </Button>
    </div>
  )
}
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
