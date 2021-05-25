const User = require("../Models/User");


const show = (req, res, next) => {
    User.find({ _id: req.params.id })
        .select('name role email phone')
        .exec()
        .then(user => {
            res.json({
                message: "successfull",
                status: "200",
                user: user
            })
        })
        .catch(err => {
            res.json({
                message: "error"
            })
        })
}

module.exports = { show };