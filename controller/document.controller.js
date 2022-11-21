const documentRepository = require("../repository/document.repository");
const createDocument = (req, res, next) => {
    documentRepository.createDocument(req, (error, results) => {
        if (error) return next(error);

        return res.status(200).send({
            message: "Document has been created Successfully!",
            data: results,
        });
    });
};
const createDocumentForAuthUser = (req, res, next) => {
    documentRepository.createDocumentForAuthUser(req, (error, results) => {
        if (error) return next(error);

        return res.status(200).send({
            message: "Document has been created Successfully!",
            data: results,
        });
    });
};
const deleteDocumentForAuthUser = (req, res, next) => {
    documentRepository.deleteDocumentForAuthUser(req, (error, results) => {
        if (error) return next(error);

        return res.status(200).send({
            message: "Document has been deleted Successfully!",
            data: results,
        });
    });
};

const displayDocById = (req, res, next) => {

    documentRepository.displayDocById(req, (error, results) => {

        if (error) return next(error);

        return res.status(200).send({ message: "Doc is feteched  successfully", data: results });
    })

}
const displayDocOfAuthuser = (req, res, next) => {


    documentRepository.displayDocOfAuthuser(req, (error, results) => {

        if (error) return next(error);

        return res.status(200).send({ message: "User Doc is feteched  successfully", data: results });
    })

}



module.exports = {
    createDocument,
    displayDocById,
    createDocumentForAuthUser,
    deleteDocumentForAuthUser,
    displayDocOfAuthuser

};
