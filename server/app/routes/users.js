'use strict'
var router = require('express').Router();
module.exports = router;
require('../../db/models');
var User = mongoose.model('User');
_=require('lodash');



router.get('/',function(req,res,next){
	return User.find({})
	.then(function(users){
		res.json(users)
	})
	.then(null,next)
})


router.post('/',function(req,res,next){
	User.create(req.body)
	.then(function(user){
		res.status(201).json(user)
	})
	.then(null,next)
})

router.param('userId',function(req,res,next,id){
	User.findbyId(id).exec()
	.then(function(user){
		if(!user) throw Error('No such user')
		req.user = user;
		next();
	})
	.then(null,next);
})

router.get('/:userId',function(req,res,next){
	res.json(req.user)
})

router.put('/:userId', function (req, res, next) {
	User.findByIdAndUpdate(req.user.id,req.body, {new: true})
	.then(function(user){
		//console.log(book);
		res.json(user).status(200);
	})
	.then(null,next)
});


router.delete('/:userId',function(req,res,next){
	req.user.remove()
	.then(function(){
		res.status(204).end()
	})
	.then(next,null)
})

router.use('/:userId/cart', require('./cart'));