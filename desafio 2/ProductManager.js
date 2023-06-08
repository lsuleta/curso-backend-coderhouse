const fs = require("fs");

class ProductManager {
  #path;
  #nextId;
  constructor(path) {
    this.#path = path;
    this.#nextId = 1;
  }

  getProducts = async () => {
    try {
      if (!fs.existsSync(this.#path)) {
        fs.writeFileSync(this.#path, "[]");
      }
      const data = await fs.promises.readFile(this.#path, "utf-8");
      const dataObj = JSON.parse(data);
      return dataObj;
    } catch (e) {
      console.log("No se pudo leer el archivo:", e);
      return [];
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const existingProduct = (await this.getProducts()).find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log("El código de producto ya está en uso.");
      return;
    }

    const newProduct = {
      id: this.#nextId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.#nextId++;

    const listProduct = await this.getProducts();
    listProduct.push(newProduct);

    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(listProduct));
      console.log("Producto agregado:", newProduct);
    } catch (e) {
      console.log("No se pudo escribir en el archivo:", e);
    }
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    if (!product) {
      console.log("Producto no encontrado.");
      return null;
    }
    return product;
  };

  updateProduct = async (id, updatedFields) => {
    let products = await this.getProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.log("No se encontró ningún producto con el id", id);
      return null;
    }

    const updatedProduct = { ...products[productIndex], ...updatedFields };
    products[productIndex] = updatedProduct;

    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
      console.log("Producto actualizado:", updatedProduct);
      return updatedProduct;
    } catch (e) {
      console.log("No se pudo escribir en el archivo:", e);
      return null;
    }
  };

  deleteProduct = async (id) => {
    let products = await this.getProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.log("No se encontró ningún producto con el id", id);
      return null;
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
      console.log("Producto eliminado:", deletedProduct);
      return deletedProduct;
    } catch (e) {
      console.log("No se pudo escribir en el archivo:", e);
      return null;
    }
  };

  generateId() {
    const products = this.getProducts();
    const count = products.length;
    if (count > 0) {
      const lastProductId = products[count - 1].id;
      return lastProductId + 1;
    } else {
      return 1;
    }
  }
}

// Ruta del archivo JSON
const filePath = "./productos.json";

// Crear una instancia de ProductManager
const productManager = new ProductManager(filePath);



(async () => {
   // Agregar productos
   await productManager.addProduct("Producto 1", "Descripción 1", 100, "thumbnail1.jpg", "code1", 10);
   await productManager.addProduct("Producto 2", "Descripción 2", 200, "thumbnail2.jpg", "code2", 20);
   await productManager.addProduct("Producto 3", "Descripción 3", 300, "thumbnail3.jpg", "code3", 30);
 
   // Obtener productos
   const products = await productManager.getProducts();
   console.log("Productos:", products);
 
   // Obtener producto por id
   if (products.length > 0) {
     const productId = products[0].id;
     const productById = await productManager.getProductById(productId);
     console.log("Producto por id:", productById);
   }

  // Actualizar producto
  const updatedFields = { price: 150, stock: 15 };
  const updatedProduct = await productManager.updateProduct(1, updatedFields);

  // Eliminar producto
  const deletedProduct = await productManager.deleteProduct(2);
})();
