const mongoose11=require('mongoose');

const water= new mongoose11.Schema({
    name: {
        type: String
    },
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
});

module.exports=mongoose11.model('WaterRequest',water);