require('dotenv').config('../.env')

const Enforcer            = require('openapi-enforcer')
const EnforcerMiddleware  = require('openapi-enforcer-middleware')
const express             = require('express')
const { Pool }            = require('pg')
const path                = require('path')
const bcrypt              = require('bcryptjs')
const LocalStrategy       = require('passport-local').Strategy;
const passport            = require('passport');
const session             = require('express-session');
const pgSession           = require('connect-pg-simple')(session);
const DatabaseAccounts    = require('./database/account')

// controllers
const Accounts = require('./controllers/account')
const Authentication = require('./controllers/authentication')
const TaskLists = require('./controllers/taskList')

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

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy((username, password, done) => {
  DatabaseAccounts.getAccountByUsername(pool, username)
    .then(async account => {
      if (account === undefined) {
        done(null, false)
      } else {
        const match = await bcrypt.compare(password, account.password)
        if (match) {
          done(null, { id: account.account_id, email: account.email, username: account.username, name: account.name})
        } else {
          const hash = await bcrypt.hash(password, account.password)
          const m2 = await bcrypt.compare(password, hash)

          done(null, false)
        }
      }
    })
    .catch(e => done(e, null))
}));

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser((id, done) => {
  done(null, JSON.parse(id));
});

const app = express()

// Any paths defined in your openapi.yml will validate and parse the request
// before it calls your route code.
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcer = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcer)

//bodyParsers (adds the request's body property)
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

/// Cookies and Passport

// app.use(cookieParser());
// app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(session({
  store: new pgSession({
    pool,
    tableName: 'accounts_sessions'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    // name: 'simplePlanSessionId',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const { operation } = req.enforcer
  if (operation.security !== undefined) {
    const sessionIsRequired = operation.security.find(obj => obj.cookieAuth !== undefined)
    if (sessionIsRequired && !req.user) {
      res.sendStatus(401)
      return
    }
  }
  next()
})

app.use(enforcerMiddleware.route({
    accounts: Accounts(pool)
  , authentication: Authentication(passport)
  , taskLists: TaskLists(pool)
  // , tasks: Tasks(pool)
  // , events: Events(pool)
  // , notes: Notes(pool)
}))

app.use(enforcerMiddleware.mock())

module.exports = app