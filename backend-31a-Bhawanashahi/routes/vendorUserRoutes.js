// import
const router = require('express').Router();
const vendorUserController = require("../controllers/vendorUserControllers")

// create user api
router.post('/create', vendorUserController.createUser)

//  task 1: create login api
router.post('/login', vendorUserController.loginUser)


//get all users API
router.get("/get_user", vendorUserController.getAllUsers)

//Get single user API | /get_product/:id
router.get("/get_single_user/:id" , vendorUserController.getSingleUsers)


//update user API
router.put("/update_user/:id", vendorUserController.updateUser)


//update user API
router.delete("/delete_user/:id", vendorUserController.deleteUser)

// exporting
module.exports = router;