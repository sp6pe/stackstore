'use strict'

app.directive('filter', function(CategoryFactory,UserFactory,ProductFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/filter/filter.html',
		scope: {
			product: "=productModel",
			user: "=userModel",
			cart: "=cartModel"
		},
		link: function(scope, elem, attrs) {
			CategoryFactory.fetchAll()
			.then(function(categories) {
				scope.categories = categories;				
			})

			if (attrs.hasOwnProperty('isProduct')) scope.isProduct = true;
			if (attrs.hasOwnProperty('isUser')) scope.isUser = true;
			if (attrs.hasOwnProperty('isCart')) scope.isCart = true;

      		scope.product = function(product) {
      			var titleMatch = function() {
	      			if(!scope.title) {
	      				return true;
	      			}
	      			return (product.title.toLowerCase().indexOf(scope.title.toLowerCase()) > -1);      				
      			}

      			var interviewerMatch = function() {
	      			if(!scope.interviewerName) {
	      				return true;
	      			}
	      			return (product.interviewer.toLowerCase().indexOf(scope.interviewerName.toLowerCase()) > -1);      				
      			}

      			var categoryMatch = function() {
	      			if(!scope.chosenCategory) {
	      				return true;
	      			}
	      			return (product.categories.indexOf(scope.chosenCategory) > -1);      				
      			}

      			return (titleMatch() && interviewerMatch() && categoryMatch());
      		};

      		scope.user = function(user) {
      			var lastNameMatch = function() {
      				if(!scope.lastName) {
      					return true;
      				}
      				return (user.lastName.toLowerCase().indexOf(scope.lastName.toLowerCase()) > -1);      				

      			}

      			var emailMatch = function() {
      				if(!scope.email) {
      					return true;
      				}
      				return (user.email.toLowerCase().indexOf(scope.email.toLowerCase()) > -1);      				

      			}
      			
      			return lastNameMatch() && emailMatch();
      		};

      		scope.cart = function(cart) {
      			if (!scope.lastName) {
      				return true;
      			}
      			else {
      				return (cart.lastName.toLowerCase().indexOf(scope.lastName.toLowerCase()) > -1);
      			}
      		}
    	},
	};
});	