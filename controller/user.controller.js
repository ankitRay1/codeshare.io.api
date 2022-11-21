const userRepository = require('../repository/user.repository');

const getUser = (req, res, next) => {
    userRepository.getUser(req, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            message: "User Retrived Successfully",
            data: results,
        });
    });
};

const signInUser = (req, res, next) => {

    userRepository.signInUser(req, (error, results) => {

        if (error) return next(error);


        return res.status(200).send({ message: "User is signed successfully!", data: results });
    });
}
module.exports = {

    getUser,
    signInUser

}