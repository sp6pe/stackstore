app.controller('cartCtrl',function($scope, CartFactory){
	
	CartFactory.fetchAll()
		.then(function(carts){
			console.log(carts, "in controller")
			$scope.cart = carts[1];
			$scope.productsInCart = carts[1].productList;
		})
		

	$scope.removeProduct = function(cartId,productId) {
		//console.log(cartId,productId);
		CartFactory.removeProduct(cartId,productId);
	};


});