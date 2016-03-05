'use strict';

app.config(function($stateProvider) {

	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: '/js/admin/admin-page.html',
		controller: 'AdminCtrl'
	});

});