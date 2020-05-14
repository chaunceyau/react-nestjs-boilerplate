import { createClient } from 'redis'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
//
import * as csurf from 'csurf'
import * as helmet from 'helmet'
import * as passport from 'passport'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import * as cookieParser from 'cookie-parser'
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
    origin: configService.corsOrigin,
    credentials: true,
  })

  app.use(helmet())
  app.use(
    session({
      // key: 'sessionid',
      name: 'sessionid',
      secret: configService.cookieSigningKey,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // fix
        httpOnly: false, // fix
        // sameSite: 'lax',
        maxAge: configService.cookieMaxAge,
      },
      store: new RedisStore({ client: redisClient }),
    })
  )
  // app.use(csurf())

  app.use(passport.initialize())
  app.use(passport.session())
  
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(5000)
}

bootstrap()
