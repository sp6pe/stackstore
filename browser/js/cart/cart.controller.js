app.controller('cartCtrl',function($scope, CartFactory){
	
	CartFactory.fetchAll()
		.then(function(carts){
			console.log(carts, "in controller")
			$scope.cart = carts[0];
			$scope.productsInCart = carts[0].productList;
		})
		

	$scope.removeProduct = function(cartId,productId) {
		//console.log(cartId,productId);
		CartFactory.removeProduct(cartId,productId);
	};


});