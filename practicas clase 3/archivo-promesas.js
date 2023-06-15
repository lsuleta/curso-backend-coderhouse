const fs = require("fs")

const filename = "ejemplo.txt"

const opAsync = async() => {
    try{
        //promesa que escribe
        await fs.promises.writeFile(filename, "saludos a Ileana")
        //promesa que lee
        let contenido = await fs.promises.readFile(filename, "utf-8")
        console.log("contenido:\n", contenido)

        await fs.promises.unlink(filename)
    } catch(e){
        console.log("error", e)
    }

}

opAsync()
console.log("fin")