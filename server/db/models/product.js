var mongoose = require('mongoose');

var Reviews = new mongoose.Schema({
    review: {
        type: String,
        required: true,
        minlength: 20
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

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
    category: {
        type: [String]
    },
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    reviews: [Reviews]

});


mongoose.model('Product', schema);