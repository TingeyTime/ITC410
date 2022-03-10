const uuid = require('uuid').v4

exports.createevent = async function (client, title, description, date_start = 0, date_end = false) {
    const eventId = uuid()
    const { rowCount } = client.query({
        name: 'create-event',
        text: 'INSERT INTO events (event_id, title, description, date_start, date_end) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        values: [
            eventId,
            title,
            description,
            date_start,
            date_end
        ]
    })
    return rowCount > 0 ? eventId : undefined
}

exports.getevent = async function (client, eventId) {
    const { rows } = await client.query({
        name: 'get-event-by-id',
        text: 'SELECT * FROM events WHERE event_id = $1',
        values: [eventId]
    })
    return rows[0]
}

exports.updateevent = async function (client, eventId, data) {
    const { title, description, date_start, date_end } = data
    const values = []
    const set = []

    if (title !== undefined) {
        values.push(title)
        set.push('title=$' + values.length)
    }

    if (title !== undefined) {
        values.push(description)
        set.push('description=$' + values.length)
    }

    if (title !== undefined) {
        values.push(date_start)
        set.push('date_start=$' + values.length)
    }

    if (date_end !== undefined) {
        values.push(date_end)
        set.push('date_end=$' + values.length)
    }

    if (values.length === 0) {
        return await exports.getevent(client, eventId)
    }

    values.push(eventId)
    const { row } = client.query({
        name: 'update-event',
        text: 'UPDATE events SET ' + set.join(', ') + ' WHERE list_id = $' + (values.length) + ' RETURNING *',
        values
    })
    return row
}

exports.deleteevent = async function (client, eventId) {
    const { rowCount } = client.query({
        name: 'delete-event',
        text: 'DELETE FROM events WHERE event_id = $1',
        values: [eventId]
    })
    return rowCount > 0
}