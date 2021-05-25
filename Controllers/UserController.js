
const User = require("../Models/User");


const show = (req, res, next) => {

    // if(req.params.id !== req.user.id){
    //     res.json({
    //         message: "Permission Denied",
    //         status: 403
    //     });
    // }

    User.find({_id: req.params.id})
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