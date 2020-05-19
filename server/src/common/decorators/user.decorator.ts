import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

// note: decorators not enforcing type safety on decorators...
export interface ResponseObjectUser {
  id: string
}

export const RESTUser = createParamDecorator<ResponseObjectUser>(
  (data: unknown, ctx: ExecutionContext): ResponseObjectUser =>
    ctx.switchToHttp().getRequest().user
)

export const GraphQLUser = createParamDecorator<ResponseObjectUser>(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(GqlExecutionContext.create(ctx).getContext().req.user)
    return GqlExecutionContext.create(ctx).getContext().req.user
  }
)
