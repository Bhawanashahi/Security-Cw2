const mongoose = require('mongoose');
const vendorPhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    trim : true,
  },
  payment: {
    type: String,
    required: true,
    trim : true,
  },
  travel:{
    type : String,
    required : true,
    
},
payment: {
    type: String,
    required: true,
    trim : true,
  },
  delivery: {
    type: String,
    required: true,
    
  },
  travel: {
    type: String,
    required: true,
   
  },
  location: {
    type: String,
    required: true,
   
  },
  imageUrl : {
    type : String,
    required : true,
    trim : true,
}

});
const Vendors = mongoose.model('photos', vendorPhotoSchema);

module.exports = Vendors;

