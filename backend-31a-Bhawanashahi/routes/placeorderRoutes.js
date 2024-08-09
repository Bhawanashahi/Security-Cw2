const router = require('express').Router();
const placeorderController = require("../controllers/placeOrderController");

// create order
router.post("/create_placeorder", placeorderController. placeOrder);

// // get order by user ID
// router.get("/get_order/:id", orderController.getOrders); // Add dynamic parameter ':id'

module.exports = router;
