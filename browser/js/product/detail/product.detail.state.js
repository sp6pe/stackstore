'use strict'

app.config(function($stateProvider){

	$stateProvider.state('product',{
		url: '/products/:productId',
		templateUrl: '/js/product/detail',
		controller: 'ProductCtrl',
		resolve: {
			theProduct: function(ProductFactory, $stateParams){
				return ProductFactory.fetchById($stateParams.productId);
			}
		}
	});
	
});