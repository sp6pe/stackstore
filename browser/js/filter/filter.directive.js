'use strict'

app.directive('filter', function(CategoryFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/filter/filter.html',
		scope: {
			product: "=model",
		},
		link: function(scope, elem, attrs) {
			//this is what I tried
			CategoryFactory.fetchAll()
			.then(function(categories) {
				scope.categories = categories;				
			})

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
      			console.log(scope.chosenCategory);
      			return (titleMatch() && interviewerMatch() && categoryMatch());
      		};
    	},
	};
});	