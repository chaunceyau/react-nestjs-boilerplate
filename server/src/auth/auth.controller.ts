import {
  Controller,
  Post,
  Request,
  Response,
  Get,
  UseGuards,
} from '@nestjs/common'
//
import { UsersService } from '../users/users.service'
import { LoginGuard } from '../common/guards/login.guard'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('whoami')
  async whoami(@Request() req) {
    const { password, salt, ...result } = await this.usersService.findById(
      req.user.userId
    )
    return result
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login() {
    return { success: true }
  }

  @Get('logout')
  logout(@Request() req, @Response() res) {
    req.logout()
    res.redirect('/home')
  }
}
