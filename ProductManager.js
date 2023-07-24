const fs = require('fs');
 class ProductManager {
  constructor(path) {
    this.path = path;
  }
   addProduct(product) {
    const products = this.getProducts();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    product.id = id;
    products.push(product);
    this.saveProducts(products);
    return product;
  }
   getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
   getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }
   updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProducts(products);
      return products[index];
    }
    return null;
  }
   deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      this.saveProducts(products);
      return deletedProduct[0];
    }
    return null;
  }
   saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}