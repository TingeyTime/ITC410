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

    /// Test accounts
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
                    email: "email",
                    password: "a-password"
                })
                .expect(200)
        })

        it('can logout a user', () => {
            return request(app)
                .put('/accounts/accountId/logout')
                .expect(200)
        })

        // Negative assertions
        it('cannot create an account with just a username', () =>{
            return request(app)
                .post('/account')
                .send({
                    username: "forgot-an-email",
                    password: "too-short"
                })
                .expect(404)
        })

        it('can login a user without an email', () => {
            return request(app)
                .put('/accounts/accountId/login')
                .send({
                    password: "nope"
                })
                .expect(400)
        })
    })

    /// Test task lists
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

        // Negative assertions
        it('cannot create a task list without a title', () => {
            return request(app)
                .post('/taskLists')
                .send({})
                .expect(400)
        })

        it('cannot delete a task list without an id', () => {
            return request(app)
                .delete('/taskLists')
                .expect(405)
        })
    })

    // Test tasks
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
                .post('/tasks')
                .send({
                    // listId: "001",
                    title: "simple",
                    duration: 10
                })
                .expect(201)
        })

        it('can update a task', () => {
            return request(app)
                .put('/tasks/taskId')
                .send({
                    title: "simple",
                    duration: 20
                })
                .expect(200)
        })
        
        it('can delete a task', () => {
            return request(app)
                .delete('/tasks/taskId')
                .expect(204)
        })

        // Negative assertions
        it('cannot create a task without a title', () => {
            return request(app)
                .post('/tasks')
                .send({})
                .expect(400)
        })

        it('cannot delete a task without an id', () => {
            return request(app)
                .delete('/tasks')
                .expect(405)
        })
    })

    describe('events', () => {
        it('can get events', async function() {
            const res = await request(app)
                .get('/events')
                .set('Accept', 'application/json')
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('Array')
        })

        it('can create an event', () => {
            return request(app)
                .post('/events')
                .send({
                    title: "simple",
                    start: "2022-01-01T22:00:00Z",
                    end: "2022-01-01T22:10:00Z"
                })
                .expect(201)
        })

        it('can update an event', () => {
            return request(app)
                .put('/events/eventId')
                .send({
                    title: "simple",
                    start: "2022-01-01T22:00:00Z",
                    end: "2022-01-01T22:20:00Z"
                })
                .expect(200)
        })
        
        it('can delete an event', () => {
            return request(app)
                .delete('/events/eventId')
                .expect(204)
        })

        // Negative assertions
        it('cannot create an event without a title', () => {
            return request(app)
                .post('/events')
                .send({})
                .expect(400)
        })

        it('cannot delete an event without an id', () => {
            return request(app)
                .delete('/events')
                .expect(405)
        })
    })

    // Test notes
    describe('notes', () => {
        it('can update a note', () => {
            return request(app)
                .put('/notes')
                .set("Content-type", "text/plain")
                .send("This is my note.")
                .expect(200)
        })

        // Negative Assertions
        it('cannot delete a note', () => {
            return request(app)
                .delete('/notes')
                .expect(405)
        })
    })
})