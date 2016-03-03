'use strict';

app.controller('ProductCtrl', function($scope, theProduct,CartFactory,theReviews){

	$scope.product = theProduct;
	$scope.reviews = theReviews;

	$scope.addToCart = function(product){
		CartFactory.create(product).then(function(cart){
			console.log(cart);
			return cart;
		})
	}

	
	var displayLimit = 2;
	$scope.reviewAmount = theReviews.length;

	if($scope.reviewAmount === 0){
		$scope.noReviews = true;
	} else if ($scope.reviewAmount < displayLimit){
		$scope.noReviews = false;
		$scope.reviewDisplayLimit = theReviews.length;
		$scope.lessReviewsThanLimit = true;
	
	} else {
		$scope.noReviews = false;
		$scope.reviewDisplayLimit = displayLimit;
		$scope.lessReviewsThanLimit = false;
		$scope.reviewsLimited = true;

	}

	$scope.showAllReviews = function(){
		$scope.reviewDisplayLimit = undefined;
		$scope.reviewsLimited = false;
		console.log(theReviews);
	};

	$scope.showLessReviews = function(){
		$scope.reviewDisplayLimit = displayLimit;
		$scope.reviewsLimited = true;
	};

});