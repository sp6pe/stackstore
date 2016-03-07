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
    	enum:['created', 'processing', 'cancelled', 'complete'],
        default: 'created'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    finalCart: [{
        product:{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            price: {
                type: Number,
                required: true
            },
            photoUrl: {
                type: String
            }
        },
        quantity:{
            type: Number
        }
    }]
});

schema.plugin(deepPopulate);

// This is for both adding a product and increasing the quantity
schema.methods.addProduct = function (productId) {
    //console.log('product id ', productId);

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

// The cart you call this on must have its products populated
schema.methods.checkout = function() {
    var cart = this;

    cart.productList.forEach(function(productObj) {
        cart.finalCart.push({
            product: {
                title: productObj.product.title,
                description: productObj.product.description,
                price: productObj.product.price,
                photoUrl: productObj.product.interviewer.photoUrl
            },
            quantity: productObj.quantity
        });
    });

    cart.status = 'complete';

    return cart.save();
};

schema.methods.merge = function(sessionCart){

    var userCart = this;

    sessionCart.productList.forEach(function(productObj){

        for (var i = 0; i < productObj.quantity; i++) {
            userCart.mergeAddProduct(productObj.product._id);
        }
   
    });
    userCart.markModified('productList');
  
    return userCart.save();

};
schema.methods.mergeAddProduct = function (productId) {

    var isInCart = checkInCartNotPopulated.call(this, productId); //need to set context of this to function
    console.log('result of is in cart',isInCart) //false for 1st iteration 

    if (isInCart !== false) {
        this.productList[isInCart].quantity++;
    } else {
        this.productList.push({product:productId, quantity:1});
    }
    
};

//returns false if not found, returns the index of the product if it is found
function checkInCart(productId) {

    for (var x = 0; x < this.productList.length; x++) {
        if (this.productList[x].product._id.toString() === productId) {
            return x;
        }
    }

    return false;
};

function checkInCartNotPopulated(productId) {

    for (var x = 0; x < this.productList.length; x++) {
  
        if (this.productList[x].product.toString() === productId) {
            return x;
        }
    }

    return false;
};

mongoose.model('Cart', schema);







