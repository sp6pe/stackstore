var mongoose = require('mongoose');

var schema = new mongoose.Schema({
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
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]

});

schema.statics.findByCategoryId = function(categoryId) {
    return this.find({ categories: categoryId }).populate('categories');
};

schema.statics.findByUserId = function(userId) {
    return this.find({ user: userId });
};

mongoose.model('Product', schema);