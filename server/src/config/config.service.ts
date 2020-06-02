import { join } from 'path'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
//

@Injectable()
export class LocalConfigService {
  constructor(private configService: ConfigService) {}

  /**
   * Auto-generated GraphQL Schema from annotations
   */
  get autoSchemaFile() {
    return join(process.cwd(), 'schema.graphql')
  }

  /**
   * Cors config for Apollo Server & Express
   * note: used in both places
   */
  get corsConfig() {
    return {
      origin: this.frontendURL,
      credentials: true,
    }
  }

  /**
   * @returns e.g. http://localhost:3000
   */
  private get frontendURL() {
    return this.configService.get('common.FRONTEND_URL')
  }

  /**
   * @returns randomly generated string
   */
  get cookieSigningKey() {
    return this.configService.get('cookies.COOKIE_SIGNING_SECRET')
  }

  /**
   * @returns e.g. 1000 * 60 * 60 * 30 * 24
   */
  get cookieMaxAge() {
    return this.configService.get('cookies.COOKIE_MAX_AGE')
  }

  /**
   *
   */
  get cookieOptions() {
    const inDevelopment =
      this.configService.get('common.NODE_ENV').toLowerCase() !== 'production'

    if (inDevelopment)
      return {
        secure: false,
        httpOnly: false,
        maxAge: this.cookieMaxAge,
      }

    return {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: this.cookieMaxAge,
    }
  }

  /*
   *
   */
  get stripeSecretKey() {
    return this.configService.get('stripe.STRIPE_SECRET_KEY')
  }

  /*
   *
   */
  get stripeApiVersion() {
    return this.configService.get('stripe.STRIPE_API_VERSION')
  }

  /*
   *
   */
  get monthlySubscriptionPriceId() {
    return this.configService.get('stripe.STRIPE_SUBSCRIPTION_MONTHLY_PRICE_ID')
  }

  /*
   *
   */
  get annualSubscriptionPriceId() {
    return this.configService.get('stripe.STRIPE_SUBSCRIPTION_ANNUAL_PRICE_ID')
  }

  /*
   *
   */
  get billingPortalRedirectURL() {
    return this.configService.get('stripe.STRIPE_BILLING_PORTAL_REDIRECT_URL')
  }

  /*
   *
   */
  get checkoutSuccessRedirectURL() {
    return this.configService.get('stripe.STRIPE_CHECKOUT_SUCCESS_REDIRECT_URL')
  }

  /*
   *
   */
  get checkoutCancelRedirectURL() {
    return this.configService.get('stripe.STRIPE_CHECKOUT_CANCEL_REDIRECT_URL')
  }
}
