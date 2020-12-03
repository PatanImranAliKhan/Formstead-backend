const mongoose3 = require('mongoose');

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

const Signin3 = new mongoose3.Schema({
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
    phase: {
        type: String,
        default: "citizen"
    },
    cart: [product],
    order: [product],
});


module.exports=mongoose3.model('Citizen',Signin3);