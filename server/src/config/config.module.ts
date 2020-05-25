import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { object, number, string } from '@hapi/joi'
//
import { LocalConfigService } from './config.service'
import common from './namespaces/common'
import cookies from './namespaces/cookies'
import stripe from './namespaces/stripe'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [common, cookies, stripe],
      validationSchema: object({
        PORT: number().default(5000).required(),
        NODE_ENV: string()
          .valid('development', 'production')
          .default('development'),
        //
        DATABASE_URL: string().required(),
        FRONTEND_URL: string().required(),
        // COOKIES
        COOKIE_SIGNING_SECRET: string().required(),
        // STRIPE
        STRIPE_SECRET_KEY: string().required(),
        STRIPE_SUBSCRIPTION_PRODUCT_ID: string().required(),
        STRIPE_SUBSCRIPTION_MONTHLY_PRICE_ID: string().required(),
        STRIPE_SUBSCRIPTION_ANNUAL_PRICE_ID: string().required(),
        STRIPE_BILLING_PORTAL_REDIRECT_URL: string().required(),
        STRIPE_CHECKOUT_SUCCESS_REDIRECT_URL: string().required(),
        STRIPE_CHECKOUT_CANCEL_REDIRECT_URL: string().required(),
        //
      }),
    }),
  ],
  providers: [LocalConfigService],
  exports: [LocalConfigService],
})
export class LocalConfigModule {}
