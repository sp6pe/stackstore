'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
require('../../db/models');
var Cart = mongoose.model('Cart');
var _ = require('lodash');

// Get or create cart for current session
router.get('/current', function(req, res, next) {
	console.log('hit this route');
	// If there is already a cartId on the session, find that cart
	if (req.session.cart) {
		console.log(req.session.cart, 'the current cart');
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

// POST to api/carts, brand new cart for very first product added.
router.post('/',function(req,res,next){
	console.log(req.session.cart);
	//if there is no cart 
	if(!req.session.cart){
		//create an empty cart and add req.session.cart to it 
		Cart.create({})
			.then(function(newCart){
				req.session.cart = newCart._id;
				return newCart.addProduct(req.body._id);
			})
			.then(function(cartWithProduct) {
				res.status(201).json(cartWithProduct);	
			})
			.then(null,next);
	} else{
		//if there is a cart, then add to the existing cart 
		Cart.findById(req.session.cart)
			.then(function(existingCart){
				return existingCart.addProduct(req.body._id);
			})
			.then(function(cart){
				res.status(201).json(cart);
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

//delete product from specific cart 
router.delete('/:cartId',function(req,res,next){
	req.cart.removeProduct(req.body)
		.then(function(){
			res.sendStatus(204);
		})
		.then(null,next);
});

router.use('/:cartId/products', require('./cart-product'));