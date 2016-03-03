app.controller('cartCtrl',function($scope, CartFactory){
	
	CartFactory.fetchAll()
		.then(function(carts){
			console.log(carts, "in controller")
			$scope.cart = carts[1];
			$scope.productsInCart = carts[1].productList;
		})





    //add product when on the cart 
	$scope.increaseItemQuantity = function(cartId,productId){
		CartFactory.increaseQty(cartId, productId)
			.then(function(cart){
				$scope.quantity = cart.quantityIndex;
			})
	}

		

	$scope.removeProduct = function(cartId,productId) {
		//console.log(cartId,productId);
		CartFactory.removeProduct(cartId,productId);
	};

	$scope.decreaseItemQuantity = function(cartId,productId) {
		//console.log(cartId,productId);
		CartFactory.decreaseQty(cartId,productId);
	};

	$scope.viewCompletedOrders = function(){};

	$scope.viewCurrentOrders = function(){};


});