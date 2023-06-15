const fs = require("fs")

const filename = "ejemplo.txt"
const fecha = new Date()
const hoy = fecha.toLocaleString()

fs.writeFile(filename, hoy, error => {
    if(error) return console.log("error al crear")
    fs.readFile(filename, "utf-8", (error, contenido) => {
        if(error) return console.log("error al leer")
        console.log("contenido:\n", contenido)
        fs.unlink(filename, error => {
            if(error) return console.log("error al eliminar")
        })
    })
})