const tempo = (callback) => {
    setTimeout(callback, 5000)
}

const operacion = () => console.log("booooooooom")

console.log("tik tik...")

tempo(operacion)

console.log("finalizamos")