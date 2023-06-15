import  express  from "express";

const app = express()
app.use(express.json())

const users = []

app.get("/api/user",(req,res)=>{
    res.json(users)
})
app.post("/api/user",(req,res)=>{
    const user = req.body

    users.push(user)
    res.status(201).json({status: "success", message: "user created"})
})

app.put("/api/user/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const user = req.body

    const userIDx = users.findIndex(u=>u.id===id)

    if(userIDx<0){
        return res.status(404).json({status:"error", message:"user not found"})
    }

    users[userIDx] = user

    res.json({status:"success", message: "actualizando..."})
})

app.delete("/api/user/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const userIDx = users.findIndex(u=>u.id!==id)
    if(userIDx<0){
        return res.status(404).json({status: "error", message:"user not found"})
    }
    users = users.filter(u=>u.id!==id)
    res.json({status:"success", message:"user deleted"})

})

app.listen(8080)