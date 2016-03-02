app.controller('cartCtrl',function($scope,ProductFactory){
	$scope.productsInCart = [
		{
		    title: 'Javascript, Angular',
		    price: 100,
		    quantity: 10,
		    user: {
		    	photoUrl: 'http://s3.amazonaws.com/fullstackwebsite/joe_alves.jpg',
		    	firstName: 'Joe',
		    	lastName: 'Alves'
		    }
		},
		{
		    title: 'Test Course 2',
		    price: 50,
		    quantity: 10,
		    user: {
		    	photoUrl: 'http://s3.amazonaws.com/fullstackwebsite/joe_alves.jpg',
		    	firstName: 'Joe',
		    	lastName: 'Alves'
		    }
		}
	];
});