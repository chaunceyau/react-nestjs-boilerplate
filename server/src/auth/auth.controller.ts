import {
  Controller,
  Post,
  Request,
  Response,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common'
//
import { User } from '../user/models/user.model'
import { UserService } from '../user/user.service'
import { LoginGuard } from '../common/guards/login.guard'
import { AccountService } from '../account/account.service'
import { CreateAccountDTO } from '../account/dto/create-account.dto'
import { RESTAuthenticatedGuard } from '../common/guards/authenticated.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {}
  
  @UseGuards(RESTAuthenticatedGuard)
  @Get('whoami')
  async whoami(@Request() req) {
    return this.userService.findOneById(req.user.id)
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login() {
    return { success: true }
  }

  @Post('register')
  async register(
    @Body() { username, password }: CreateAccountDTO
  ): Promise<User> {
    return this.accountService.createAccount(username, password)
  }

  @Post('logout')
  logout(@Request() req) {
    req.logout()
  }
}
