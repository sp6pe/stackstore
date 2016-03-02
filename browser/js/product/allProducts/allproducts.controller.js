

app.controller('allProductsCtrl',function($scope,ProductFactory){

	ProductFactory.fetchAll().then(function(product){
		$scope.products = product;
	})

})