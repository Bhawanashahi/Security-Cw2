const mongoose =  require('mongoose')
const bookSchema = new mongoose.Schema({


    name:{
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    detailLocation:{
        type: String,
        required: true,
    }
})

const Books= mongoose.model('books', bookSchema);
module.exports= Books;