'use strict';

app.controller('UserProfileCtrl', function($scope, theUser) {

	$scope.user = theUser;

	$scope.fullName = $scope.user.firstName + ' ' + $scope.user.lastName;

	$scope.saveProfileChanges = function(){};

});