import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards, Response } from '@nestjs/common'
import { GraphQLError } from 'graphql'
//
import { stripeDateToISO } from '../common/utils'
import {
  CreateSubscriptionInput,
  CreateSubscriptionResponse,
  PremiumPlanType,
} from './models/create-subscription.input'
import {
  GraphQLUser,
  ResponseObjectUser,
} from '../common/decorators/user.decorator'
import { PrismaService } from '../prisma/prisma.service'
import { SubscriptionService } from './subscription.service'
import { GraphQLAuthenticatedGuard } from '../common/guards/authenticated.guard'
import { LocalConfigService } from '../config/config.service'

@Resolver('Subscription')
export class SubscriptionResolver {
  constructor(
    private prisma: PrismaService,
    private subscriptionService: SubscriptionService,
    private localConfigService: LocalConfigService
  ) {}

  price_id = (frequency: PremiumPlanType): string => {
    if (frequency === 'PREMIUM_MONTHLY') {
      return this.localConfigService.monthlySubscriptionPriceId
    } else if (frequency === 'PREMIUM_ANNUAL') {
      return this.localConfigService.annualSubscriptionPriceId
    }
  }

  @UseGuards(GraphQLAuthenticatedGuard)
  @Query(_returns => String)
  async getBillingPortalSessionURL(@GraphQLUser() user: ResponseObjectUser) {
    const db_user = await this.prisma.user.findOne({
      where: { id: user.id },
    })
    const url = await this.subscriptionService.createBillingPortalSession({
      customer_id: db_user.stripe_customer_id,
    })

    return url
  }

  @UseGuards(GraphQLAuthenticatedGuard)
  @Mutation(_returns => CreateSubscriptionResponse)
  async createCheckoutSession(
    @Args('input') input: CreateSubscriptionInput,
    @GraphQLUser() user: ResponseObjectUser
  ) {
    const session = await this.subscriptionService.createCheckoutSession({
      customer_id: user.stripe_customer_id,
      price_id: this.price_id(input.plan),
    })
    return {
      id: session.id,
    }
  }

  // @UseGuards(GraphQLAuthenticatedGuard)
  // @Mutation(_returns => CreateSubscriptionResponse)
  // async upgradeToPremium(
  //   @Args('input') { plan }: CreateSubscriptionInput,
  //   @GraphQLUser() user: ResponseObjectUser
  // ): Promise<CreateSubscriptionResponse> {
  //   const db_user = await this.prisma.user.findOne({
  //     where: { id: user.id },
  //   })

  //   if (db_user?.stripe_subscription_id)
  //     throw new GraphQLError('Subscription already exists for this user.')
  //   // if (db_user?.stripe_info?.subscription_id)
  //   //   throw new GraphQLError('Subscription already exists for this user.')

  //   try {
  //     const subscription = await this.subscriptionService.createSubscription({
  //       customer_id: db_user.stripe_customer_id,
  //       payment_method_id: db_user.stripe_info.payment_method_id,
  //       price_id: this.subscriptionService.getPriceIdForPremiumPlan(plan),
  //     })

  //     if (!subscription) {
  //       throw new GraphQLError('Failed creating subscription.')
  //     }

  //     await this.prisma.user.update({
  //       where: { id: user.id },
  //       data: {
  //         subscription_type: 'PREMIUM_SUBSCRIBER',
  //         stripe_info: {
  //           update: {
  //             subscription_id: subscription.id,
  //           },
  //         },
  //         current_period_end: stripeDateToISO(subscription.current_period_end),
  //       },
  //     })

  //     return {
  //       success: true,
  //     }
  //   } catch (err) {
  //     console.log('HERE')
  //     throw new GraphQLError('Failed creating subscription.')
  //   }
  // }
}
