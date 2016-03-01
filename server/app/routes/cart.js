'use strict'
var router = require('express').Router();
module.exports = router;
require('../../db/models');
var Cart = mongoose.model('User');
_=require('lodash');


//post an item to a cart  
//need to create a method on user 
router.post('/',function(req,res,next){

})


//User actuions to a cart 
router.param('cartId',function(req,res,next,id){
	Cart.findbyId(id).exec()
	.then(function(cart){
		if(!cart) throw Error('No such cart')
		req.cart = cart;
		next();
	})
	.then(null,next);
})

//get all items in a users cart 
///users/:userId/carts/:cartId
router.get('/:cartId',function(req,res,next){
	return Cart.find({})
	.then(function(items){
		res.json(items)
	})
	.then(null,next)
})


//get one item in a cart 
router.get('/:cartId',function(req,res,next){
	res.json(req.cart)
})




router.delete('/:cartId',function(req,res,next){
	req.cart.remove()
	.then(function(){
		res.status(204).end()
	})
	.then(next,null)
})
