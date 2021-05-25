const User = require("../Models/User");

const isAdmin = (req, res, next) => {
    try {
        if (req.user.role == "admin") {
            next();
        } else {
            res.json({
                message: "Not an admin user"
            });
        }
    }
    catch (error) {
        res.json({
            message: "Error"
        })
    }
}
module.exports = isAdmin;