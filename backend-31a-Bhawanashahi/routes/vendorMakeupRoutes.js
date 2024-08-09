const router = require('express').Router();
const vendorMakeupController = require("../controllers/vendorMakeupController");


// Create Vendor API
router.post('/create_makeup', vendorMakeupController.createMakeup)

//get all vendor API
router.get("/get_makeup", vendorMakeupController.getAllMakeups)


//Get single vendor API 
router.get("/get_singlemakeup/:id" , vendorMakeupController.getSingleMakeup)


// update vendor
router.put("/update_makeup/:id", vendorMakeupController.updateMakeup)


//delete delete API
router.delete("/delete_makeup/:id", vendorMakeupController.deleteMakeup)


module.exports = router;