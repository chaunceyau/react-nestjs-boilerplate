import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { StripeModule } from 'nestjs-stripe'
//
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { AccountModule } from './account/account.module'
import { LocalConfigModule } from './config/config.module'
import { LocalConfigService } from './config/config.service'
import { SubscriptionModule } from './subscription/subscription.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    AccountModule,
    LocalConfigModule,
    SubscriptionModule,
    GraphQLModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: (localConfigService: LocalConfigService) => ({
        autoSchemaFile: localConfigService.autoSchemaFile,
        cors: localConfigService.corsConfig,
      }),
      inject: [LocalConfigService],
    }),
    StripeModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: (localConfigService: LocalConfigService) => ({
        apiKey: localConfigService.stripeSecretKey,
        apiVersion: localConfigService.stripeApiVersion,
      }),
      inject: [LocalConfigService],
    }),
  ],
})
export class AppModule {}
