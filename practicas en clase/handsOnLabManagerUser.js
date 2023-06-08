const fs = require("fs")
const crypto = require("crypto")

class ManagerUser{

    constructor(filename){
        this.filename = filename
        this.format = "utf-8"
    }

    createUser = async (name, lastname, age, course) => {
        const user = {name, lastname, age, course}
        user.salt = crypto.randomBytes(128).toString("base64")
        user.password = crypto.createHmac("sha256", user.salt).update(password).digest("hex")
        
        const list = await this.getUser() //conseguimos lista de usuarios
        list.push(user)//agregramos a la list el nuevo usuario
        //escribe si no existe o lo sobreescribe si ya existe
        await fs.promises.writeFile(this.filename, JSON.stringify(list))
    }

    getUser = async() => {
        try{
            //leer contenido del arhcivo
            const data = await fs.promises.readFile(this.filename, this.format)
            const dataObj = JSON.parse(data)//pasamos de string a objeto

            return dataObj
        }catch(error){
            //si no existe retorna una lista vacia
            console.log("no hay archico")
            return[]
        }
    }
}

async function run(){
    const manager = new ManagerUser("user.json")
    await manager.createUser("R2", "Verbel", 23, "front")

    console.log(await manager.getUser())
}

run()