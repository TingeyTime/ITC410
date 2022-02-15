const { Pool, Client } = require ('pg')
// pools will use environment variables
// for connection information
const pool = new Pool()

async function run () {
    const userId = ': OR true; //'
    const result = await pool.query('SELECT * FROM users WHERE user_id = "'+ userId + '"')

    console.log(result.rows)
}