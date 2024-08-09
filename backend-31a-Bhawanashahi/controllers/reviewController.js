const Reviews = require("../model/reviewModel");

const sendReview = async (req, res) => {
    // Step 1: Check if data is coming or not
    console.log(req.body);

    // Step 2: Destructure the data
    const { name, rating, review} = req.body;

    // Step 3: Validate the incoming data
    if (! name || !rating || !review) {
        return res.json({
            success: false,
            message: "Please enter all the fields",
        });
    }

    try {
        // Save contact information to the database
        const newReview = await Reviews.create({
            name,
            rating,
            review,
        });

        return res.json({
            success: true,
            message: 'Review information saved successfully',
            data: newReview,
        });
    } catch (error) {
        console.error('Error saving message:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while saving the contact information',
        });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const listOfReviews = await Reviews.find();
        res.json({
            success: true,
            message: "Review fetched successfully",
            reviews: listOfReviews,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
};

const getSingleReview = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.json({
            message: 'No record with given id:',
            success: false,
        });
    }
    try {
        const singleReview = await Reviews.findById(id);
        res.json({
            success: true,
            message: 'Review Fetched',
            review: singleReview,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};

const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Reviews.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.json({
                success: false,
                message: "Review not found",
            });
        }
        res.json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = {
    sendReview,
    getAllReviews,
    getSingleReview,
    deleteReview,
};
