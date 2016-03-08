'use strict';

app.factory("CartFactory", function($http) {
	var CartFactory = {};

	CartFactory.fetchAll = function() {
		return $http.get('/api/carts')
			.then(function(response) {
				return response.data;
			})
	};

	// Get or create cart for current session
	CartFactory.getCurrentCart = function() {
		return $http.get('/api/carts/current')
			.then(function(response) {
				return response.data;
			})
	};

	CartFactory.fetchById = function(id) {
		return $http.get('/api/carts/' + id) 
			.then(function(response) {
				return response.data;
			})
	};

	CartFactory.create = function(data) {
		return $http.post('/api/carts',data)
			.then(function(response) {
				return response.data;
			})
	};

	CartFactory.increaseQty = function(id, data) {
		return $http.post('/api/carts/' + id + '/add/', data)
			.then(function(response) {
				return response.data;
			})
	};

	CartFactory.decreaseQty = function(id ,data) {
		return $http.post('/api/carts/' + id +'/remove/', data)
			.then(function(response) {
				return response.data;
			})
	};

	CartFactory.removeProduct = function(cartId,productId) {
		return $http.delete('/api/carts/' + cartId + '/products/' + productId)
			.then(function(response) {
				return response.data;
			})
	};

	CartFactory.getPreviousOrders = function() {
		return $http.get('/api/carts/previous-orders')
			.then(function(response) {
				return response.data;
			})
	};

	CartFactory.checkout = function(cartId) {
		return $http.post('/api/carts/' + cartId + '/checkout')
			.then(function(response) {
				return response.data;
			})
	}

	CartFactory.remove = function(cartId) {
		return $http.delete('/api/carts/' +cartId)
			.then(function(response) {
				return response.data;
			})
	}

	return CartFactory;
});