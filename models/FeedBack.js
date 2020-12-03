const mongoose10=require('mongoose');

const FeedBack=new mongoose10.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    sector: {
        type: String,
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports=mongoose10.model('feedback',FeedBack);