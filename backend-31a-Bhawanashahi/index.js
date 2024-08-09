const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary");
const cartRoutes = require("./routes/cartRoutes"); // Import cart routes
const orderRoutes = require("./routes/orderRoutes");
// const vendorUserRoutes=require('./routes/vendorUserRoutes');

const app = express();
dotenv.config();

// CORS policy
const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsPolicy));
app.use(multiparty());

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dvjjbmlsg",
  api_key: "228794781863152",
  api_secret: "6Wbr7jzMDkr7e44xue_nXfXQ42k",
});

// MongoDB connection
connectDB();

// Accepting JSON data
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.send("Hello from express server");
});

// User routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/user", require("./routes/wishlistRoutes"));

// Routes for products and pet products
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/petproduct", require("./routes/petProductRoutes"));

// Blog route
app.use("/api/blog", require("./routes/blogRoutes"));

// Cart routes
app.use("/api/cart", require("./routes/cartRoutes"));

// // Order routes
app.use("/api/user", require("./routes/orderRoutes"));
app.use("/api/user", require("./routes/placeorderRoutes"));
app.use("/api/vendor", require("./routes/vendorMakeupRoutes"));
app.use("/api/vendor", require("./routes/vendorVenueRoutes"));
app.use("/api/vendor", require("./routes/vendorPhotoRoutes"));
app.use("/api/vendor", require("./routes/vendorUserRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
