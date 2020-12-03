const express1=require('express');

const jwt=require('jsonwebtoken');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject
    next()
}

const AgriRoute=express1.Router();

const Agriculture=require('../models/agrisignin');

AgriRoute.route('/results').get((req,res,next) => {
    Agriculture.find({})
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

AgriRoute.route('/adduser').post((req,res,next) => {
    Agriculture.find({username: req.body.username,email: req.body.email,password: req.body.password})
    .then((resp) => {
        if(resp.length ==0)
        {
            Agriculture.create(req.body)
            .then((resp) => {
                console.log('new responce ', resp);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                let payload = { subject: resp._id };
                let token = jwt.sign(payload, 'secretkey')
                res.send({ token , resp});
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else
        {
            const err=new Error('You are already a user');
            return next(err);
        }
    })
    .catch((err) => next(err));
});

AgriRoute.route('/update/:id').put((req,res,next) => {
    Agriculture.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AgriRoute.route('/delete/:username').delete((req,res,next) =>{
    Agriculture.findOneAndDelete({username: req.params.username})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AgriRoute.route('/getuser/:email/:password').get((req,res,next) => {
    Agriculture.find({$or: [ { username: req.params.email }, { email: req.params.email }] ,password : req.params.password})
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
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    }, (err) => next(err))
    .catch((err) => next(err));
});

AgriRoute.route('/updatefeedback/:id').put((req,res,next) => {
    Agriculture.findByIdAndUpdate(req.params.id, {
        $push: {feedback: req.body.feedback}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

AgriRoute.route('/updateCart/:id').put((req,res,next) => {
    Agriculture.findByIdAndUpdate(req.params.id, {
        $push: {cart: req.body.cart}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

AgriRoute.route('/updateOrders/:id').put((req,res,next) => {
    Agriculture.findByIdAndUpdate(req.params.id, {
        $push: {order: req.body.order}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

AgriRoute.route('/updateSells/:id').put((req,res,next) => {
    Agriculture.findByIdAndUpdate(req.params.id, {
        $push: {sells: req.body.sells}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

AgriRoute.route('/updateTransport/:id').put((req,res,next) => {
    Agriculture.findByIdAndUpdate(req.params.id, {
        $push: {transportRequest: req.body.transport}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

AgriRoute.route('/updateWaterRequests/:id').put((req,res,next) => {
    Agriculture.findByIdAndUpdate(req.params.id, {
        $push: {waterRequest: req.body.waterReq}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

module.exports = AgriRoute;
