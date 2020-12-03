const mongoose1 = require('mongoose');
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

const water= {
    mobile: {
        type: String
    },
    crop: {
        type: String
    },
    acres: {
        type:Number
    },
    price: {
        type: Number
    },
    address: {
        type: String
    },
}

const Signin1 = new mongoose1.Schema({
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
        default: "agriculture"
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
    waterRequest: [water]
});

module.exports=mongoose1.model('Agriculture',Signin1);