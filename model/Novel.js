var mongoose = require('mongoose');
var db = require('../index');

var novelSchema = mongoose.Schema({
    novelId: {
        type: String,
        index: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    lastChapterNumber: {
        type: String,
        required: true,
    },
    lastChapterTitle: {
        type: String,
        required: true,
    },
    lastChapterUpdate: {
        type: Date,
        required: true,
        index: true,
    }
});

// Export Novel Model
var Novel = module.exports = db.dbConnection.model('novels', novelSchema);
module.exports.get = function (limit) {
    return Novel.find().sort({ lastChapterUpdate: 'desc' }).limit(limit).exec();
};

module.exports.getById = function (novelId) {
    return Novel.findOne({ novelId: novelId }).exec();
};