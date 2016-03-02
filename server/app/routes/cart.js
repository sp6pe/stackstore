'use strict'
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
require('../../db/models');
var Cart = mongoose.model('Cart');
var _ = require('lodash');



//api/carts
router.post('/',function(req,res,next){
	Cart.create({})
	.then(function(cart){
		cart.addProduct(req.body.id)
		.then(function(cart) {
			res.status(201).json(cart);	
		})
		.then(null,next);
	})
	.then(null,next);
})


//User actions to a cart 
router.param('cartId',function(req,res,next,id){
	Cart.findbyId(id).exec()
	.then(function(cart){
		if(!cart) throw Error('No such cart')
		req.cart = cart;
		next();
	})
	.then(null,next);
})


//get cart
router.get('/:cartId',function(req,res,next){
	res.json(req.cart)
	.then(null,next);
})


//post to specific cart 
//:cartId
router.post('/:cartId',function(req,res,next){
	req.cart.addProduct(req.body.id)
	.then(function(item){
		res.send(item);
	})
	.then(null,next);
})

//delete product from specific cart 
router.delete('/:cartId',function(req,res,next){
	req.cart.removeProduct(req.body)
	.then(function(){
		res.sendStatus(204);
	})
	.then(null,next)
})







// //get all items in a users cart 
// ///users/:userId/carts/
// router.get('/',function(req,res,next){
// 	return Cart.find({})
// 	.then(function(items){
// 		res.json(items)
// 	})
// 	.then(null,next)
// })






router.delete('/',function(req,res,next){
	req.cart.remove()
	.then(function(){
		res.status(204).end()
	})
	.then(next,null)
})
