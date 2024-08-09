const bookController = require("../controllers/bookController")
const router = require('express').Router();

//create contact api
router.post('/create_book', bookController.createBook)

//get all products API
router.get("/get_book", bookController.getAllBooks)


//Get single product API | /get_product/:id
router.get("/get_single_book/:id" , bookController.getSingleBook)


//delete product API
router.delete("/delete_book/:id", bookController.deleteBook)


// exporting
module.exports = router;
const mongoose = require('mongoose');