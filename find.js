const array = [
    {id:1, name:"Gustavo",},
    {id:2, name:"Silvina",},
    {id:3, name:"Agustina",},
    {id:4, name:"Francisco",},
]

let familia2 = array.find((i) => {
    let found = i.id === 4
    return found
})
console.log(familia2)
 
let familia = array.find(i => i.id===3)
console.log(familia)