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
                    email: 'Bob@example.com',
                    password: 'notBob'
                })
                .expect(201)
        })

        it('can delete to an account', () => {
            return request(app)
                .delete('/accounts/accountId')
                .expect(204)
        })

        it('can login a user', () => {
            return request(app)
                .put('/accounts/accountId/login')
                .send({
                    "email": "email",
                    "password": "a-password"
                })
                .expect(200)
        })

        it('can logout a user', () =>{
            return request(app)
                .put('/accounts/accountId/logout')
                .expect(200)
        })
    })

    describe('task lists', () => {
        it('can get task lists', async function() {
            const res = await request(app)
                .get('/taskLists')
                .set('Accept', 'application/json')
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('Array')
        })

        it('can create a task list', () => {
            return request(app)
                .post('/taskLists')
                .send({
                    "title": "Weekly Todo"
                })
                .expect(201)
        })

        it('can update a task list', () => {
            return request(app)
                .put('/taskLists/taskListId')
                .send({
                    "title": "Weekly Todo"
                })
                .expect(200)
        })

        it('can delete a task list', () => {
            return request(app)
                .delete('/taskLists/taskListId')
                .expect(204)
        })
    })

    describe('tasks', () => {
        it('can get tasks', async function() {
            const res = await request(app)
                .get('/tasks')
                .set('Accept', 'application/json')
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('Array')
        })

        it('can create a task', () => {
            return request(app)
                .post('/tasks/taskId')
                .send({
                    // listId: "001",
                    title: "simple",
                    duration: 10
                })
                .expect(201)
        })
    })

    // describe('events')

    // describe('notes')
})