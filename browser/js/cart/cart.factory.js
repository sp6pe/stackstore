'use strict';

app.factory("CartFactory", function($http) {
	var CartFactory = {};

	CartFactory.fetchAll = function() {
		return $http.get('/api/carts')
		.then(function(response) {
			console.log("CartFactory.fetchAll: ", response.data);
			return response.data;
		})
	}

	CartFactory.fetchById = function(id) {
		return $http.get('/api/carts/' + id) 
		.then(function(response) {
			console.log("CartFactory.fetchById: ", response.data);
			return response.data;
		})
	}

	CartFactory.create = function() {
		return $http.post('/api/carts')
		.then(function(response) {
			console.log("CartFactory.create: ", response.data);
			return response.data;
		})
	}

	CartFactory.update = function(id) {
		return $http.put('/api/carts/' + id)
		.then(function(response) {
			console.log('CartFactory.update: ', response.data);
			return response.data;
		})
	}

	CartFactory.removeProduct = function(cartId,productId) {
		//console.log("in factory", cartId,productId)
		return $http.delete('/api/carts/' + cartId + '/products/' + productId)
		.then(function(response) {
			console.log('CartFactory.remove: ', response.data);
			return response.data;
		})
	}

	return CartFactory;
});