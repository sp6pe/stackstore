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

schema.methods.addCategory = function(categoryData) {
    var product = this;
    var category;

    return Category.find(categoryData)
        .then(function(category) {
            if (category.length === 0) {
                return Category.create(categoryData);
            } else {
                return category[0];
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