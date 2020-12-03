const express10=require('express');
const FeedBack = require('../models/FeedBack');

const Feedback=require('../models/FeedBack');

const Froute=express10.Router();

Froute.route('/feedbacks').get((req,res,next) => {
    Feedback.find({})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found');
            next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);

    },(err) => next(err))
    .catch((err) => next(err));
});

Froute.route('/addfeedback').post((req,res,next) => {
    Feedback.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

Froute.route('/getonefeedback/:name').get((req,res,next) => {
    FeedBack.findOne({name: req.params.name})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

Froute.route('/feedbacksector/:sector').get((req,res,next) => {
    FeedBack.findOne({sector: req.params.sector})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports=Froute;