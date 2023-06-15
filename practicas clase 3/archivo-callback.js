const fs = require("fs")

const filename = "ejemplo.txt"

fs.writeFile(filename, "Saludos a Gabriel", (error) => {
    if(error) return console.log("error al crear")
    fs.appendFile(filename, "\n y saludos a Andrea", error =>{
        if(error) return console.log("error al agregar")
        fs.readFile(filename, "utf-8", (error, contenido) => {
            if (error) return console.log("error al leer")
            console.log("contenido:\n", contenido)
            fs.unlink(filename, error => {
                if(error) console.log("error al eliminar")
                console.log("borrado")
            })
        })
    })
}) 

console.log("fin")