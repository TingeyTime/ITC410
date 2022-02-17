require('dotenv').config('../.env')

const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
// const { Pool } = require('pg')
const mongoose = require('mongoose')
const path = require('path')
// controllers

// Test Database Connection
mongoose.connect(`${process.env.DB_URL}/test`, (err, res) => {
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

// app.use(enforcerMiddleware.route({
//   accounts: _Accounts(pool),
//   // taskLists: _TaskList(pool),
//   // tasks: _Tasks(pool),
//   // events: _Events(pool),
//   // notes: _Notes(pool),
// }))

app.use(enforcerMiddleware.mock())

module.exports = app