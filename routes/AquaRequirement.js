const express7=require('express');

const ARequirement=require('../models/AquaRequirements');

const AquaReqrouter=express7.Router();

AquaReqrouter.route('/results').get((req,res,next) => {
    ARequirement.find({})
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

AquaReqrouter.route('/addreq').post((req,res,next) => {
    ARequirement.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaReqrouter.route('/updatereq/:productname').put((req,res,next) => {
    ARequirement.findOneAndUpdate({productname : req.params.productname}, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaReqrouter.route('/deletereq/:productname').delete((req,res,next) =>{
    ARequirement.findOneAndDelete({productname: req.params.productname})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaReqrouter.route('/getreq/:productname').get((req,res,next) => {
    ARequirement.find({productname: req.params.productname})
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

module.exports = AquaReqrouter;