const accounts = require('../database/account')
const taskLists = require('../database/taskList')

module.exports = function (pool) {
    return {
        async createTaskList (req, res) {
            const { title, completed } = req.enforcer.body
            const user_id = req.user.id
            const taskListId = await taskLists.createTaskList(pool, user_id, title, completed)
            if (taskListId) {
                res.set('location', '/api/taskLists/' + taskListId)
                    .enforcer
                    .status(201)
                    .send({
                        title: title,
                        completed: completed
                    })
            } else {
                res.enforcer.status(409).send()
            }
        },

        async getTaskLists (req, res) {
            const user_id = req.user.id
            const user_username = req.user.username
            const client = await pool.connect()
            let account = await accounts.getAccountByUsername(client, user_username)
            let user_taskLists = await taskLists.getTaskLists(client, user_id)
            if (account === undefined) {
                res.enforcer.status(404).send()
            } else if (account.account_id !== req.user.id) {
                res.enforcer.status(403).send()
            } else {
                res.enforcer.status(200).send(user_taskLists)
            }
        },

        async updateTaskList (req, res) { // FIXME: update still failing, possible issue with timestamp
            const data = req.enforcer.body
            const { taskListId } = req.enforcer.params

            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                let taskList = await taskLists.getTaskList(client, taskListId)
                if (taskList === undefined) {
                    res.enforcer.status(404).send()
                } else {
                    await taskLists.updateTaskList(client, taskListId, data)
                    let updated_list = await taskLists.getTaskList(client, taskListId)
                    res.enforcer.status(200).send({
                        list_id: updated_list.list_id,
                        title: updated_list.title,
                        completed: updated_list.completed
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

        async deleteTaskList (req, res) { // FIXME: Add 401, 403, 404
            const { taskListId } = req.enforcer.params
            await taskLists.deleteTaskList(pool, taskListId)
            res.enforcer.status(204).send()
        }
    }
}