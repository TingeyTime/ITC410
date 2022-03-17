const taskLists = require('../database/taskList')
const tasks = require('../database/task')

module.exports = function (pool) {
    return {
        async createTask (req, res)  {
            const { title, description, duration, complete } = req.enforcer.body
            const { taskListId } = req.enforcer.params
            const user_id = req.user.id
            let taskId = await tasks.createTask(pool,  user_id, title, description, duration, complete)
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
                    duration: Number(task.duration),
                    complete: task.complete
                })
            })
            res.enforcer.status(200).send(tasks_in_list)
        }
    }
}