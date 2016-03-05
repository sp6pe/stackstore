'use strict';

app.controller('ProductCreationCtrl', function ($scope,ProductFactory,$state,allCategories) {
 	//provides an array of objects that contains the categories
 	$scope.allCategories = allCategories;
	
	$scope.createCourse = function() {
		
		$scope.newProduct.categories = $scope.category;
		// $scope.newProduct.interviewer = //USER INFO FROM SESSION
		
		ProductFactory.create($scope.newProduct)
		.then(function() {
			$state.go('allProducts');
		})
		.catch(function (err) {
			console.log(err);
		})
	
	}

});