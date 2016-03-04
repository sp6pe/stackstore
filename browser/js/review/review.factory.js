'use strict';

app.factory('ReviewFactory', function($http){
	var ReviewFactory = {};
	ReviewFactory.fetchAll = function(){
		return $http.get('/api/reviews')
		.then(function(response){
			// console.log('ReviewFactory fetchAll: ', response.data);
			return response.data;
		});
	};

	ReviewFactory.fetchByReviewId = function(id){
		return $http.get('/api/reviews/' + id)
		.then(function(response){
			// console.log('ReviewFactory fetchById: ', response.data);
			return response.data;
		});
	};

	ReviewFactory.fetchByProductId = function(productId){
		//fetch all reviews corresponding to a product
		return $http.get('/api/reviews/product/' + productId)
		.then(function(response){
			// console.log('ReviewFactory fetchById: ', response.data);
			return response.data;
		});
	};

	ReviewFactory.create = function(data){
		return $http.post('/api/reviews', data)
		.then(function(response){
			// console.log('ReviewFactory create: ', response.data);
			return response.data;
		});
	};

	ReviewFactory.update = function(id){
		return $http.put('/api/reviews/' + id)
		.then(function(response){
			console.log('ReviewFactory update: ', response.data);
			return response.data;
		});
	};

	ReviewFactory.remove = function(id){
		return $http.delete('/api/reviews/' + id)
		.then(function(response){
			// console.log('ReviewFactory remove: ', response.data);
			return response.data;
		});
	};


	return ReviewFactory;

});