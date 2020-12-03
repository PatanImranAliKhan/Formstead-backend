const express7=require('express');

const AquaTransRoute=express7.Router();

const AquaTransport=require('../models/AquaTransport');

AquaTransRoute.route('/results').get((req,res,next) => {
    AquaTransport.find({})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found');
            return next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaTransRoute.route('/addData').post((req,res,next) => {
    AquaTransport.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaTransRoute.route('/update/:productname').put((req,res,next) => {
    AquaTransport.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaTransRoute.route('/delete/:name').delete((req,res,next) =>{
    AquaTransport.findOneAndDelete({productname: req.params.name})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaTransRoute.route('/getData/:id').get((req,res,next) => {
    AquaTransport.findById(req.params.id)
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
            return next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = AquaTransRoute;
