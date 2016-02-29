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
    category: {
        type: [String]
    },
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    reviews: [Reviews]

});

var Reviews = new mongoose.Schema({
    review: {
        type: String,
        required: true,
        minlength: 20
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


mongoose.model('Product', schema);