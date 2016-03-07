'use strict';
app.config(function ($stateProvider) {
	// The extra data property is so the <body> html tag has the class of the 'cart-body'
     $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl',
        resolve: {
        	cart: function(CartFactory) {
        		return CartFactory.getCurrentCart();
        	}
        },
        data: {
                   bodyClasses: 'cart-body'
               }
    });

     $stateProvider.state('prevOrders', {
        url: '/cart/previous-orders',
        templateUrl: 'js/cart/previous-orders/previous-orders.html',
        controller: 'prevOrderCtrl',
        resolve: {
            orders: function(CartFactory) {
                return CartFactory.getPreviousOrders();
            }
        }
     })

});