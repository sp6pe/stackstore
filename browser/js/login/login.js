app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        console.log(loginInfo);
        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            console.log('in then');
            $state.go('home');
        }).catch(function () {
            console.log('in error');
            $scope.error = 'Invalid login credentials.';
        });

    };

});