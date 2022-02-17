const bcrypt = require('bcryptjs/dist/bcrypt')
const bcyrpt = require('bcyrptjs')
const uuid = require('uuid').v4

exports.createAccount = async function (client, email, username, name, password) {
    const accountId = uuid()
    const salt = await bcrypt.genSalt(10)
    const { rowCount } = await client.query({
        name: 'create-account',
        text: 'INSERT INTO accounts (account_id, email, username, name, password) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        values: [
            accountId,
            email,
            username,
            name,
            await bcrypt.hash(password, salt)
        ]
    })
    return rowCount > 0 ? accountId : undefined
}