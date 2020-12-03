const mongoose8 = require('mongoose');

const agriTransport = new mongoose8.Schema({
    owner: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
});


module.exports=mongoose8.model('agriTransport',agriTransport);