'use strict';

app.controller('UserProfileCtrl', function($scope, theUser, UserFactory) {

	$scope.user = theUser;

	$scope.fullName = $scope.user.firstName + ' ' + $scope.user.lastName;

	$scope.changingPic = false;

	$scope.toggle = function(){
		$scope.changingPic = !$scope.changingPic;
	};

	$scope.saveProfileChanges = function(user){
		user.firstName = $scope.fullName.split(' ')[0];
		user.lastName = $scope.fullName.split(' ')[1];
		UserFactory.update(user._id, user);
	};

});