'use strict';

app.factory('ProductFactory', function($http){
	
	var ProductFactory = {};

	ProductFactory.fetchAll = function(){
		return $http.get('/api/products')
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.fetchById = function(id){
		return $http.get('/api/products/' + id)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.create = function(productInfo){
		return $http.post('/api/products', productInfo)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.update = function(id,data){
		return $http.put('/api/products/' + id,data)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.remove = function(id){
		return $http.delete('/api/products/category', id)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.getByCategory = function(data){
	
		return $http.get('/api/products/category/' + data._id)
		.then(function(response){
			return response.data;
		})
	}

	return ProductFactory;

});