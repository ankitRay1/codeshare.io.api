const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signInUser = async (req, callback) => {
    // if (
    //     (req.email == "" && req.name == "") ||
    //     (req.email == undefined && req.name == undefined)
    // ) {
    //     return callback({ message: "Email and name must be provided!" });
    // }

    try {
        const { name, email, profilePic } = req.body;

        let user = await UserModel.findOne({ email: email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

            return callback(null, { user, token });
        }

        if (!user) {
            user = UserModel({ name: name, email: email, profilePic: profilePic });

            user = await user.save();

            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

            return callback(null, { user, token });
        }
    } catch (error) {
        console.log(error);
        return callback(error);
    }
};

const getUser = async (params, callback) => {

    try {
        console.log(params.user);
        const user = await UserModel.findById(params.user);

        return callback(null, { user, token: params.token });

    } catch (error) {
        return callback(error);

    }
}
module.exports = {
    signInUser,
    getUser
};
