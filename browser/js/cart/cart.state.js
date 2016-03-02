app.config(function ($stateProvider) {
	// The extra data property is so the <body> html tag has the class of the 'cart-body'
     $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl',
        data: {
                   bodyClasses: 'cart-body'
               }
    });

});