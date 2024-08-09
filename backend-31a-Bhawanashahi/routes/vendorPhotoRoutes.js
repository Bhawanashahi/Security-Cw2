
const router = require('express').Router();
const vendorPhotoController = require("../controllers/vendorPhotoController");


// Create Vendor API
router.post('/create_photo',vendorPhotoController.createPhoto)

//get all vendor API
router.get("/get_photo", vendorPhotoController.getAllPhotos)


//Get single vendor API 
router.get("/get_singlephoto/:id" , vendorPhotoController.getSinglePhoto)


// update vendor
router.put("/update_photo/:id",vendorPhotoController.updatePhoto)


//delete delete API
router.delete("/delete_photo/:id", vendorPhotoController.deletePhoto)


module.exports = router;