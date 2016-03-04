'use strict';

app.factory('CategoryFactory', function($http){
	
	var CategoryFactory = {};

	CategoryFactory.fetchAll = function(){
		return $http.get('/api/categories')
		.then(function(response){
			return response.data;
		});
	};

	CategoryFactory.fetchById = function(id){
		return $http.get('/api/categories/' + id)
		.then(function(response){
			return response.data;
		});
	};

	CategoryFactory.create = function(productInfo){
		return $http.post('/api/categories', productInfo)
		.then(function(response){
			return response.data;
		});
	};

	CategoryFactory.update = function(id){
		return $http.put('/api/categories/' + id)
		.then(function(response){
			return response.data;
		});
	};

	CategoryFactory.remove = function(id){
		return $http.delete('/api/categories/' + id)
		.then(function(response){
			return response.data;
		});
	};

	return CategoryFactory;

});