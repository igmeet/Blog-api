// is me code server setup or create krne ke liye likhenege.

const http = require('http') // http librabry import. jaha code ko direct use kr sake
const port = 3000; // port bna rhe jaha server ko listen kr ske
const app = require('../Blog Api/app')

const server = http.createServer(app)  //paranthesis k andr application ka name


server.listen(port,()=>{console.log("this app is running on port "+port)}) // server ko listen.








