const documentModel = require("../models/document.model");
const crypto = require("crypto");

let title = new Date();
title = title.toDateString();

const createDocument = async (params, callback) => {
    const { createdAt, updatedAt } = params.body;

    var randomDocumentId = crypto.randomBytes(3).toString("hex");
    console.log(randomDocumentId);
    try {
        let document = documentModel({
            uid: "34343",
            createdAt: createdAt,
            updatedAt: updatedAt,
            title: title,
            documentId: randomDocumentId,
        });

        document = await document.save();

        return callback(null, document);
    } catch (error) {
        console.log(error);
        return callback(error);
    }
};

const createDocumentForAuthUser = async (params, callback) => {
    const { createdAt, updatedAt } = params.body;

    var randomDocumentId = crypto.randomBytes(3).toString("hex");
    console.log(randomDocumentId);

    try {
        let document = documentModel({
            uid: params.user,
            createdAt: createdAt,
            updatedAt: updatedAt,
            title: title,
            documentId: randomDocumentId,
        });

        document = await document.save();

        return callback(null, document);
    } catch (error) {
        console.log(error);
        return callback(error);
    }
};
const deleteDocumentForAuthUser = async (params, callback) => {
    const { documentId } = params.body;

    try {
        let isDocumentExist = await documentModel.findOne({ documentId: documentId, uid: params.user });

        if (isDocumentExist) {
            let document = await documentModel.findOneAndDelete({
                uid: params.user,
                documentId: documentId,
            });
            return callback(null, document);
        }

        return callback({ 'message': 'No Document Found!' });


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
};
const displayDocOfAuthuser = async (req, callback) => {
    try {
        let document = await documentModel.find({ uid: req.user });
        return callback(null, document);
    } catch (error) {
        return callback(error);
    }
};

module.exports = {
    createDocument,
    displayDocById,
    createDocumentForAuthUser,
    displayDocOfAuthuser,
    deleteDocumentForAuthUser,
};
