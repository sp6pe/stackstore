'use strict';
var mongoose = require('mongoose');
// var _ = require('lodash');

var schema = new mongoose.Schema({
    productList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    creation:{
    	type:Date, 
    	default: Date.now
    },
    status:{
    	type:String,
    	enum:['created', 'processing','cancelled','complete']
    }
});

mongoose.model('Cart', schema);