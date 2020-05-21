export const capitalizeFirstLetter = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1)

// function createPaymentMethod({
//   cardElement,
//   customerId,
//   priceId
// }: {
//   cardElement: string
//   customerId: string
//   priceId: string
// }) {
//   return stripe
//     .createPaymentMethod({
//       type: 'card',
//       card: cardElement
//     })
//     .then((result: any) => {
//       if (result.error) {
//         // displayError(error)
//         console.log(result.error)
//       } else {
//         createSubscription({
//           customerId: customerId,
//           paymentMethodId: result.paymentMethod.id,
//           priceId: priceId
//         })
//       }
//     })
// }

// function createSubscription({
//   customerId,
//   paymentMethodId,
//   priceId
// }: {
//   customerId: string
//   paymentMethodId: string
//   priceId: string
// }) {
//   return (
//     fetch('/create-subscription', {
//       method: 'post',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         customerId: customerId,
//         paymentMethodId: paymentMethodId,
//         priceId: priceId
//       })
//     })
//       .then(response => {
//         return response.json()
//       })
//       // If the card is declined, display an error to the user.
//       .then(result => {
//         if (result.error) {
//           // The card had an error when trying to attach it to a customer.
//           throw result
//         }
//         return result
//       })
//       // Normalize the result to contain the object returned by Stripe.
//       // Add the addional details we need.
//       .then(result => {
//         return {
//           paymentMethodId: paymentMethodId,
//           priceId: priceId,
//           subscription: result
//         }
//       })
//       // Some payment methods require a customer to be on session
//       // to complete the payment process. Check the status of the
//       // payment intent to handle these actions.
//       .then(data => {
//         console.log('handlePaymentThatRequiresCustomerAction', data)
//         // handlePaymentThatRequiresCustomerAction
//       })
//       // If attaching this card to a Customer object succeeds,
//       // but attempts to charge the customer fail, you
//       // get a requires_payment_method error.
//       .then(data => {
//         console.log('handleRequiresPaymentMethod', data)
//         // handleRequiresPaymentMethod
//       })
//       // No more actions required. Provision your service for the user.
//       .then(data => {
//         console.log('onSubscriptionComplete', data)
//         // onSubscriptionComplete
//       })
//       .catch(error => {
//         // An error has happened. Display the failure to the user here.
//         // We utilize the HTML element we created.
//         // showCardError(error)
//         console.log(error)
//       })
//   )
// }
