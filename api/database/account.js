const bycrypt = require('bcryptjs')
const uuid = require('uuid').v4

exports.createAccount = async function (client, email, username, name, password) {
    const accountId = uuid()
    const salt = await bycrypt.genSalt(10)
    const { rowCount } = await client.query({
        name: 'create-account',
        text: 'INSERT INTO accounts (account_id, email, username, name, password) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        values: [
            accountId,
            email,
            username,
            name,
            await bycrypt.hash(password, salt)
        ]
    })
    return rowCount > 0 ? accountId : undefined
}

exports.getAccount = async function (client, accountId) {
    const { rows } = await client.query({
        name: 'get-account-by-id',
        text: 'SELECT * FROM accounts WHERE account_id = $1',
        values: [accountId]
    })
    return rows[0]
}

exports.updateAccount = async function (client, accountId, data) {
    const { email, username, name, password } = data
    const values = []
    const set = []

    if (email !== undefined){
        values.push(email)
        set.push('email=$' + values.length)
    }

    if (username !== undefined){
        values.push(username)
        set.push('username=$' + values.length)
    }
    
    if (name !== undefined){
        values.push(name)
        set.push('name=$' + values.length)
    }
    
    if (password !== undefined){
        const salt = await bycrypt.genSalt(10)
        const hashed_password = await bycrypt.hash(password, salt)
        values.push(hashed_password)
        set.push('password=$' + values.length)
    }

    if (values.length === 0) {
        return await exports.getAccount(client, accountId)
    }

    values.push(accountId)
    const { row } = client.query({
        name: 'update-account',
        text: 'UPDATE accounts SET ' + set.join(', ') + ' WHERE account_id = $' + (values.length) + ' RETURNING *',
        values
    })
    return row
}

exports.deleteAccount = async function (client, accountId) {
    const { rowCount } = client.query({
        name: 'delete-account',
        text: 'DELETE FROM accounts WHERE account_id = $1',
        values: [accountId]
    })
    return rowCount > 0
}