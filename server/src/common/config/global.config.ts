export default () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  COOKIE_SIGNING_SECRET: process.env.COOKIE_SIGNING_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
})
