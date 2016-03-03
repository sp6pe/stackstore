'use strict';

app.controller('ProductCtrl', function($scope, theProduct,CartFactory,theReviews){



	$scope.product = theProduct;


	$scope.addToCart = function(product){
		CartFactory.create(product).then(function(cart){
			console.log(cart);
			return cart;
		})
	}
	$scope.reviews = theReviews;

});