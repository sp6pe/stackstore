'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    productList:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity:{
            type: Number
        }          
    }],
    dateCreated:{
    	type: Date, 
    	default: Date.now
    },
    status:{
    	type: String,
    	enum:['created', 'processing', 'cancelled', 'complete']
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    finalCart: [{
        product:{
            type: String
        },
        quantity:{
            type: Number
        }      
    }]
});

schema.plugin(deepPopulate);

//returns false if not found, returns the index of the product if it is found
function checkInCart(productId) {

    for (var x = 0; x < this.productList.length; x++) {
        if (this.productList[x].product._id.toString() === productId) {
            return x;
        }
    }

    return false;
};

// This is for both adding a product and increasing the quantity
schema.methods.addProduct = function (productId) {

    var isInCart = checkInCart.call(this, productId); //need to set context of this to function

    if (isInCart !== false) {
        this.productList[isInCart].quantity++;
    } else {
        this.productList.push({product:productId, quantity:1});
    }

    this.markModified('productList');
    return this.save();
};

schema.methods.decreaseQty = function(productId) {
    var isInCart = checkInCart.call(this, productId);

    if (isInCart === false) return;
    this.productList[isInCart].quantity--;

    if (this.productList[isInCart].quantity === 0) {
        this.productList.splice(isInCart,1);
    }

    this.markModified('productList');
    return this.save();
};

schema.methods.removeProduct = function (product) {
    var isInCart = checkInCart.call(this, product._id.toString());

    if (isInCart === false) return;

    this.productList.splice(isInCart, 1);
    return this.save();
};

schema.methods.checkout = function(cart) {

};

mongoose.model('Cart', schema);