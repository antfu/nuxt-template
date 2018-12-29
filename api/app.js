import express from 'express'
import './ployfill'
import './database'
import middlewares from './middlewares'
import routers from './routes'

const app = express()

middlewares(app)

routers(app)

export default {
  path: '/api',
  handler: app,
}
