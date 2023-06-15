class Counter {
    constructor(responsable){
        this.responsable = responsable
        this.countLocal = 0
    }

    static countGlobal = 0

    getResponsable = () => {return this.responsable}
    getCountLocal = () => {return this.countLocal}
    get = () => {
        console.log(`${this.responsable}: ${this.countLocal}`)
        console.log(`Variable Global: ${Counter.countGlobal}`)
    }

    count = () => {
        this.countLocal++
        Counter.countGlobal++
    }
}

const dario = new Counter("Dario")
const santiagoTutor = new Counter("SantiagoTutor")
const sasha = new Counter("Sasha")

dario.count()
dario.count()
sasha.count()

dario.get()
sasha.get()
santiagoTutor.get()