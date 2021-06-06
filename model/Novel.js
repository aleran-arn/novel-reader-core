const mongoose = require('mongoose');
const db = require('../index');

const novelSchema = mongoose.Schema({
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
    coverImage: {
        data: Buffer,
        contentType: String
    },
    lastChapterId: {
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
},
    {
        bufferCommands: false,
    });

// Export Novel Model
const Novel = module.exports = db.dbConnection.model('novels', novelSchema);
module.exports.get = function (limit) {
    return Novel.find().sort({ lastChapterUpdate: 'desc' }).limit(limit).exec();
};

module.exports.getById = function (novelId) {
    return Novel.findOne({ novelId: novelId }).exec();
};