var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

// // For adding a category to a specific product
// router.post('/', function(req, res, next) {
// 	req.product.addCategory(req.body)
// 	.then(function(category) {
// 		res.status(201).json(category);
// 	})
// 	.then(null, next);
// });

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