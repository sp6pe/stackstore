'use strict'

app.controller('AdminCtrl', function($scope, allProducts, allUsers, allCarts, ProductFactory, UserFactory) {

	$scope.products = allProducts;
	$scope.users = allUsers;
	$scope.carts = allCarts;

	$scope.removeProduct = function(product) {
		var confirmation = prompt("please rewrite the product title to continue.");
		if (confirmation === product.title)
		ProductFactory.remove(product._id)
		.then(function() {
			var idx = $scope.products.indexOf(product);
			$scope.products.splice(idx,1);
		})
	}

	$scope.removeUser = function(user) {
		var confirmation = prompt("please rewrite the user's first name to continue.");
		if (confirmation === user.firstName)
		UserFactory.remove(user._id)
		.then(function() {
			var idx = $scope.users.indexOf(user);
			$scope.users.splice(idx,1);
		})
	}

	$scope.removeCart = function(cart) {
		var confirmation = confirm("You sure you want to delete this cart?"); 
		if (confirmation)
		CartFactory.remove(cart._id)
		.then(function() {
			var idx = $scope.carts.indexOf(cart);
			$scope.carts.splice(idx,1);
		})
	}

})