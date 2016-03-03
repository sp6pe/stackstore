var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Review = mongoose.model('Review');

router.param('reviewId', function(req, res, next, reviewId) {
	Review.findById(reviewId)
	.populate('author product')
	.then(function(review) {
		if (!review) throw new Error('Review not found');
		req.review = review;
		next();
	})
	.then(null, next);
});

router.get('/', function(req, res, next) {
	Review.find({})
	.then(function(reviews) {
		if (reviews.length === 0) throw new Error('No reviews found');
		res.json(reviews);
	})
	.then(null, next);
});

router.get('/product/:productId', function(req, res, next) {
	Review.findByProductId(req.params.productId).exec()
	.then(function(reviews) {
		if (reviews.length === 0) throw new Error('No reviews found');
		res.json(reviews);
	})
	.then(null, next);
});

router.get('/:reviewId', function(req, res, next) {
	res.json(req.review);
});

router.post('/', function(req, res, next) {
	Review.create(req.body)
	.then(function(review) {
		res.status(201).json(review);
	})
	.then(null, next);
});

router.put('/:reviewId', function(req, res, next) {
	Review.findByIdAndUpdate(req.review._id, req.body, {new: true})
	.then(function(review) {
		res.json(review);
	})
	.then(null, next);
});

router.delete('/:reviewId', function(req, res, next) {
	req.review.remove()
	.then(function(success) {
		res.status(204).end();
	})
});