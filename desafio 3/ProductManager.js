import fs from "fs";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
}

// Ruta del archivo JSON
const filePath = "./productos.json";

// Crear una instancia de ProductManager
const productManager = new ProductManager(filePath);

app.get("/products", async (req, res) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const products = JSON.parse(data);
    const querys = req.query;
    if (querys.limit) {
      const arrayProductsSliced = products.slice(0, parseInt(querys.limit));
      res.json(arrayProductsSliced);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al leer el archivo" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const product = await productManager.getProductById(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado." });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto." });
  }
});

app.listen(8080);

// (async () => {
//    // Agregar productos
//    await productManager.addProduct("Producto 1", "Descripción 1", 100, "thumbnail1.jpg", "code1", 10);
//    await productManager.addProduct("Producto 2", "Descripción 2", 200, "thumbnail2.jpg", "code2", 20);
//    await productManager.addProduct("Producto 3", "Descripción 3", 300, "thumbnail3.jpg", "code3", 30);
//    await productManager.addProduct("Producto 4", "Descripción 4", 400, "thumbnail4.jpg", "code4", 40);
//    await productManager.addProduct("Producto 5", "Descripción 5", 500, "thumbnail5.jpg", "code5", 50);
//    await productManager.addProduct("Producto 6", "Descripción 6", 600, "thumbnail6.jpg", "code6", 60);
//    await productManager.addProduct("Producto 7", "Descripción 7", 700, "thumbnail7.jpg", "code7", 70);
//    await productManager.addProduct("Producto 8", "Descripción 8", 800, "thumbnail8.jpg", "code8", 80);
//    await productManager.addProduct("Producto 9", "Descripción 9", 900, "thumbnail9.jpg", "code9", 90);
//    await productManager.addProduct("Producto 10", "Descripción 10", 1000, "thumbnail10.jpg", "code10", 100);

//    // Obtener productos
//    const products = await productManager.getProducts();
//    console.log("Productos:", products);

//    // Obtener producto por id
// //    if (products.length > 0) {
// //      const productId = products[0].id;
// //      const productById = await productManager.getProductById(productId);
// //      console.log("Producto por id:", productById);
// //    }

//   // Actualizar producto
// //   const updatedFields = { price: 150, stock: 15 };
// //   const updatedProduct = await productManager.updateProduct(1, updatedFields);

//   // Eliminar producto
// //   const deletedProduct = await productManager.deleteProduct(2);
// })();
