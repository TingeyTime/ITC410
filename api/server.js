const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')

const app = express()

// Any paths defined in your openapi.yml will validate and parse the request
// before it calls your route code.
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcer = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcer)

//bodyParsers
app.use(express.json())
app.use(express.text())

// Print log server-side
app.use((req, res, next) => {
  // console.log(req.method + ' ' + req.path, req.headers, req.body)
  next()
})

app.use(enforcerMiddleware.init({baseUrl: "/api"}))

// Catch errors
enforcerMiddleware.on('error', err => {
  console.error(err)
  process.exit(1)
}) 

app.use(enforcerMiddleware.mock())

module.exports = app