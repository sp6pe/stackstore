app.config(function ($stateProvider) {

    $stateProvider.state('create_product', {
        url: '/create/product',
        templateUrl: 'js/product/product.creation/product.creation.html',
        controller: 'ProductCreationCtrl',
        resolve: {
        	allCategories: function (CategoryFactory) {
        		return CategoryFactory.fetchAll();
        	},
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });

});