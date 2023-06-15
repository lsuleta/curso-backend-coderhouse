import express from "express"

const app = express()

app.get("/saludo/:nombre",(req,res)=>{
    console.log(req.params)
    res.send(`saludos a`)
})

app.listen(8080)