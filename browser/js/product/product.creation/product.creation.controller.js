'use strict';

app.controller('ProductCreationCtrl', function ($scope,ProductFactory,$state,allCategories,currentUser) {
 	//provides an array of objects that contains the categories
 	$scope.allCategories = allCategories;
	
	$scope.createCourse = function() {
		
		$scope.newProduct.categories = $scope.category;
		$scope.newProduct.interviewer = currentUser._id;
		ProductFactory.create($scope.newProduct)
		.then(function(data) {
			console.log(data);
			$state.go('allProducts');
		})
		.catch(function (err) {
			console.log(err);
		})
	
	}

});