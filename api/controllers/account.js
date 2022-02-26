const accounts = require('../database/account')
const jwt = require('jsonwebtoken')
const secret = process.env.COOKIE_SECRET

module.exports = function (pool) {
    return {
        async createAccount (req, res) {
            const { email, username, name, password } = req.enforcer.body
            const accountId = await accounts.createAccount(pool, email, username, name, password)
            if (accountId) {
                const token = jwt.sign({
                    sub: username,
                    admin: false
                }, secret)
                res.set('location', '/api/accounts/' + accountId)
                    .enforcer
                    .status(201)
                    .send()
            } else {
                res.enforcer.status(409).send()
            }
        },

        async updateAccount (req, res) {
            const data = req.enforcer.body
            const { accountId } = req.enforcer.params

            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                let account = await accounts.getAccount(client, accountId)
                if (account === undefined) {
                    res.enforcer.status(404).send()
                } else {
                    await accounts.updateAccount(client, accountId, data)
                    res.enforcer.status(200).send()
                }
                await client.query('COMMIT')
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            } finally {
                client.release()
            }
        },

        async deleteAccount (req, res) {
            const { accountId } = req. enforcer.params
            await accounts.deleteAccount(pool, accountId)
            res.enforcer.status(204).send()
        },

        async login (req, res) {

        },

        async logout (req, res) {

        }
    }
}