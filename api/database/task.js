const uuid = require('uuid').v4

exports.createtask = async function (client, title, description, duration = 0, completed = false) {
    const taskId = uuid()
    const { rowCount } = client.query({
        name: 'create-task',
        text: 'INSERT INTO tasks (task_id, title, description, duration, completed) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        values: [
            taskId,
            title,
            description,
            duration,
            completed
        ]
    })
    return rowCount > 0 ? taskId : undefined
}

exports.gettask = async function (client, taskId) {
    const { rows } = await client.query({
        name: 'get-task-by-id',
        text: 'SELECT * FROM tasks WHERE task_id = $1',
        values: [taskId]
    })
    return rows[0]
}

exports.updatetask = async function (client, taskId, data) {
    const { title, completed } = data
    const values = []
    const set = []

    if (title !== undefined) {
        values.push(title)
        set.push('title=$' + values.length)
    }

    if (completed !== undefined) {
        values.push(completed)
        set.push('completed=$' + values.length)
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

exports.deletetask = async function (client, taskId) {
    const { rowCount } = client.query({
        name: 'delete-task',
        text: 'DELETE FROM tasks WHERE task_id = $1',
        values: [taskId]
    })
    return rowCount > 0
}