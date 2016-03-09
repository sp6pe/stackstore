'use strict';

app.directive('writeReview', function(ReviewFactory){
	return {
		restrict: 'E',
		templateUrl: '/js/review/write-review.html',
		scope:{
			productId: '@productId',
			authorId: '@authorId',
			hideform: '&'
		},
		link: function(scope){

			scope.addReview = function(){
				ReviewFactory.create({
					title: scope.reviewTitle,
					content: scope.reviewContent,
					stars: scope.stars,
					product: scope.productId,
					author: scope.authorId
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