var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.param('productId', function(req, res, next, productId) {
	Product.findById(productId)
		.populate('interviewer categories')
		.then(function(product) {
			if (!product) return next(new Error('Product not found'));
			req.product = product;
			next();
		})
		.then(null, next);
});

router.get('/', function(req, res, next) {
	Product.find({})
		.then(function(products) {
			res.json(products);
		})
		.then(null, next);
});

router.post('/', function(req, res, next) {
	Product.create(req.body)
		.then(function(product) {
			res.status(201).json(product);
		})
		.then(null, next);
});

router.get('/:productId', function(req, res, next) {
	res.json(req.product);
});

router.put('/:productId', function(req, res, next) {
	Product.findByIdAndUpdate(req.product._id, req.body, {new: true,runValidators: true})
		.then(function(product) {
			res.json(product);
		})
		.then(null, next);
});

router.delete('/:productId', function(req, res, next) {
	req.product.remove()
		.then(function(success) {
			res.status(204).end();
		})
		.then(null, next);
});

router.use('/:productId/category', require('./product-category'));