'use strict';

app.factory('ProductFactory', function($http){
	var ProductFactory = {};
	ProductFactory.fetchAll = function(){
		return $http.get('/api/products')
		.then(function(response){
			//console.log('ProductFactory fetchAll: ', response.data);
			return response.data;
		});
	};

	ProductFactory.fetchById = function(id){
		return $http.get('/api/products/' + id)
		.then(function(response){
			//console.log('ProductFactory fetchById: ', response.data);
			return response.data;
		});
	};

	ProductFactory.create = function(productInfo){
		return $http.post('/api/products', productInfo)
		.then(function(response){
			//console.log('ProductFactory create: ', response.data);
			return response.data;
		});
	};

	ProductFactory.update = function(id){
		return $http.put('/api/products/' + id)
		.then(function(response){
			//console.log('ProductFactory update: ', response.data);
			return response.data;
		});
	};

	ProductFactory.remove = function(id){
		return $http.delete('/api/products/' + id)
		.then(function(response){
			//console.log('ProductFactory remove: ', response.data);
			return response.data;
		});
	};


	return ProductFactory;

});