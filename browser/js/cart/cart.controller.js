app.controller('cartCtrl',function($scope, CartFactory){

	CartFactory.fetchAll()
		.then(function(carts){
			console.log(carts[0], "in controller")
			$scope.cart = carts[0];
			$scope.productsInCart = $scope.cart.productList;
			$scope.quantityIndex = $scope.cart.quantityIndex;
			$scope.setCurrentTotal();
		})
		.catch(function(err) {
			console.error(err);
		});

    //add product when on the cart 
	$scope.increaseItemQuantity = function(productId){
		CartFactory.increaseQty($scope.cart._id, {'id': productId})
			.then(function(cart){
				$scope.quantityIndex = cart.quantityIndex;
				$scope.setCurrentTotal();
			})
	};

	$scope.removeProduct = function(productId) {
		//console.log(cartId,productId);
		CartFactory.removeProduct($scope.cart._id,productId)
			.then(function(cart) {
				$scope.productsInCart = cart.productList;
				$scope.setCurrentTotal();
			})
	};

	$scope.decreaseItemQuantity = function(productId) {
		//console.log(cartId,productId);
		CartFactory.decreaseQty($scope.cart._id,{'id': productId})
			.then(function(cart){
				$scope.quantityIndex = cart.quantityIndex;
				$scope.setCurrentTotal();
			})
	};

	$scope.setCurrentTotal = function() {
		var total = 0;
		$scope.productsInCart.forEach(function(product, index) {
			total += product.price * $scope.quantityIndex[index];
		});
		$scope.total = total;
	};

	$scope.viewCompletedOrders = function(){};

	$scope.viewCurrentOrders = function(){};


});