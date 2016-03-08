'use strict'

app.directive('recommendation', function(ProductFactory){
	return{
		restrict: 'E',
		templateUrl:'js/recommend/recommend.html',
		scope: {
			product : '='
		},
		link: function(scope){
			ProductFactory.getByCategory(scope.product.categories[0])
			.then(function(products){
				scope.recCategory = products;
			})


		}
	};
});