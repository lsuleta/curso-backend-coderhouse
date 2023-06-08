const fs = require("fs");

class ProductManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  getProducts = async () => {
    try {
      const data = await fs.promises.readFile(this.#path, "utf-8");
      const dataObj = JSON.parse(data);
      return dataObj;
    } catch (e) {
      console.log("No se pudo leer el archivo:", e);
      return [];
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const existingProducts = await this.getProducts();
    const existingProduct = existingProducts.find((product) => product.code === code);
    if (existingProduct) {
      console.log("El código de producto ya está en uso.");
      return;
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

    const updatedProducts = [...existingProducts, newProduct];
    await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
    console.log("Producto agregado:", newProduct);
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    if (!product) {
      console.log("Producto no encontrado.");
    }
    return product;
  };

  updateProduct = async (id, updatedFields) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      console.log("No se encontró ningún producto con el id", id);
      return;
    }

    const updatedProduct = { ...products[productIndex], ...updatedFields };
    products[productIndex] = updatedProduct;

    await fs.promises.writeFile(this.#path, JSON.stringify(products));
    console.log("Producto actualizado:", updatedProduct);
    return updatedProduct;
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      console.log("No se encontró ningún producto con el id", id);
      return;
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    await fs.promises.writeFile(this.#path, JSON.stringify(products));
    console.log("Producto eliminado:", deletedProduct);
    return deletedProduct;
  };

  generateId() {
    const products = this.getProducts();
    const count = products.length;
    if (count > 0) {  
      id = products[count - 1].id + 1;
      return id
    } else {
      
      return 1;
    }
  }
}


