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
				return ReviewFactory.fetchByProductId($stateParams.productId);
			},
			currentUser: function(AuthService) {
				return AuthService.getLoggedInUser();
			},
			theCategories: function(CategoryFactory) {
				return CategoryFactory.fetchAll();
			}
		}
	});
	
});