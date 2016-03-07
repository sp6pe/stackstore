app.controller('cartCtrl',function($scope, CartFactory, AuthService, cart) {

    //add product when on the cart 
	$scope.increaseItemQuantity = function(productId){
		CartFactory.increaseQty($scope.cart._id, {'id': productId})
			.then(function(cart){
				$scope.cart = cart;
				$scope.setCurrentTotal();
			});
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
		$scope.cart.productList.forEach(function(productObj, index) {
			total += productObj.product.price * productObj.quantity;
		});
		$scope.total = total;
	};

	$scope.checkout = function() {
		CartFactory.checkout($scope.cart._id)
			.then(function(newCart) {
				$scope.cart = newCart;
			})
			.catch(function(err) {
				console.error(err);
			});
	};

	$scope.isLoggedIn = function() {
		return AuthService.isAuthenticated();
	};

	$scope.viewCompletedOrders = function(){};

	$scope.viewCurrentOrders = function(){};

	$scope.cart = cart;
	$scope.setCurrentTotal();


});