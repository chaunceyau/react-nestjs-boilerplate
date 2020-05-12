import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { User } from './models/user.model'
import { UsersService } from './users.service'
import { GraphQLAuthenticatedGuard } from '../common/guards/authenticated.guard'

@Resolver(_of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(GraphQLAuthenticatedGuard)
  @Query(_returns => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id)
  }
}
