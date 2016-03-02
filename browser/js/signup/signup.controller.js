app.controller('signupCtrl',function($scope,UserFactory,$state){



	$scope.sendSignup = function(signupData){


		UserFactory.create(signupData)
					.then(function(user){
						$state.go('home');
					}).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

	}

})