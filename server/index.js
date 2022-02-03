const server = require('./server').server

async function run () {
    const s = await server()
    app.listen(3000, () => {
        console.log('server is running on port 3000')
    })
}
    
server().catch(console.error)