const router = require('express').Router();
const petProductController = require("../controllers/petProductController");



// Create product API
router.post('/create_petproduct',petProductController.createPetProduct)

//get all products API
router.get("/get_petproducts", petProductController.getAllPetProducts)


//Get single product API | /get_product/:id
router.get("/get_petproduct/:id" , petProductController.getSinglePetProduct)

//update product API
router.put("/update_petproduct/:id", petProductController.updatePetProduct)


//delete product API
router.delete("/delete_petproduct/:id", petProductController.deletePetProduct)



module.exports = router;