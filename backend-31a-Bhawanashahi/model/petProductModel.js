const mongoose = require('mongoose');

const petproductSchema = new mongoose.Schema({
    petProductName:{
        type : String,
        required : true,
        trim : true,
    },
    petProductPrice:{
        type : Number,
        required : true,
    },


    petProductImageUrl : {
        type : String,
        required : true,
        trim : true,
    }

})

const PetProducts = mongoose.model('petproducts', petproductSchema);
module.exports = PetProducts;