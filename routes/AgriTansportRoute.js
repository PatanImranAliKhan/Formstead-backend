const express7=require('express');

const AgriTransRoute=express7.Router();

const AgriTransport=require('../models/AgriTransport');

AgriTransRoute.route('/results').get((req,res,next) => {
    AgriTransport.find({})
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

AgriTransRoute.route('/addData').post((req,res,next) => {
    AgriTransport.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AgriTransRoute.route('/update/:id').put((req,res,next) => {
    AgriTransport.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AgriTransRoute.route('/delete/:name').delete((req,res,next) =>{
    AgriTransport.findOneAndDelete({productname: req.params.name})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AgriTransRoute.route('/getData/:id').get((req,res,next) => {
    AgriTransport.findById(req.params.id)
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

module.exports = AgriTransRoute;
