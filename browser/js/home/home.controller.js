
app.controller('HomeCtrl',function($scope,ProductFactory){

	ProductFactory.fetchAll().then(function(product){
		$scope.products = product.slice(0,6);
	})

})