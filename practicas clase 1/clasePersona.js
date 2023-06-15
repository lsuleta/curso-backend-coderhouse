class Persona {
    constructor(nombre){
        this.nombre = nombre
        this.age = 30
    }

    speak(){
        console.log("My name is ", this.nombre)
    }

    cumpleaños(){
        this.age++
    }
}

let javier = new Persona("Javier")
let sasha = new Persona("Sasha")

javier.age = 29

console.log(javier)
javier.speak()
sasha.speak()

sasha.cumpleaños()
sasha.cumpleaños()

console.log(sasha)