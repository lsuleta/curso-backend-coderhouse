import express from "express"

const app = express()

app.get("/saludo", (request, response)=>{
    response.send("hola valen desde express")
})

app.get("/bienvenida", (request, response)=>{
    response.send(`<h1 style="color: blue">Bienvenido</h1>`)
})

app.get("/usuario", (request, response)=>{
    response.send(`{name:"lucas", lastname:"suleta", age: 23, email:"lsuleta60"}`)
})

app.listen(8080, ()=>console.log("corriendo en 8080..."))

