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
import { UserService } from '../user/user.service'
import { LoginGuard } from '../common/guards/login.guard'
import { RESTAuthenticatedGuard } from '../common/guards/authenticated.guard'
import { AccountService } from '../account/account.service'
import { CreateAccountDto } from '../account/dto/create-account.dto'
import { User } from '../user/models/user.model'

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {}

  @UseGuards(RESTAuthenticatedGuard)
  @Get('whoami')
  async whoami(@Request() req) {
    const user = await this.userService.findOneById(req.user.id)
    return user
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login() {
    return { success: true }
  }

  @Post('register')
  async register(
    @Body() { username, password }: CreateAccountDto
  ): Promise<User> {
    return this.accountService.createAccount(username, password)
  }

  @Get('logout')
  logout(@Request() req, @Response() res) {
    req.logout()
    res.redirect('/home')
  }
}
