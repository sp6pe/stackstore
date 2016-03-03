'use strict';

app.controller('ProductCtrl', function($scope, theProduct, theReviews){

	$scope.product = theProduct;

	$scope.reviews = theReviews;

});