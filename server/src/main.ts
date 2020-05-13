import { createClient } from 'redis'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
//
import * as passport from 'passport'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
//
import { AppModule } from './app.module'
import { LocalConfigService } from './common/config/config.service'

async function bootstrap() {
  // redis for sessions
  const RedisStore = connectRedis(session)
  const redisClient = createClient()

  const app = await NestFactory.create(AppModule)

  const configService = app.get(LocalConfigService)
  app.enableCors({
    origin: configService.getCorsOrigin,
    credentials: true,
  })

  app.use(
    session({
      name: 'connect.sid',
      secret: configService.getCookieSigningKey,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // fix
        httpOnly: false, // fix
        // sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 30 * 24,
      },
      store: new RedisStore({ client: redisClient }),
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(5000)
}

bootstrap()
