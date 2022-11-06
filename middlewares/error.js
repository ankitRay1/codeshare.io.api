function errorHandler(err, req, res, next) {
    switch (err) {
        case typeof err === "string":
            // custom application error
            return res.status(400).json({ message: err.message });

        case err.name === "ValidationError":
            // mongoose validation error
            return res.status(400).json({ message: err.message });

        case err.name == "UnauthorizedError":
            // jwt authentication error
            return res.status(401).json({ message: "Token not valid!" });

        default:
            // default to 500 server error
            return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    errorHandler
};