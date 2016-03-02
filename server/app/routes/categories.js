var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Category = mongoose.model('Category');

router.param('categoryId', function(req, res, next, categoryId) {
	Category.findById(categoryId)
	.populate('user')
	.then(function(category) {
		if (!category) throw new Error('Category not found');
		req.category = category;
		next();
	})
	.then(null, next);
});

router.get('/', function(req, res, next) {
	Category.find({})
	.then(function(categories) {
		res.json(categories);
	})
	.then(null, next);
});

router.get('/:categoryId', function(req, res, next) {
	res.json(req.category);
});

router.post('/', function(req, res, next) {
	Category.create(req.body)
	.then(function(category) {
		res.status(201).json(category);
	})
	.then(null, next);
});

router.put('/:categoryId', function(req, res, next) {
	Category.findByIdAndUpdate(req.category._id, req.body, {new: true})
	.then(function(category) {
		res.json(category);
	})
	.then(null, next);
});

router.delete('/:categoryId', function(req, res, next) {
	req.category.remove()
	.then(function(success) {
		res.status(204).end();
	})
});