import { createClient } from 'redis'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
//
// import * as csurf from 'csurf'
import * as helmet from 'helmet'
import * as passport from 'passport'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
//
import { AppModule } from './app.module'
import { LocalConfigService } from './config/config.service'

async function bootstrap() {
  // redis for sessions
  const RedisStore = connectRedis(session)
  const redisClient = createClient()

  const app = await NestFactory.create(AppModule)

  const configService = app.get(LocalConfigService)

  app.use(helmet())

  app.enableCors(configService.corsConfig)

  app.use(
    session({
      name: 'sessionid',
      secret: configService.cookieSigningKey,
      resave: false,
      saveUninitialized: false,
      cookie: configService.cookieOptions,
      store: new RedisStore({ client: redisClient }),
    })
  )
  // TODO: instead of csurf, let's enforce JSON only communication?
  // 👀 potential problem - multipart form data?
  // https://github.com/pillarjs/understanding-csrf
  // app.use(csurf())

  app.use(passport.initialize())
  app.use(passport.session())

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(5000)
}

bootstrap()
