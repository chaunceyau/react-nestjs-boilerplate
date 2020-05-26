import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

// note: decorators not enforcing type safety on decorators...
export interface ResponseObjectUser {
  id: string
  username: string
  subscription_type?: SubscriptionType
  stripe_customer_id?: string
  stripe_subscription_id?: string
  current_period_end?: string
}

enum SubscriptionType {
  FREE_TIER = 'FREE_TIER',
  PREMIUM_SUBSCRIBER = 'PREMIUM_SUBSCRIBER',
  ENTERPRISE_SUBSCRIBER = 'ENTERPRISE_SUBSCRIBER',
}

export const RESTUser = createParamDecorator<ResponseObjectUser>(
  (data: unknown, ctx: ExecutionContext): ResponseObjectUser =>
    ctx.switchToHttp().getRequest().user
)

export const GraphQLUser = createParamDecorator<ResponseObjectUser>(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().req.user
)
