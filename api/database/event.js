const uuid = require('uuid').v4

exports.createEvent = async function (client, accountId, title, description, date_start, date_end) {
    const eventId = uuid()
    const { rowCount } = await client.query({
        name: 'create-event',
        text: 'INSERT INTO events (event_id, account_id, title, description, date_start, date_end) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
        values: [
            eventId,
            accountId,
            title,
            description,
            date_start,
            date_end
        ]
    })
    return rowCount > 0 ? eventId : undefined
}

exports.getEvent = async function (client, eventId) {
    const { rows } = await client.query({
        name: 'get-event-by-id',
        text: 'SELECT * FROM events WHERE event_id = $1',
        values: [eventId]
    })
    return rows[0]
}

exports.getEvents = async function (client, accountId) {
    const { rows } = await client.query({
        name: 'get-events-by-account-id',
        text: 'SELECT * FROM events WHERE account_id = $1',
        values: [accountId]
    })
    return rows
}

exports.updateEvent = async function (client, eventId, data) {
    const { title, description, date_start, date_end } = data
    const values = []
    const set = []

    if (title !== undefined) {
        values.push(title)
        set.push('title=$' + values.length)
    }

    if (description !== undefined) {
        values.push(description)
        set.push('description=$' + values.length)
    }

    if (date_start !== undefined) {
        values.push(date_start)
        set.push('date_start=$' + values.length)
    }

    if (date_end !== undefined) {
        values.push(date_end)
        set.push('date_end=$' + values.length)
    }

    if (values.length === 0) {
        return await exports.getEvent(client, eventId)
    }

    values.push(eventId)
    const { row } = client.query({
        name: 'update-event',
        text: 'UPDATE events SET ' + set.join(', ') + ' WHERE event_id = $' + (values.length) + ' RETURNING *',
        values
    })
    return row
}

exports.deleteEvent = async function (client, eventId) {
    const { rowCount } = client.query({
        name: 'delete-event',
        text: 'DELETE FROM events WHERE event_id = $1',
        values: [eventId]
    })
    return rowCount > 0
}