const fs = require("fs")

const filename = "ejemplo.txt"
//crear
fs.writeFileSync(filename, "Saludos a Erick")

if(fs.existsSync(filename)){
    console.log("el archivo existe")
    //leer
    const contenido = fs.readFileSync(filename, "utf-8")

    console.log("contenido:", contenido)
    //agregar
    fs.appendFileSync(filename, "\ny saludos al resto")

    const contenidoNew = fs.readFileSync(filename, "utf-8")

    console.log("contenido:", contenidoNew)
    //borrar
    fs.unlinkSync(filename)
}

console.log("end")