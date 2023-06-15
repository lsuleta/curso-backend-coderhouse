const http = require("http")

const server = http.createServer((request, response)=>{
    console.log("se recibio un request")
    response.end("mi primer hola desde el back")
})

server.listen(8080,()=>{
    console.log("el server corre y escucha en el puerto 8080")
})

/*
Entrar a http://127.0.0.1:8080/ -> Corre el programa en local
*/