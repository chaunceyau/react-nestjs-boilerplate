import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const RESTUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ResponseObjectUser =>
    ctx.switchToHttp().getRequest().user
)

export const GraphQLUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ResponseObjectUser =>
    GqlExecutionContext.create(ctx).getContext().getRequest().user
)

export interface ResponseObjectUser {
  id: string
}
