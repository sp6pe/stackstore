'use strict'
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
require('../../db/models');
var Cart = mongoose.model('Cart');
var _ = require('lodash');

//get all carts (admin only)
// Have to do this crazy deep population on products AND user for those products
router.get('/', function(req,res,next){
	Cart.find({}).populate({
		path: 'productList', 
		model: 'Product',
		populate: {
			path: 'user',
			model: 'User'
  		}
	})
	.then(function(carts){
		res.json(carts);
	})
	.then(null,next);
});

//api/carts
router.post('/',function(req,res,next){
	Cart.create({})
	.then(function(cart){
		cart.addProduct(req.body._id)
		.then(function(cart) {
			res.status(201).json(cart);	
		})
		.then(null,next);
	})
	.then(null,next);
});

//User actions to a cart 
router.param('cartId',function(req,res,next,id){	
	Cart.findById(id).populate('productList user')
	.then(function(cart){
		if(!cart) throw Error('No such cart');
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
	res.json(req.cart);
});

//post to an already existing cart 
router.post('/:cartId/add',function(req,res,next){
	req.cart.addProduct(req.body.id)
		.then(function(item){
			res.send(item);
		})
		.then(null,next);
});

//remove from an already existing cart 
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
			res.sendStatus(204)
		})
		.then(null,next)
});

// //get all items in a users cart 
// ///users/:userId/carts/
// router.get('/',function(req,res,next){
// 	return Cart.find({})
// 	.then(function(items){
// 		res.json(items)
// 	})
// 	.then(null,next)
// })

// router.delete('/',function(req,res,next){
// 	req.cart.remove()
// 	.then(function(){
// 		res.status(204).end()
// 	})
// 	.then(next,null)
// })

router.use('/:cartId/products', require('./cart-product'));