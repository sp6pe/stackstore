'use strict'

app.config(function($stateProvider){

	$stateProvider.state('product',{
		url: '/products/:productId',
		templateUrl: '/js/product/detail/product.detail.html',
		controller: 'ProductCtrl',
		resolve: {
			theProduct: function(ProductFactory, $stateParams){
				return ProductFactory.fetchById($stateParams.productId);
			},
			theReviews: function(ReviewFactory, $stateParams){
				console.log('$stateParams.productId', $stateParams.productId)
				return ReviewFactory.fetchByProductId($stateParams.productId);
			}
		}
	});
	
});