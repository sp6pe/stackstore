var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
        minlength: 20
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date, 
        default: Date.now
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
    return this.find({ product: productId });
};

mongoose.model('Review', schema);