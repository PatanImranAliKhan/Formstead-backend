const express4=require('express');

const Product=require('../models/Agriproduct');

const Prouter=express4.Router();

Prouter.route('/results').get((req,res,next) => {
    Product.find({})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found');
            next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

Prouter.route('/addproduct').post((req,res,next) => {
    Product.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

Prouter.route('/updateproduct/:id').put((req,res,next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

Prouter.route('/deleteproduct/:id').delete((req,res,next) =>{
    Product.findByIdAndDelete(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

Prouter.route('/getproduct/:productname').get((req,res,next) => {
    Product.find({productname: req.params.productname})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
            next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = Prouter;