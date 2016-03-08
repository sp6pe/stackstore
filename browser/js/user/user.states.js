'use strict';

app.config(function($stateProvider){

	$stateProvider.state('user', {
		url: '/users/:userId',
		templateUrl: '/js/user/user.html',
		controller: 'UserCtrl',
		resolve: {
			theUser: function(UserFactory, $stateParams){
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
		controller: 'UserOrdersCtrl',
		resolve: {
			theOrders: function(CartFactory){
				return CartFactory.getPreviousOrders();
			}
		}
	});

	$stateProvider.state('user.interviews', {
		url: '/interviews',
		templateUrl: '/js/user/user.interviews.html',
		controller: 'UserInterviewCtrl',
		resolve: {
			theInterviews: function(ProductFactory, theUser){
				return ProductFactory.getByInterviewerId(theUser._id);
			}
		}
	});

});