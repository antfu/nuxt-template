import session from 'express-session'
import ConnectMongo from 'connect-mongo'
import configs from '../configs/server'
import connection from './database'

const MongoStore = ConnectMongo(session)

const SESSION_CONFIG = {
  secret: configs.session.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: configs.session.max_age,
    sameSite: true,
    httpOnly: true,
  },
  secure: true,
  store: new MongoStore({
    mongooseConnection: connection,
  }),
  rolling: true,
}

if (process.env.NODE_ENV === 'development') {
  SESSION_CONFIG.cookie.sameSite = false
  SESSION_CONFIG.cookie.httpOnly = false
}

export default () => session(SESSION_CONFIG)
