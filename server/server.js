const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')

exports.server = async function () {
  const app = express()
  
  // Any paths defined in your openapi.yml will validate and parse the request
  // before it calls your route code.
  const openapiPath = path.resolve(__dirname, '../openapi.yml')
  const enforcer = await Enforcer(openapiPath, { hideWarnings: true })
  const enforcerMiddleware = EnforcerMiddleware(await Enforcer('./openapi.yml'))

  //bodyParsers
  app.use(express.json())

    // Print log server-side
    app.use((req, res, next) => {
      console.log(req.method + ' ' + req.path, req.headers, req.body)
      next()
    })

  app.use(enforcerMiddleware.init())
  
  // Catch errors
  enforcerMiddleware.on('error', err => {
    console.error(err)
    process.exit(1)
  }) 
  
  // // If your openapi.yml file defines this path then this path will only
  // // execute when the request is valid otherwise it will send back a 400
  // // with a message describing why the request was invalid.
  // app.get('/api/users/:userId', (req, res) => {
  //   // OLD WAY: get the userId as a string
  //   const userIdOldWay = req.params.userId  
  
  //   // BETTER WAY: get the userID as the type defined in your openapi.yml file
  //   const userId = req.enforcer.params.userId
  
  //   // ... do some processing
  
  //   // validate, serialize, and send a response that follows your openapi.yml file
  //   res.enforcer.send({
  //     userId,
  
  //     // The date object will serialize to the correct format, according to your
  //     // openapi.yml file.  Most likely this will be either the openapi format
  //     // `date` or `date-time`.
  //     birthDate: new Date('2000-01-01') 
  //   })
    
  // })

  app.use(enforcerMiddleware.mock())

  return app;  
}