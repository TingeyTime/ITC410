const uuid = require('uuid').v4

exports.createTaskList = async function (client, accountId, title, completed = null) {
    const taskListId = uuid()
    const { rowCount } = await client.query({
        name: 'create-taskList',
        text: 'INSERT INTO taskLists (list_id, account_id, title, completed) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        values: [
            taskListId,
            accountId,
            title,
            completed
        ]
    })
    return rowCount > 0 ? taskListId : undefined
}

exports.getTaskList = async function (client, taskListId) {
    const { rows } = await client.query({
        name: 'get-task-list-by-id',
        text: 'SELECT list_id, title, completed FROM taskLists WHERE list_id = $1',
        values: [taskListId]
    })
    return rows[0]
}

exports.getTaskLists = async function (client, accountId) {
    const { rows } = await client.query({
        name: 'get-task-list-by-account-id',
        text: 'SELECT list_id, title, completed FROM taskLists WHERE account_id = $1',
        values: [accountId]
    })
    return rows
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

// Manipulate tasks in task list

/*
SELECT task_id, title, duration, complete
FROM tasks
WHERE task_id IN
    (SELECT task_id
    FROM tasksintasklists
    WHERE list_id = $1);
*/

exports.getTasksInTaskList = async function (client, taskListId) {
    const { rows } = await client.query({
        name: 'get-tasks-in-task-list',
        text: `SELECT T.task_id, T.title, T.duration, T.complete FROM tasks as T LEFT OUTER JOIN tasksInTaskLists as L ON T.task_id=L.task_id AND L.list_id = $1 GROUP BY T.task_id`,
        values: [taskListId]
    })
    return rows
}

exports.addTaskToTaskList = async function (client, taskListId, taskId) {
    const { rowCount } = client.query({
        name: 'add-task-to-taskList',
        text: 'INSERT INTO tasksInTaskLists (list_id, task_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        values: [
            taskListId,
            taskId
        ]
    })
    return rowCount > 0
}