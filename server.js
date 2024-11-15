const http = require("http");
const app = require('./app.js')
const server = http.createServer(app)
const PORT =3000

server.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})