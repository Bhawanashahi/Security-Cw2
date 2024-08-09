const Books = require("../model/bookModel");

const createBook = async (req, res) => {
    // Step 1: Check if data is coming or not
    console.log(req.body);

    // Step 2: Destructure the data
    const { name, email, phone, date, location, detailLocation } = req.body;

    // Step 3: Validate the incoming data
    if ( !name || !email || !phone || !date || !location|| !detailLocation) {
        return res.json({
            success: false,
            message: "Please enter all the fields",
        });
    }

    try {
        // Save contact information to the database
        const newBook = await Books.create({
            name,
            email,
            phone,
            date,
            location,
            detailLocation,
        });

        return res.json({
            success: true,
            message: 'Service booked saved successfully',
            data: newBook,
        });
    } catch (error) {
        console.error('Error saving message:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while saving the booking the service',
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const listOfBooks = await Books.find();
        res.json({
            success: true,
            message: "Booking fetched successfully",
            books: listOfBooks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
};

const getSingleBook = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.json({
            message: 'No record with given id:',
            success: false,
        });
    }
    try {
        const singleBook = await Books.findById(id);
        res.json({
            success: true,
            message: 'Book Fetched',
            book: singleBook,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};

const deleteBook= async (req, res) => {
    try {
        const deletedBook = await Books.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.json({
                success: false,
                message: "Book not found",
            });
        }
        res.json({
            success: true,
            message: "Book deleted successfully",
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
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ,
};
