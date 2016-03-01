var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.param('productId', function(req, res, next, productId) {
	Product.findById(productId)
	.populate('user')
	.then(function(product) {
		if (!product) throw new Error('Product not found');
		req.product = product;
		next();
	})
	.then(null, next);
});

router.get('/', function(req, res, next) {
	Product.find({})
	.then(function(products) {
		if (products.length === 0) throw new Error('No products found');
		res.json(products);
	})
	.then(null, next);
});

router.get('/:productId', function(req, res, next) {
	res.json(req.product);
});

router.post('/', function(req, res, next) {
	Product.create(req.body)
	.then(function(product) {
		res.status(201).json(product);
	})
	.then(null, next);
});

router.put('/:productId', function(req, res, next) {
	Product.findByIdAndUpdate(req.product._id, req.body, {new: true})
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
});