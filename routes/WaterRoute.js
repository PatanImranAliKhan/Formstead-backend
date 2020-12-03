const express11=require('express');

const water=require('../models/Water');
const Wrouter=express11.Router();

Wrouter.route('/getRequests').get((req,res,next) => {
    water.find({})
    .then((resp) => {
        res.send(resp);
    })
    .catch((err) => {next(err)});
});

Wrouter.route('/addRequest').post((req,res,next) => {
    water.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(resp);
    })
    .catch((err) => {next(err)});
});

module.exports=Wrouter;