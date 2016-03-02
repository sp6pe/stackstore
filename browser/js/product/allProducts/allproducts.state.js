app.config(function ($stateProvider) {

     $stateProvider.state('allProducts', {
        url: '/allproducts',
        templateUrl: 'js/product/allProducts/allProducts.html',
        controller: 'allProductsCtrl'
    });

});