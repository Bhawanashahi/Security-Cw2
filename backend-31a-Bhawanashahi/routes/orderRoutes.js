const router = require('express').Router();
const orderController = require("../controllers/orderController");

// create order
router.post("/create_order", orderController.createOrder);

// get order by user ID
router.get("/get_order/:id", orderController.getOrders); 

router.get("/get_orders/:id", orderController.getOrder); 

// Add dynamic parameter ':id'

module.exports = router;
