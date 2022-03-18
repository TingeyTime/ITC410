const notes = require('../database/note')

module.exports = function (pool) {
    return {

        async getNote (req, res) {
            const userId = req.user.id
            const client = await pool.connect()
            let note = await notes.getNote(client, userId)
            if (note === undefined) res.enforcer.status(404).send()
            else res.enforcer.status(200).send(note.content)
        },

        async updateNote (req, res) {
            const content = req.enforcer.body
            const userId = req.user.id
            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                let note = await notes.getNote(client, userId)
                if (note === undefined) res.enforcer.status(400).send()
                else if (note.account_id !== userId) {
                    res.enforcer.status(403).send()
                } else {
                    await notes.updateNote(client, userId, content)
                    let updated_note = await notes.getNote(client, userId)
                    res.enforcer.status(200).send(content)
                }
                await client.query('COMMIT')
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            } finally{
                client.release()
            }
        }

    }
}