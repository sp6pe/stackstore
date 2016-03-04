app.controller('cartCtrl',function($scope, CartFactory){

	CartFactory.fetchAll()
		.then(function(carts){
			console.log(carts[0], "in controller")
			$scope.cart = carts[0];
			$scope.productsInCart = $scope.cart.productList;
			$scope.quantityIndex = $scope.cart.quantityIndex;
		})
		.catch(function(err) {
			console.error(err);
		});

    //add product when on the cart 
	$scope.increaseItemQuantity = function(productId){
		CartFactory.increaseQty($scope.cart._id, {'id': productId})
			.then(function(cart){
				$scope.quantityIndex = cart.quantityIndex;
			})
	};

	$scope.removeProduct = function(productId) {
		//console.log(cartId,productId);
		CartFactory.removeProduct($scope.cart._id,productId)
			.then(function(cart) {
				$scope.productsInCart = cart.productList;
			})
	};

	$scope.decreaseItemQuantity = function(productId) {
		//console.log(cartId,productId);
		CartFactory.decreaseQty($scope.cart._id,{'id': productId})
			.then(function(cart){
				$scope.quantityIndex = cart.quantityIndex;
			})
	};

	$scope.viewCompletedOrders = function(){};

	$scope.viewCurrentOrders = function(){};


});