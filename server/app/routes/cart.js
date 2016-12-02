'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
require('../../db/models');
var Cart = mongoose.model('Cart');
var _ = require('lodash');
var authenticator = require('./authorize.js');

// Get or create cart for current session
router.get('/current', function(req, res, next) {
	// If there is already a cartId on the session, find that cart
	if(req.user){
		Cart.findOne({customer:req.user._id, status:'created'})
		.populate('productList.product customer')
		.deepPopulate('productList.product.interviewer')
		.then(function(userCart){
			res.json(userCart)
		})
		.then(null,next)
	} else if(req.session.cart){
		Cart.findById(req.session.cart)
			.populate('productList.product customer')
			.deepPopulate('productList.product.interviewer')
			.then(function(currentCart){
				if(!currentCart) return next(new Error('No cart for user with id ' + req.session.cart));
				res.json(currentCart);
			})
			.then(null, next);
	} else {
		//create an empty cart, add it to req.session.cart, and return that cart
		Cart.create({})
			.then(function(newCart){
				req.session.cart = newCart._id;
				res.json(newCart);
			})
			.then(null, next);
	}
});

// Get all the carts 
router.get('/', authenticator.ensureAdmin, function(req, res, next) {
	Cart.find({})
		.populate('customer')
		.then(function(carts){
			res.json(carts);
		})
	
});

// Get past orders for currently logged in user
router.get('/previous-orders', function(req, res, next) {
	if (req.user) {
		Cart.find({customer: req.user._id, status: 'complete'})
			.populate('productList.product customer')
			.deepPopulate('productList.product.interviewer')
			.then(function(pastOrders) {
				res.json(pastOrders);
			})
			.then(null, next);
	} else {
		res.json({
			'Message': 'There is no logged in user'
		});
	}
});

// POST to api/carts, brand new cart for very first product added.
router.post('/',function(req,res,next){
	if(req.user){
		Cart.findOne({customer:req.user._id, status:'created'})
			.populate('productList.product customer')
			.deepPopulate('productList.product.interviewer')
			.then(function(existingCart){
				return existingCart.addProduct(req.body._id);
			})
			.then(function(cart){
				res.status(201).json(cart);
			})
			.then(null,next);
	} else if(req.session.cart){
		Cart.findById(req.session.cart)
			.populate('productList.product customer')
			.deepPopulate('productList.product.interviewer')
			.then(function(existingCart){
				return existingCart.addProduct(req.body._id);
			})
			.then(function(cart){
				res.status(201).json(cart);
			})
			.then(null,next);
		} else{
				Cart.create({})
			.then(function(newCart){
				req.session.cart = newCart._id;
				return newCart.addProduct(req.body._id);
			})
			.then(function(cartWithProduct) {
				res.status(201).json(cartWithProduct);	
			})
			.then(null,next);
		}

})

//User actions to a cart
router.param('cartId',function(req,res,next,id){
	Cart.findById(id)
		.populate('productList.product customer')
		.deepPopulate('productList.product.interviewer')
		.then(function(cart){
			if(!cart) return next(new Error('No such cart'));
			req.cart = cart;
			next();
		})
		.then(null,function(err){
			err.status = 404;
			next(err);
		});
});

//get cart
router.get('/:cartId',function(req,res,next){
	res.json(req.cart)
});

//post to an already existing cart 
router.post('/:cartId/add',function(req,res,next){
	req.cart.addProduct(req.body.id)
		.then(function(item){
			res.send(item);
		})
		.then(null,next);
});

//decrease quantity from an already existing cart 
router.post('/:cartId/remove',function(req,res,next){

	req.cart.decreaseQty(req.body.id)
		.then(function(item){
			res.send(item);
		})
		.then(null,next);
});

// Checkout
router.post('/:cartId/checkout',function(req,res,next){

	req.cart.checkout()
		.then(function(cart) {
			if (req.user) {
				return Cart.create({customer: req.user._id});
			} else {
				return Cart.create({});
			}
		})
		.then(function(emptyCart) {
			if (!req.user) {
				req.session.cart = emptyCart._id;
			}
			res.json(emptyCart);
		})
		.then(null, next);

});

//delete a cart
router.delete('/:cartId/deleteCart',function(req,res,next){
	req.cart.remove()
		.then(function(){
			res.sendStatus(204);
		})
		.then(null,next);
});

//delete product from specific cart 
router.delete('/:cartId',function(req,res,next){
	req.cart.remove()
		.then(function(){
			res.sendStatus(204);
		})
		.then(null,next);
});

router.use('/:cartId/products', require('./cart-product'));