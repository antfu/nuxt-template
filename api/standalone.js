import express from 'express'
import appConfig from './app'

const app = express()

app.use(appConfig.path, appConfig.handler)

const port = process.env.PORT || 3001

/* eslint-disable no-console */
app.listen(port, () => console.log(`Standalone server started at ${port}!`))
