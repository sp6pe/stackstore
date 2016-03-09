'use strict';

app.controller('ProductCtrl', function($scope, $state, theProduct, CartFactory, theReviews, ReviewFactory, currentUser, theCategories, ProductFactory){

	
	$scope.max = 5
	$scope.isReadonly = true;

	$scope.currentUser = currentUser;
	$scope.product = theProduct;
	$scope.reviews = theReviews;
	$scope.allCategories = theCategories;
	$scope.editMode = false;

	$scope.addToCart = function(product){
		CartFactory.create(product).then(function(cart){
			$state.go('cart');
		})
	};
	
	$scope.isInterviewer = function() {
		return ($scope.currentUser._id === $scope.product.interviewer._id);
	}

	$scope.editPage = function() {
		$scope.editMode = true;
	}

	$scope.updatePage = function(product) {
		$scope.editMode = false;
		ProductFactory.update(product._id,product)
			.then(function(product) {
				$scope.product = product;
			})
	}

	var displayLimit = 2;
	
	$scope.reviewAmount = theReviews.length;

	$scope.typingReview = false;
	$scope.toggleWrite = function(){
		console.log($scope.product.categories);	
		$scope.typingReview = !$scope.typingReview;

		ReviewFactory.fetchByProductId(theProduct._id)
		.then(function(newReviews){
			$scope.reviews = newReviews;
			$scope.reviewAmount = newReviews.length;
			if($scope.reviewAmount > 0) $scope.noReviews = false;
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