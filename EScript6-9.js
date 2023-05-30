const objetos = [{
    manzanas:3,
    peras:2,
    carne:1,
    jugos:5,
    dulces:2
},
{
    manzanas:1,
    sandias:1,
    huevos:6,
    jugos:1,
    panes:4
}]

const productTypes = objetos.reduce((p, c) => {
    Object.keys(c).forEach((v) => {
        if (!p.includes(v)) {
            p.push(v);
        }
    });

    return p;
}, []);

const productSales = productTypes.reduce((p, c) => {
    p[c] = 0;
    objetos.forEach((v) => {
      if (v[c]) {
        p[c] += v[c];
      }
    });
    return p;
}, {});

console.log(productTypes, productSales)
