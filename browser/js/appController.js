app.controller('appCtrl',function($scope,ProductFactory){
	var vm = this;
	vm.bodyClasses = 'default';

	// this'll be called on every state change in the app
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    if (angular.isDefined(toState.data)) {
	        vm.bodyClasses = toState.data.bodyClasses;
	        return;
	    }

	    vm.bodyClasses = 'default';
	});
});