import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { User } from './models/user.model'
import { UserService } from './user.service'
import { GraphQLAuthenticatedGuard } from '../common/guards/authenticated.guard'

@Resolver(_of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GraphQLAuthenticatedGuard)
  @Query(_returns => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id)
  }
}
