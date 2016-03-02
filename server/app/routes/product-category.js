var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Category = mongoose.model('Category');

// For adding a category to a specific product
router.post('/', function(req, res, next) {
	req.product.addCategory(req.body)
	.then(function(category) {
		res.status(201).json(category);
	})
	.then(null, next);
});

router.delete('/:id',function(req,res,next){
	Category.findById(req.params.id)
			.then(function(cat){
				return req.product.removeCategory(cat);
			}).then(function(product){
				res.send(product);
			})
			.then(null,next)

});