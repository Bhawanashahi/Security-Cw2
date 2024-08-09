
const router = require('express').Router();
const vendorVenueController = require("../controllers/vendorVenueController");



router.post('/create_venue',vendorVenueController.createVenue)

router.get("/get_venue",vendorVenueController.getAllVenues)



router.get("/get_singlvenue/:id" ,vendorVenueController.getSingleVenue)


router.put("/update_venue/:id", vendorVenueController.updateVenue)



router.delete("/delete_venue/:id", vendorVenueController.deleteVenue)


module.exports = router;