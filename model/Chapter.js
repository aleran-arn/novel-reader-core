var mongoose = require('mongoose');
var db = require('../index');

var chapterSchema = mongoose.Schema({
    novelId: {
        type: String,
        required: true,
        index: true,
    },
    number: {
        type: Number,
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    prevChapterHref: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
});

// Export Chapter Model
var Chapter = module.exports = db.dbConnection.model('chapters', chapterSchema);
module.exports.get = function (novelId, chapterNumber) {
    return Chapter.findOne({ novelId: novelId, number: chapterNumber }).exec();
};

module.exports.getNovelChapterNumbers = async function (novelId) {
    const chapters = await Chapter.find({ novelId: novelId })
        .select('number')
        .exec();
    var chapterNumberSet = new Set();
    for (const chapter of chapters) {
        chapterNumberSet.add(chapter.number);
    }
    return chapterNumberSet;
};