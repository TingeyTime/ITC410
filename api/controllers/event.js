const events = require('../database/event')

module.exports = function (pool) {
    return {

        async createEvent (req, res) {
            const { title, description, date_start, date_end } = req.enforcer.body
            const accountId = req.user.id
            let eventId = await events.createEvent(pool, accountId, title, description, date_start, date_end)
            if (eventId) {
                res.set('location', '/api/events/' + eventId)
                    .enforcer
                    .status(201)
                    .send({
                        event_id: eventId,
                        title: title,
                        description: description,
                        date_start: date_start ?? null,
                        date_end: date_end ?? null,
                    })
            } else {
                res.enforcer.status(409).send()
            }
        },

        async getEvents (req, res) {
            const userId = req.user.id
            const client = await pool.connect()
            let userEvents = await events.getEvents(client, userId)
            res.enforcer.status(200).send(userEvents)
        },

        async getEvent (req, res) {
            const { eventId } = req.enforcer.params
            const client = await pool.connect()
            let event = await events.getEvent(client, eventId)
            if (event === undefined) {
                res.enforcer.status(404).send()
            } else if (event.account_id !== req.user.id) {
                res.enforcer.status(403).send()
            } else {
                res.enforcer.status(200).send(event)
            }
        },

        async updateEvent (req, res) {
            const data = req.enforcer.body
            const { eventId } = req.enforcer.params
            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                let event = await events.getEvent(client, eventId)
                if (event === undefined) {
                    res.enforcer.status(404).send()
                } else if (event.account_id !== req.user.id) {
                    res.enforcer.status(403).send()
                } else {
                    await events.updateEvent(client, eventId, data)
                    let new_event = await events.getEvent(client, eventId)
                    res.enforcer.status(200).send(new_event)
                }
                await client.query('COMMIT')
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            } finally {
                client.release()
            }
        },

        async deleteEvent (req, res) {
            const { eventId } = req.enforcer.params
            const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let event = await events.getEvent(client, eventId)
				if (event === undefined) {
					res.enforcer.status(404).send()
				} else if (event.account_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await events.deleteEvent(pool, event.event_id)
					res.enforcer.status(204).send()
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}
        }
    }
}