import { NestFactory } from '@nestjs/core'
import { createClient } from 'redis'
//
import passport from 'passport'
import session from 'express-session'
import connectRedis from 'connect-redis'
//
import { AppModule } from './app.module'
import { urlencoded } from 'express'
//
const RedisStore = connectRedis(session)
const redisClient = createClient()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000', 'localhost:3000', 'localhost'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    },
  })
  // app.set('trust proxy', 1) // trust first proxy
  app.use(
    session({
      // name: 'connect.sid',
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: false,
        // sameSite: 'lax',
        maxAge: 1000 * 60 * 60,
      },
      store: new RedisStore({ client: redisClient }),
    })
  )
  // app.use(urlencoded({ extended: true })) // express body-parser
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(5000)
}

bootstrap()
