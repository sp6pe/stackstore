'use strict';

app.directive('writeReview', function(ReviewFactory){
	return {
		restrict: 'E',
		templateUrl: '/js/review/write-review.html',
		scope:{
			productId: '@productId',
			hideform: '&'
		},
		link: function(scope){
			scope.starRating = [1,2,3,4,5];

			scope.addReview = function(){
				ReviewFactory.create({
					title: scope.reviewTitle,
					content: scope.reviewContent,
					stars: scope.stars,
					product: scope.productId
				});
				scope.reviewTitle = '';
				scope.reviewContent = '';
				scope.stars = '';
				scope.reviewform.$setPristine();
				scope.reviewform.$setUntouched();
				scope.hideform();
			};
		}
	};
});