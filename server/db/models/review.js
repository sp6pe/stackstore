var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
        minlength: 20
    },
    stars: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

schema.statics.findByAuthorId = function(authorId) {
    return this.find({ author: authorId }).exec();
};

schema.statics.findByProductId = function(productId) {
    return this.find({ product: productId }).exec();
};

mongoose.model('Review', schema);