const express = require("express");
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require("../controller/Product"); // Correct import path

const router = express.Router(); // Create a new router instance

// /products is already added in base path;
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)

exports.router = router;
