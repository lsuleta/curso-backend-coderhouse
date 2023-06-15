const fs = require("fs")

const obj = {
    name: "Caro",
    lastname: "Gavatorta",
    age: 21,
}
//de objeto a string
const objStr = JSON.stringify(obj)
fs.writeFileSync("objeto.json", objStr)
//leemos string y pasamos a objeto
const contenido = fs.readFileSync("objeto.json", "utf-8")
const contenidoObj = JSON.parse(contenido)

console.log("contenido:", contenido)
console.log("contenido obj:", contenidoObj)


contenidoObj.name = "Valen"

console.log("new contenido:", contenidoObj)