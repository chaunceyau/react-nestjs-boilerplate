import {
  Controller,
  Post,
  Request,
  Response,
  Get,
  UseGuards,
} from '@nestjs/common'
//
import { UserService } from '../user/user.service'
import { LoginGuard } from '../common/guards/login.guard'
import { RESTAuthenticatedGuard } from '../common/guards/authenticated.guard'

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

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

  @Get('logout')
  logout(@Request() req, @Response() res) {
    req.logout()
    res.redirect('/home')
  }
}
