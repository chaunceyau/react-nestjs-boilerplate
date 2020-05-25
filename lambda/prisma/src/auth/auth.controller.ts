import {
  Controller,
  Post,
  Request,
  Response,
  Get,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { LoginGuard } from './login.guard'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('whoami')
  async whoami(@Request() req) {
    return req.user
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login() {
    // res.redirect('http://localhost:3001')
    return { success: true }
  }

  @Get('logout')
  logout(@Request() req, @Response() res) {
    req.logout()
    res.redirect('/home')
  }
}
