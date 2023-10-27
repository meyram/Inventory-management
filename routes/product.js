const express = require("express");
const productRouter = express.Router();
const product = require("../controllers/product");

// Add Product
productRouter.post("/", product.addProduct);

// Get All Products
productRouter.get("/", product.getAllProducts);

// Search Product
productRouter.get("/search", product.searchProduct);

// Delete Selected Product Item
productRouter.delete("/:id", product.deleteSelectedProduct);

// Update Selected Product
productRouter.put("/", product.updateSelectedProduct);



module.exports = productRouter;
