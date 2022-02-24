require('dotenv').config('../.env')

const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const { Pool } = require('pg')
const path = require('path')
const LocalStrategy     = require('passport-local').Strategy;
const passport          = require('passport');
const session           = require('express-session');

// controllers
const Accounts = require('./controllers/account')

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

//bodyParsers (adds the request's body property)
app.use(express.json())
app.use(express.text())

/// Cookies and Passport

// app.use(cookieParser());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy(function(username, password, done) {
  if (username && password === 'pass') return done(null, { username: username });
  return done(null, false);
}));

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
  done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(id, done) {
  done(null, { username: id });
});

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

app.use((req, res, next) => {
  const { operation } = req.enforcer
  if (operation.security !== undefined) {
    const sessionIsRequired = operation.security.find(obj => obj.cookieAuth !== undefined)
    if (sessionIsRequired) {
      const cookie = req.cookies.simplePlanSessionId
      if (cookie === undefined || req.user === undefined) {
        res.sendStatus(401)
        return;
      }
    }
  }
  next()
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