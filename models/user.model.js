const mongodb = require('mongoose');

const UserSchema = mongodb.Schema({

    name: {

        type: String,
        required: true
    },

    email: {

        type: String,
        required: true
    },

    profilePic: {

        type: String,
        required: true
    }
});

const UserModel = mongodb.model('User', UserSchema);

module.exports = UserModel;