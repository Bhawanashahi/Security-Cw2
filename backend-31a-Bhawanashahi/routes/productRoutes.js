const router = require('express').Router();
const productController = require("../controllers/productController");



// Create product API
router.post('/create_product',productController.createProduct)

//get all products API
router.get("/get_products", productController.getAllProducts)


//Get single product API | /get_product/:id
router.get("/get_product/:id" , productController.getSingleProduct)

// update product
router.put("/update_product/:id", productController.updateProduct)


//delete product API
router.delete("/delete_product/:id", productController.deleteProduct)

router.get("/search", productController.searchProductByName);

module.exports = router;