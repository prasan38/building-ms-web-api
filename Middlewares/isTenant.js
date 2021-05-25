const User = require("../Models/User");

const isTenant = (req, res, next) => {
    try {
        if (req.user.role == "tenant") {
            next();
        } else {
            res.json({
                message: "Not a tenant user"
            });
        }
    }
    catch (error) {
        res.json({
            message: "Error"
        })
    }
}

module.exports = isTenant;