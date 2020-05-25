// import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    // TODO: hash password
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId }
  //   console.log({ payload })
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   }
  // }
}
