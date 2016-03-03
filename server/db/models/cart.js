'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

var schema = new mongoose.Schema({
    productList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    quantityIndex: [{
        type: Number
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

// This is for both adding a product and increasing the quantity
schema.methods.addProduct = function (productId) {
    var cart = this;
    return Product.findById(productId)
    .then(function (product) {
        var index = cart.productList.indexOf(product._id);
        // It already exists
        if (index !== -1) {
            cart.quantityIndex[index]++;
        } else { // It isn't in the cart
            cart.productList.addToSet(product._id);
            cart.quantityIndex.push(1);
        }
        return cart.save();
    });
};

schema.methods.decreaseQty = function(productId) {
    var cart = this;

    return Product.findById(productId)
    .then(function (product) {
        var index = cart.productList.indexOf(product._id);
        // It already exists
        if (index !== -1) {
            cart.quantityIndex[index]--;
            // If we've decremented the qty from 1 to 0, remove product from cart
            if (cart.quantityIndex[index] === 0) {
                cart.productList.pull(product);
                cart.quantityIndex.splice(index, 1);
            }
        }
        return cart.save();
    });
};

schema.methods.removeProduct = function (product) {
    var cart = this;
    cart.productList.pull(product);
    return cart.save();
};

schema.methods.checkout = function(cart) {

};

mongoose.model('Cart', schema);