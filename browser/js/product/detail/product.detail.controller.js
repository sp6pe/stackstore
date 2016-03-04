'use strict';

app.controller('ProductCtrl', function($scope, theProduct,CartFactory,theReviews, ReviewFactory){

	$scope.product = theProduct;
	$scope.reviews = theReviews;

	$scope.addToCart = function(product){
		CartFactory.create(product).then(function(cart){
			return cart;
		})
	};
	
	var displayLimit = 2;
	$scope.reviewAmount = theReviews.length;
	
	$scope.typingReview = false;
	$scope.toggleWrite = function(){
		$scope.typingReview = !$scope.typingReview;

		ReviewFactory.fetchByProductId(theProduct._id)
		.then(function(newReviews){
			$scope.reviews = newReviews;
			$scope.reviewAmount = newReviews.length;
		});
	};

	if($scope.reviewAmount === 0){
		$scope.noReviews = true;
	} else if ($scope.reviewAmount < displayLimit){
		$scope.noReviews = false;
		$scope.lessReviewsThanLimit = true;
	
	} else {
		$scope.noReviews = false;
		$scope.reviewDisplayLimit = displayLimit;
		$scope.lessReviewsThanLimit = false;
		$scope.reviewsLimited = true;

	}

	$scope.showAllReviews = function(){
		$scope.reviewsLimited = false;
		$scope.reviewDisplayLimit = undefined;
	};

	$scope.showLessReviews = function(){
		$scope.reviewDisplayLimit = displayLimit;
		$scope.reviewsLimited = true;
	};

});