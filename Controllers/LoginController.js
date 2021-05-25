const User = require("../Models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "*");
let email = req.body.email;
let password = req.body.password;

User.findOne({email:email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let payload = {
                        name: user.name,
                        id: user._id,
                        role: user.role
                    }
                    let token = jwt.sign(payload, "secretValue", {expiresIn: '24h'});
                    res.json({
                        message: "Login Successfull",
                        token,
                        status:"200",
                        name: user.name,
                        email: user.email,
                        role: user.role 
                    });
                }else{
                    res.json({
                        status:"false",
                        message: "Password does not match"
                    })
                }
            })
        }else{
            res.json({
                status: "false",
                message: "No User found"
            })
        }
    })

}


const register = (req, res, next) => {

    
    hashedPass = bcrypt.hashSync(req.body.password, 10, function(err, hashedPass) {
        if(err){
            res.json({
                error:err
            })
        }
    })

    console.log(hashedPass);

    let user = new User({
        name: req.body.name,
        email: req.body.name,
        phone: req.body.phone,
        password: hashedPass
    });

    user.save()
    .then(user => {
        res.json({
            message: "success"
        })
        
    })
    .catch(err => {
        res.json({
            message: "error"
        })
    })

    
} 

module.exports = { login, register };