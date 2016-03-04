app.controller('signupCtrl',function($scope,UserFactory,$state,AuthService){



	$scope.sendSignup = function(signupData){


		UserFactory.create(signupData)
					.then(function(user){
						// $timeout(function(){
							return AuthService.getLoggedInUser()
						
					}).then(function(){

						$state.go('home');

					}).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

	}

})