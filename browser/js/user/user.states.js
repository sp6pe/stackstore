'use strict';

app.config(function($stateProvider){

	$stateProvider.state('user', {
		url: '/users/:userId',
		templateUrl: '/js/user/user.html',
		controller: 'UserCtrl',
		resolve: {
			theUser: function(UserFactory, $stateParams){
				console.log('$stateParams.userId', $stateParams.userId);
				return UserFactory.fetchById($stateParams.userId);
			}
		}
	});

	$stateProvider.state('user.profile', {
		url: '/profile',
		templateUrl: '/js/user/user.profile.html',
		controller: 'UserProfileCtrl'
	});

	$stateProvider.state('user.orders', {
		url: '/orders',
		templateUrl: '/js/user/user.orders.html',
		controller: 'UserOrdersCtlr'
	});

});