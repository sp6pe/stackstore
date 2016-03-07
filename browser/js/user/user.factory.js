'use strict';

app.factory("UserFactory", function($http) {
	var UserFactory = {};

	UserFactory.fetchAll = function() {
		return $http.get('/api/users')
		.then(function(response) {
			return response.data;
		});
	};

	UserFactory.fetchById = function(id) {
		return $http.get('/api/users/' + id) 
		.then(function(response) {
			return response.data;
		});
	};

	UserFactory.create = function(data) {
		return $http.post('/api/users',data)
		.then(function(response) {
			return response.data;
		});
	};

	UserFactory.update = function(id) {
		return $http.put('/api/users/' + id)
		.then(function(response) {
			return response.data;
		});
	};

	UserFactory.remove = function(id) {
		return $http.delete('/api/users/' + id)
		.then(function(response) {
			return response.data;
		});
	};

	return UserFactory;
});