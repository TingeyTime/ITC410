const request = require('supertest')
const expect = require('chai').expect
const { server } = require('../server/server')

describe('server', () => {
    let app

    // beforeEach is a hook function that will run before every test.
    // We use it to get the express "app" from our server function.
    beforeEach(async () => {
        app = await server()
    })

    describe('accounts', () => {
        it('can create an account', () => {
            // The supertest request function returns a promise.
            // Remember that one way to run asynchronous tests
            // is to return a promise.
            return request(app)
                .post('/accounts')
                .send({
                    username: 'bob12',
                    name: 'Bob',
                    password: 'notBob'
                })
                .expect(201)
        })
    })
})