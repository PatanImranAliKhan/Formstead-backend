const express2=require('express');

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

const AquaRoute=express2.Router();

const Aquaculture=require('../models/aquasignin');

AquaRoute.route('/results').get((req,res,next) => {
    Aquaculture.find({})
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

AquaRoute.route('/adduser').post((req,res,next) => {
    Aquaculture.find({username: req.body.username,email: req.body.email,password: req.body.password})
    .then((resp) => {
        if(resp.length ==0)
        {
            Aquaculture.create(req.body)
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
            next(err);
        }
    })
    .catch((err) => next(err));
});

AquaRoute.route('/update/:id').put((req,res,next) => {
    Aquaculture.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaRoute.route('/delete/:username').delete((req,res,next) =>{
    Aquaculture.findOneAndDelete({username: req.params.username})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaRoute.route('/getuser/:email/:password').get((req,res,next) => {
    Aquaculture.find({$or: [ { username: req.params.email }, { email: req.params.email }] ,password : req.params.password})
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
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    }, (err) => next(err))
    .catch((err) => next(err));
});

AquaRoute.route('/updatefeedback/:id').put((req,res,next) => {
    Aquaculture.findByIdAndUpdate(req.params.id, {
        $push: {feedback: req.body.feedback}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

AquaRoute.route('/updateCart/:id').put((req,res,next) => {
    Aquaculture.findByIdAndUpdate(req.params.id, {
        $push: {cart: req.body.cart}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

AquaRoute.route('/updateOrders/:id').put((req,res,next) => {
    Aquaculture.findByIdAndUpdate(req.params.id, {
        $push: {order: req.body.order}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});


AquaRoute.route('/updateSells/:id').put((req,res,next) => {
    Aquaculture.findByIdAndUpdate(req.params.id, {
        $push: {sells: req.body.sells}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});

AquaRoute.route('/updateTransport/:id').put((req,res,next) => {
    Aquaculture.findByIdAndUpdate(req.params.id, {
        $push: {transportRequest: req.body.transport}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});
module.exports=AquaRoute;