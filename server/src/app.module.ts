import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
//
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { AccountModule } from './account/account.module'
import { LocalConfigService } from './common/config/config.service'
//
import ConfigModuleOptions from './common/config/config.options'

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    AccountModule,
    ConfigModule.forRoot(ConfigModuleOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
    }),
  ],
  providers: [LocalConfigService],
})
export class AppModule {}
