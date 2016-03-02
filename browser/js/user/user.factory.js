'use strict';

app.factory("UserFactory", function($http) {
	var UserFactory = {};

	UserFactory.fetchAll = function() {
		return $http.get('/api/users')
		.then(function(response) {
			console.log("UserFactory.fetchAll: ", response.data);
			return response.data;
		})
	}

	UserFactory.fetchById = function(id) {
		return $http.get('/api/users/' + id) 
		.then(function(response) {
			console.log("UserFactory.fetchById: ", response.data);
			return response.data;
		})
	}

	UserFactory.create = function(data) {
		console.log('on controller',data)
		return $http.post('/api/users',data)
		.then(function(response) {
			console.log("UserFactory.create: ", response.data);
			return response.data;
		})
	}

	UserFactory.update = function(id) {
		return $http.put('/api/users/' + id)
		.then(function(response) {
			console.log('UserFactory.update: ', response.data);
			return response.data;
		})
	}

	UserFactory.remove = function(id) {
		return $http.delete('/api/users/' + id)
		.then(function(response) {
			console.log('UserFactory.remove: ', response.data);
			return response.data;
		})
	}

	return UserFactory;
});