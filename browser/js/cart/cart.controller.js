app.controller('cartCtrl',function($scope, CartFactory){

	CartFactory.fetchAll()
		.then(function(carts){
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
				$scope.cart = cart;
				$scope.setCurrentTotal();
			})
			.catch(console.error.bind(console));
	};

	$scope.removeProduct = function(productId) {
		CartFactory.removeProduct($scope.cart._id,productId)
			.then(function(cart) {
				$scope.cart = cart;
				$scope.setCurrentTotal();
			})
	};

	$scope.decreaseItemQuantity = function(productId) {
		//console.log(cartId,productId);
		CartFactory.decreaseQty($scope.cart._id,{'id': productId})
			.then(function(cart){
				$scope.cart = cart;
				$scope.setCurrentTotal();
			})
	};

	$scope.setCurrentTotal = function() {
		var total = 0;
		$scope.productsInCart.forEach(function(productObj, index) {
			total += productObj.product.price * productObj.quantity;
		});
		$scope.total = total;
	};

	$scope.viewCompletedOrders = function(){};

	$scope.viewCurrentOrders = function(){};


});