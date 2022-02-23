require('dotenv').config('../.env')

const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const { Pool } = require('pg')
const path = require('path')
const Accounts = require('./controllers/account')
// controllers

// Test Database Connection

const pool = new Pool({
      host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log('Database connected')
  }
})


const app = express()

// Any paths defined in your openapi.yml will validate and parse the request
// before it calls your route code.
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcer = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcer)

//bodyParsers
app.use(express.json())
app.use(express.text())

// // Print log server-side
// app.use((req, res, next) => {
//   console.log(req.method + ' ' + req.path, req.headers, req.body)
//   next()
// })

app.use(enforcerMiddleware.init({baseUrl: "/api"}))

// Catch errors
enforcerMiddleware.on('error', err => {
  console.error(err)
  process.exit(1)
}) 

app.use(enforcerMiddleware.route({
  accounts: Accounts(pool)
  // taskLists: TaskLists(pool),
  // tasks: Tasks(pool),
  // events: Events(pool),
  // notes: Notes(pool),
}))

app.use(enforcerMiddleware.mock())

module.exports = app