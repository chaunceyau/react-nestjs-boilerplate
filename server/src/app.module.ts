import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
//
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { AccountModule } from './account/account.module'
import { LocalConfigModule } from './config/config.module'
import { LocalConfigService } from './config/config.service'

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    AccountModule,
    LocalConfigModule,
    GraphQLModule.forRootAsync({
      imports: [LocalConfigModule],
      useFactory: (localConfigService: LocalConfigService) => ({
        autoSchemaFile: localConfigService.autoSchemaFile,
        cors: localConfigService.corsConfig,
      }),
      inject: [LocalConfigService],
    })
  ],
})
export class AppModule {}
