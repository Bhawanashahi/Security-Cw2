const reviewController = require("../controllers/reviewController")
const router = require('express').Router();

//create contact api
router.post('/create_review', reviewController.sendReview)

//get all products API
router.get("/get_review", reviewController.getAllReviews)


//Get single product API | /get_product/:id
router.get("/get_single_review/:id" , reviewController.getSingleReview)


//delete product API
router.delete("/delete_review/:id", reviewController.deleteReview)


// exporting
module.exports = router;
const mongoose = require('mongoose');