import Stripe from 'stripe'
import { Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
//
import { PremiumPlanType } from './models/create-subscription.input'
import { LocalConfigService } from '../config/config.service'

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly localConfigService: LocalConfigService
  ) {}

  async createSubscription({ payment_method_id, customer_id, price_id }) {
    // Attach the payment method to the customer
    try {
      await this.stripeClient.paymentMethods.attach(payment_method_id, {
        customer: customer_id,
      })
    } catch (error) {
      throw new Error('Failed to attach payment method.')
      // return res.status('402').send({ error: { message: error.message } })
    }
    // Change the default invoice settings on the customer to the new payment method
    await this.stripeClient.customers.update(customer_id, {
      invoice_settings: {
        default_payment_method: payment_method_id,
      },
    })
    // Create the subscription
    const subscription = await this.stripeClient.subscriptions.create({
      customer: customer_id,
      items: [{ price: price_id }],
      expand: ['latest_invoice.payment_intent'],
    })
    return subscription
  }

  getPriceIdForPremiumPlan(plan: PremiumPlanType) {
    if (plan.toString() === 'PREMIUM_MONTHLY')
      return this.localConfigService.monthlySubscriptionPriceId
    else if (plan.toString() === 'PREMIUM_ANNUAL')
      return this.localConfigService.annualSubscriptionPriceId
  }
}
