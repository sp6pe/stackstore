'use strict';

app.controller('ProductCreationCtrl', function ($scope,ProductFactory,$state) {
	$scope.createCourse = function() {
		//$scope.hasSubmitted = true;
		ProductFactory.create($scope.newProduct)
		.then(function(product) {
			$state.go('allProducts');
		})
		.catch(function (err) {
			console.log(err);
		})
	}
});