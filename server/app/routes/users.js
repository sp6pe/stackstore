'use strict'
var router = require('express').Router();
module.exports = router;
require('../../db/models');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var _ = require('lodash');

router.get('/',function(req,res,next){
	return User.find({})
		.then(function(users){
			res.json(users)
		})
		.then(null,next)
});

//signup route
router.post('/',function(req,res,next){
	User.create(req.body)
		.then(function(user){
			req.login(user, function () {
				Cart.create({customer:user._id})//create a new user cart
					.then(function(userCart){
					  Cart.findById(req.session.cart)//find the session cart
					  	.populate('productList.product customer')
						.deepPopulate('productList.product.interviewer')
                        .then(function(sessionCart){
                            userCart.merge(sessionCart);//merge
                        })
					})
				res.status(201).json(user);
			});

		})
		.then(null,next)
});

router.param('userId',function(req,res,next,id){
	User.findById(id).exec()
		.then(function(user){
			if(!user) throw Error('No such user')
			req.user = user;
			next();
		})
		.then(null,next);
});

router.get('/:userId',function(req,res,next){
	res.json(req.user);
});

router.put('/:userId', function (req, res, next) {

		User.findByIdAndUpdate(req.user.id,req.body, {new: true,runValidators: true})
		.then(function(user){

			res.json(user).status(200);
		})
		.then(null,next)

});

router.delete('/:userId',function(req,res,next){

	User.findById(req.user.id).remove().exec()
			.then(function(){
				res.sendStatus(204);
			})
			.then(next,null)
});

router.use('/:userId/cart', require('./cart'));