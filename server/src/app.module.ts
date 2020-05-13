import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
//
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
    }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}
