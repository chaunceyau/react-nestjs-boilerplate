import { Controller, Post, UseGuards, Body, Response } from '@nestjs/common'
//
import { AccountService } from './account.service'
import { PrismaService } from '../prisma/prisma.service'
import { UpdatePasswordDTO } from './dto/update-password.dto'
import {
  RESTUser,
  ResponseObjectUser,
} from '../common/decorators/user.decorator'
import { RESTAuthenticatedGuard } from '../common/guards/authenticated.guard'

@Controller('account')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private prisma: PrismaService
  ) {}

  @UseGuards(RESTAuthenticatedGuard)
  @Post('changepass')
  async changePassword(
    @Body() body: UpdatePasswordDTO,
    @RESTUser() user: ResponseObjectUser
  ) {
    return this.accountService.changePassword(
      user.id,
      body.oldPassword,
      body.newPassword
    )
  }
}
