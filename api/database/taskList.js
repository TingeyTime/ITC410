const uuid = require('uuid').v4

exports.createTaskList = async function (client, title, completed = false) {
    const taskListId = uuid()
    const { rowCount } = client.query({
        name: 'create-taskList',
        text: 'INSERT INTO taskLists (task_id, title, completed) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        values: [
            taskListId,
            title,
            completed
        ]
    })
    return rowCount > 0 ? taskListId : undefined
}

exports.getTaskList = async function (client, taskListId) {
    const { rows } = await client.query({
        name: 'get-task-list-by-id',
        text: 'SELECT * FROM taskLists WHERE list_id = $1',
        values: [taskListId]
    })
    return rows[0]
}

exports.updateTaskList = async function (client, taskListId, data) {
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
        return await exports.getTaskList(client, taskListId)
    }

    values.push(taskListId)
    const { row } = client.query({
        name: 'update-task-list',
        text: 'UPDATE taskLists SET ' + set.join(', ') + ' WHERE list_id = $' + (values.length) + ' RETURNING *',
        values
    })
    return row
}

exports.deleteTaskList = async function (client, taskListId) {
    const { rowCount } = client.query({
        name: 'delete-task-list',
        text: 'DELETE FROM taskLists WHERE list_id = $1',
        values: [taskListId]
    })
    return rowCount > 0
}

exports.addTaskToTaskList = async function (client, taskListId, taskId) {
    const { rowCount } = client.query({
        name: 'add-task-to-taskList',
        text: 'INSERT INTO tasksInTaskLists (list_id, task_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        values: [
            taskListId,
            taskId,
        ]
    })
    return rowCount > 0
}