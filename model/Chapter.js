const mongoose = require('mongoose');
const db = require('../index');

const chapterSchema = mongoose.Schema({
    novelId: {
        type: String,
        required: true,
        index: true,
    },
    chapterId: {
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
    prevChapterId: {
        type: String,
        index: true,
    },
    content: {
        type: String,
        required: true,
    },
    isBroken: {
        type: Boolean
    }
});

// Export Chapter Model
const Chapter = module.exports = db.dbConnection.model('chapters', chapterSchema);
module.exports.get = function (novelId, chapterId) {
    return Chapter.findOne({ novelId: novelId, chapterId: chapterId }).exec();
};

module.exports.getById = function (chapterId) {
    return Chapter.findOne({ chapterId: chapterId }).exec();
};

module.exports.getNovelChapterIds = async function (novelId) {
    const chapters = await Chapter.find({ novelId: novelId })
        .select('chapterId')
        .exec();
    var chapterNumberSet = new Set();
    for (const chapter of chapters) {
        chapterNumberSet.add(chapter.chapterId);
    }
    return chapterNumberSet;
};