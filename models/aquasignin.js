const mongoose2 = require('mongoose');

const product={
    productname: {
        type: String
    },
    image: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity: {
        type: Number
    }
};

const supply={
    productname: {
        type: String
    },
    image: {
        type: String,
    },
    price: {
        type: String,
    },
    address: {
        type: String
    }
};

const Signin2 = new mongoose2.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    which: {
        type: String,
        required: true
    },
    phase: {
        type: String,
        default: "aquaculture"
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    feedback: [
        {
            type: String
        }
    ],
    sells:[supply],
    cart: [product],
    order: [product],
    transportRequest: [supply],
});


module.exports=mongoose2.model('Aquaculture',Signin2);