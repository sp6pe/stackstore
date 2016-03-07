'use strict';
app.controller('prevOrderCtrl', function($scope, orders) {
	console.log(orders, 'the orders');
	$scope.orders = orders;
});