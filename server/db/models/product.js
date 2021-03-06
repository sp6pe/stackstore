var mongoose = require('mongoose');
var Category = mongoose.model('Category');

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
    interviewer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    photoUrl: {
        type: String,
        default: 'http://images.clipartpanda.com/pen-and-paper-clipart-lined_paper_w_pen.png'
    }

});

schema.statics.findByCategoryId = function(categoryId) {
    return this.find({ categories: categoryId }).populate('categories');
};

schema.statics.findByInterviewerId = function(interviewerId) {
    return this.find({ interviewer: interviewerId }).populate('interviewer');
};

schema.methods.addCategory = function(categoryData) {
    var product = this;
    var category;

    return Category.findOne(categoryData)
        .then(function(category) {
            if (!category) {
                return Category.create(categoryData);
            } else {
                return category;
            }
        })
        .then(function(cat) {
            category = cat;
            product.categories.addToSet(cat._id);
            return product.save();
        })
        .then(function() {
            return category;
        })
};

schema.methods.removeCategory = function(category) {
    var product = this;
 
     product.categories.pull(category);
     return product.save();
      
};

mongoose.model('Product', schema);