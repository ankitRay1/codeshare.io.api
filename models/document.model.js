const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({

    uid: {
        type: String,
        required: true
    },
    documentId: {
        type: String,
        required: true
    },
    createdAt: {

        type: Number,
        required: true

    },

    updatedAt: {

        type: Number,
        required: true
    },

    title: {

        type: String,
        required: true,
        trim: true
    },

    content: {

        type: Array,
        default: []
    }


});

const documentModel = mongoose.model('Document', documentSchema);

module.exports = documentModel;