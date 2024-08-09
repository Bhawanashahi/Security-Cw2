const mongoose = require('mongoose');
const vendorMakeupSchema = new mongoose.Schema({
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

const Vendors = mongoose.model('makeups', vendorMakeupSchema);
module.exports = Vendors;