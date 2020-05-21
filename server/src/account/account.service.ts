import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import { genSalt, hash } from 'bcrypt'
import { Stripe } from 'stripe'
import * as cuid from 'cuid'
//
import { PrismaService } from '../prisma/prisma.service'
import { User } from '../user/models/user.model'

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  async createAccount(username: string, password: string): Promise<User> {
    if (!username || !password)
      throw new Error('You must provide username & password')

    const stripe_user = await this.stripeClient.customers.create({
      email: username,
    })
    
    if (!stripe_user)
      throw new InternalServerErrorException(
        'Failed creating account during stripe linking.'
      )

    const subscription = await this.stripeClient.subscriptions.create({
      customer: stripe_user.id,
      items: [{ price: 'price_HJg3tLzLSojuaP' }],
      expand: ['latest_invoice.payment_intent'],
    })

    const { salt, password: hashedPassword } = await this.hashPassword(password)
    try {
      const {
        password,
        salt: _salt,
        ...result
      } = await this.prisma.user.create({
        data: {
          id: cuid(),
          salt,
          username,
          password: hashedPassword,
          subscription_type: 'FREE_TIER',
          stripe_info: {
            create: {
              id: cuid(),
              customer_id: stripe_user.id,
              subscription_id: subscription.id,
            },
          },
        },
      })
      return result
    } catch (err) {
      throw new BadRequestException(
        'Failed creating account, account already exists.'
      )
    }
  }

  async changePassword(
    id: string,
    originalPassword: string,
    newPassword: string
  ) {
    try {
      const user = await this.prisma.user.findOne({
        where: { id },
      })
      const { password: hashedOriginalPassword } = await this.hashPassword(
        originalPassword,
        user.salt
      )
      if (hashedOriginalPassword !== user.password)
        throw new UnauthorizedException('Original password incorrect.')
      //
      const {
        password: hashedNewPassword,
        salt: newSalt,
      } = await this.hashPassword(newPassword)

      await this.prisma.user.update({
        where: { id },
        data: {
          password: hashedNewPassword,
          salt: newSalt,
        },
      })
    } catch (err) {
      throw new BadRequestException('Failed changing password.')
    }
  }

  async hashPassword(
    password: string,
    salt?: string
  ): Promise<{
    password: string
    salt: string
  }> {
    if (salt) {
      const hashedPassword = await hash(password, salt)
      return { salt, password: hashedPassword }
    } else {
      const generatedSalt = await genSalt(10)
      const hashedPassword = await hash(password, generatedSalt)
      return { salt: generatedSalt, password: hashedPassword }
    }
  }
}
