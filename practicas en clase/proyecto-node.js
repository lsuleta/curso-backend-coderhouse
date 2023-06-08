

const listaNum = []

function crearNum() {
    for (let index = 1; index < 11; index++) {
        
        const num = Math.trunc(Math.random()*20+1)
        
        
        listaNum.push(`clave ${index}: ${num}`)
    }
}

crearNum()
console.log(listaNum)
