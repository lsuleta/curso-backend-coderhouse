class TicketManager {

    #precioBaseDeGanancia
    constructor() {
        this.events = []
        this.#precioBaseDeGanancia = 0.15
    }

    getEvents = () => { return this.events }

    getNextID = () => {
        const count = this.events.length
        const nextID = (count>0) ? this.events(count + 1).id +1 : 1

        return nextID
    }

    addEvent =  (name, place, price, capacidad, fecha) => {
        const event = {
            name, 
            place,
            price: price + (price * this.#precioBaseDeGanancia),
            capacidad: capacidad ?? 50,
            fecha: fecha ?? new Date().toLocaleDateString(),
            participantes: []
        }

        this.events.push(event)
    }

}

const manager = new TicketManager()
manager.addEvent('Lolapaluza', 'corferias', 100, 0, '')

console.log(manager.getEvents())