const mongoose9 = require('mongoose');

const aquaTransport = new mongoose9.Schema({
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
    quantity: {
        type: Number,
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
});


module.exports=mongoose9.model('aquaTransport',aquaTransport);