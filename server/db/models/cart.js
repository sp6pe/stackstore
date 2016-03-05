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
    	enum:['created', 'processing','cancelled','complete']
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

//these are used by all methods
var alreadyInCart;
var index;

function checkInCart() {
    //console.log('this in checkINCart',this);
    for (var x = 0; x < this.productList.length; x++) {
        if (this.productList[x].product === productId) {
            alreadyInCart = true;
            index = x;
            break;
        }
    }
}

// This is for both adding a product and increasing the quantity
schema.methods.addProduct = function (productId) {
    alreadyInCart = false;

    checkInCart.call(this);//need to set context of this to function

    if (alreadyInCart) {
        this.productList[index].quantity ++;
    } else {
        console.log('pushes a productid');
        this.productList.push({product:productId, quantity:1})
    }

    this.markModified('productList');
    return this.save();
};

schema.methods.decreaseQty = function(productId) {
    alreadyInCart = false;

   checkInCart.call(this);

    this.productList[index].quantity --;

    if (this.productList[index].quantity === 0) {
        this.productList.splice(index,1);
    }

    this.markModified('productList');
    return this.save();
};

schema.methods.removeProduct = function (product) {
    checkInCart.call(this);
    this.productList[index].pull(product);
    return this.save();
};

schema.methods.checkout = function(cart) {

};

schema.plugin(deepPopulate);

mongoose.model('Cart', schema);