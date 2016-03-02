'use strict'

app.config(function($stateProvider){

	$stateProvider.state('product',{
		url: '/products/:productId',
		templateUrl: '/js/product/detail/product.detail.html',
		controller: 'ProductCtrl',
		resolve: {
			theProduct: function(ProductFactory, $stateParams){
				console.log($stateParams);
				return ProductFactory.fetchById($stateParams.productId);
			}
		}
	});
	
});