import express from "express"

const app = express()

app.get("/api/products",(req,res)=>{
    res.status(200).send("lista de products[]")
})

app.post("/api/products",(req,res)=>{
    res.status(200).send("crear el product[]")
})

app.listen(8080)