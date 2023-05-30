class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log("El código de producto ya está en uso.")
    }

    const newProduct = {
      id: this.generateId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.log("Producto no encontrado.")
    }
    return product;
  }

  generateId() {
    const count = this.products.length
        if (count > 0) {
            return this.products[count - 1].id + 1
        } else {
            return 1
        }
  }
}


const productManager = new ProductManager();

console.log("Arreglo vacio: ")
console.log(productManager.getProducts()); 

// Agregar un producto
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    1200,
    "Sin imagen",
    "def456",
    25
  );

console.log("Arreglo con producto/s: ")
console.log(productManager.getProducts());

try {
  productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
} catch (error) {
  console.error(error.message);
}

console.log("Buscamos por ID \n (ID:1)")
console.log(productManager.getProductById(1));
