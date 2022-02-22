const accounts = require('../models/account')

module.exports = function (connection) {
    return {
        async createAccount (req, res) {
            const{ username, email, 
                name: {first, last }, password } = req.enforcer.body
            const accountId = await accounts.create
            if (accountId) {
                res.set('baseUrl', 'api/accounts' + accountId)
            }
        }
    }
}