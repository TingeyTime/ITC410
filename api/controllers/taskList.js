const taskLists = require('../database/taskList')

module.exports = function (pool) {
    return {
        async createTaskList (req, res) {
            const { title, completed } = req.enforcer.body
            const taskListId = await taskLists.createTaskList(pool, title)
            if (taskListId) {
                res.set('location', '/api/taskLists/' + taskListId)
                    .enforcer
                    .status(201)
                    .send()
            } else {
                res.enforcer.status(409).send()
            }
        },

        async updateTaskList (req, res) {
            const data = req.enforcer.body
            const { taskListId } = req.enforcer.params

            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                let taskList = await taskLists.getTaskList(client, taskListId)
                if (taskList === undefined) {
                    res.enforcer.status(404).send()
                } else {
                    await taskList.updateTaskList(client, taskListId, data)
                    res.enforcer.status(200).send()
                }
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            } finally {
                client.release()
            }
        },

        async deleteTaskList (req, res) {
            const { taskListId } = req.enforcer.params
            await taskLists.deleteTaskList(pool, taskListId)
            res.enforcer.status(204).send()
        }
    }
}