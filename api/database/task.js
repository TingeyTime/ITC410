const uuid = require('uuid').v4

exports.createTask = async function (client, accountId, title, description, duration = 0, complete = null) {
    const taskId = uuid()
    const { rowCount } = await client.query({
        name: 'create-task',
        text: 'INSERT INTO tasks (task_id, account_id, title, description, duration, complete) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
        values: [
            taskId,
            accountId,
            title,
            description,
            duration,
            complete
        ]
    })
    return rowCount > 0 ? taskId : undefined
}

exports.getTask = async function (client, taskId) {
    const { rows } = await client.query({
        name: 'get-task-by-id',
        text: 'SELECT task_id, title, description, duration, complete FROM tasks WHERE task_id = $1',
        values: [taskId]
    })
    return rows[0]
}

exports.getAllTasks = async function (client, acountId) {
    const { rows } = await client.query({
        name: 'get-task-by-id',
        text: 'SELECT task_id, title, description, duration, complete FROM tasks WHERE account_id = $1',
        values: [acountId]
    })
    return rows
}

exports.updateTask = async function (client, taskId, data) {
    const { title, complete } = data
    const values = []
    const set = []

    if (title !== undefined) {
        values.push(title)
        set.push('title=$' + values.length)
    }

    if (complete !== undefined) {
        values.push(complete)
        set.push('complete=$' + values.length)
    }

    if (values.length === 0) {
        return await exports.gettask(client, taskId)
    }

    values.push(taskId)
    const { row } = client.query({
        name: 'update-task',
        text: 'UPDATE tasks SET ' + set.join(', ') + ' WHERE task_id = $' + (values.length) + ' RETURNING *',
        values
    })
    return row
}

exports.deleteTask = async function (client, taskId) {
    const { rowCount } = client.query({
        name: 'delete-task',
        text: 'DELETE FROM tasks WHERE task_id = $1',
        values: [taskId]
    })
    return rowCount > 0
}