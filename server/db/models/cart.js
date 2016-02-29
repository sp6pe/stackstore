'use strict';
var mongoose = require('mongoose');
// var _ = require('lodash');

var schema = new mongoose.Schema({
    productList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
});

mongoose.model('Cart', schema);