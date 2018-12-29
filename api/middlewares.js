import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import session from './session'
import cookieParser from 'cookie-parser'

export default app => {
  if (process.env.NODE_ENV === 'production')
    app.use(helmet())

  //app.use(compression())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json({ limit: '2mb' }))
  app.use(cookieParser())
  app.use(session())

  if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

  app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Content-Disposition, Filename')
    next()
  })
}
