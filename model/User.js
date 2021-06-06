const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        index: true,
        unique: true
    },
    readedNovels: [
        {
            novelId: {
                type: String,
                required: true,
            },
            lastChapterId: {
                type: String,
                required: true,
            },
            lastUpdate: {
                type: Date,
                required: true,
            }
        }
    ],

});

// Export Model
const User = module.exports = mongoose.model('users', userSchema);

module.exports.getById = function (userId) {
    return User.findOne({ userId: userId }).exec();
};