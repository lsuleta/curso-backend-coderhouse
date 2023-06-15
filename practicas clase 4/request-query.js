import express from "express"

const app = express()

app.get("/saludo", (req, res)=>{
    console.log(req.query)
    const edad = req.query.edad
    res.send(`tu edad es ${edad} años`)
})

app.listen(8080)