const documentModel = require("../models/document.model");
const crypto = require('crypto');

const createDocument = async (params, callback) => {
    const { createdAt, updatedAt } = params.body;

    var randomDocumentId = crypto.randomBytes(3).toString('hex');
    console.log(randomDocumentId);
    try {
        let document = documentModel({
            uid: "34343",
            createdAt: createdAt,
            updatedAt: updatedAt,
            title: "Untitled Code",
            documentId: randomDocumentId
        });

        document = await document.save();

        return callback(null, document);
    } catch (error) {
        console.log(error);
        return callback(error);
    }
};

const displayDocById = async (req, callback) => {


    try {

        let document = await documentModel.findOne({ documentId: req.params.id });
        return callback(null, document);

    } catch (error) {
        return callback(error);

    }

}


module.exports = {
    createDocument,
    displayDocById
};

