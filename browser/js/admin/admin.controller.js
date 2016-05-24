'use strict'
//admin rights 
app.controller('AdminCtrl', function($scope, allProducts, allUsers, allCarts, ProductFactory, UserFactory, CartFactory) {

	$scope.products = allProducts;
	$scope.users = allUsers;
	$scope.carts = allCarts;
	//admin can remove a product
	$scope.removeProduct = function(product) {
		console.log(product);
		var confirmation = prompt("please rewrite the product title to continue.");
		if (confirmation === product.title)
		ProductFactory.remove(product._id)
		.then(function() {
			var idx = $scope.products.indexOf(product);
			$scope.products.splice(idx,1);
		})
	}
	//admin can remove user
	$scope.removeUser = function(user) {
		var confirmation = prompt("please rewrite the user's first name to continue.");
		if (confirmation === user.firstName)
		UserFactory.remove(user._id)
		.then(function() {
			var idx = $scope.users.indexOf(user);
			$scope.users.splice(idx,1);
		})
	}
	//admin can remove a cart
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