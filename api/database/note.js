const uuid = require('uuid').v4

exports.createNote = async function (client, accountId) {
    const noteId = uuid()
    const current_time = new Date().toISOString()
    const { rowCount } = await client.query({
        name: 'create-note',
        text: 'INSERT INTO notes (note_id, account_id, date_updated, content) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        values: [
            noteId,
            accountId,
            current_time,
            ""
        ]
    })
    return rowCount > 0 ? noteId : undefined
}

exports.getNote = async function (client, accountId) {
    const { rows } = await client.query({
        name: 'get-note',
        text: 'SELECT * FROM notes WHERE account_id = $1',
        values: [accountId]
    })
    return rows[0]
}

exports.updateNote = async function (client, account_id, content) {
    const current_time = new Date().toISOString()
    const { row } = client.query({
        name: 'update-note',
        text: 'UPDATE notes SET content=$1, date_updated=$2 WHERE account_id = $3 RETURNING *',
        values: [
            content,
            current_time,
            account_id
        ]
    })
    return row
}