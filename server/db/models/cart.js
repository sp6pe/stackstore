'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

var schema = new mongoose.Schema({
    productList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    dateCreated:{
    	type: Date, 
    	default: Date.now
    },
    status:{
    	type: String,
    	enum:['created', 'processing','cancelled','complete']
    },
    finalCart: [{
        type: String
    }]
});


schema.methods.addProduct = function (productId) {
    var cart = this;
    return Product.findById(productId)
    .then(function (product) {
        cart.productList.addToSet(product._id);
        return cart.save();
    });
};

schema.methods.removeProduct = function (product) {
    var cart = this;
    return product.remove()
    .then(function () {
        cart.productList.pull(product);
        return cart.save();
    });

};

mongoose.model('Cart', schema);