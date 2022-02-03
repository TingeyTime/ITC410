# in Nux folder
 - copy all contents in /server/

- next.config.js
    - add 
    ```json
    ,

    {}
    ```
in api/server.js add
`module.exports = app` instead of returning the app and fix indientation
- change `const enforcer = await Enforcer(openapiPath, { hidWarnings: true })` to `const enforcerPromise = Enforcer(openapiPath, { hidWarnings: true })`

copy over `README.md` and `openapi.yml`

then run
`npm i openapi-enforcer openapi-enforcermiddleware express`

in api/server.js

`app.use(enforcerMiddleware.init({ baseUrl: '/api' })`

in api/index.js

```js
const app = require('./server')

app.listen(3001, () => {
    console.log('server is running on port 3001')
})
```