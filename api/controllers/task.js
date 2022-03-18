const taskLists = require('../database/taskList')
const tasks = require('../database/task')

module.exports = function (pool) {
    return {
        async createTask (req, res)  {
            const { title, description, duration, complete } = req.enforcer.body
            const { taskListId } = req.enforcer.params
            const user_id = req.user.id
            let taskId = await tasks.createTask(pool, user_id, title, description, duration, complete)
            if (taskId) {
                await taskLists.addTaskToTaskList(pool, taskListId, taskId)
                res.set('location', '/api/taskLists/' + taskListId + '/tasks/' + taskId)
                    .enforcer
                    .status(201)
                    .send({
                        list_id: taskListId,
                        task_id: taskId,
                        title: title,
                        duration: duration,
                        complete: complete ?? null
                    })
            } else {
                res.enforcer.status(409).send()
            }
        },
        
        async getTasks (req, res) {
            const userId = req.user.id
            const client = await pool.connect()
            let allTasks = await tasks.getAllTasks(client, userId)
            let returnBody = [];
            allTasks.forEach((task) => {
                returnBody.push({
                    task_id: task.task_id,
                    title: task.title,
                    duration: Number(task.duration),
                    complete: task.complete
                })
            })
            res.enforcer.status(200).send(returnBody)
        },

        async getTasksFromTaskList (req, res) {
            const { taskListId } = req.enforcer.params
            const client = await pool.connect()
            let tasks_in_list = await taskLists.getTasksInTaskList(client, taskListId)
            let returnBody = [];
            tasks_in_list.forEach((task) => {
                returnBody.push({
                    task_id: task.task_id,
                    title: task.title,
                    description: task.description,
                    duration: Number(task.duration),
                    complete: task.complete
                })
            })
            res.enforcer.status(200).send(returnBody)
        },

        async updateTask (req, res) {
            const { taskId } = req.enforcer.params
            const data = req.enforcer.body
            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                let task = await tasks.getTask(client, taskId)
                if (task === undefined) {
                    res.enforcer.status(404).send()
                } else if (task.account_id !== req.user.id) {
                    res.enforcer.status(403).send()
                } else {
                    await tasks.updateTask(client, taskId, data)
                    let updated_task = await tasks.getTask(client, taskId)
                    res.enforcer.status(200).send({
                        list_id: updated_task.list_id,
                        task_id: updated_task.task_id,
                        title: updated_task.title,
                        description: updated_task.description,
                        duration: Number(updated_task.duration),
                        complete: updated_task.complete
                    })
                }
                await client.query('COMMIT')
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            } finally {
                client.release()
            }
        },

        async deleteTask (req, res) {
            const { taskId } = req.enforcer.params
            const client = await pool.connect()
            await tasks.deleteTask(client, taskId)
            res.enforcer.status(204).send()
        }
    }
}