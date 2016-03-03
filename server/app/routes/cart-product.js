var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.delete('/:id',function(req,res,next){
	console.log("route",req.params.id, req.cart)
	Product.findById(req.params.id)
			.then(function(product){
				return req.cart.removeProduct(product);
			}).then(function(){
				res.sendStatus(204)
			})
			.then(null,next)

});