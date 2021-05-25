const User = require("../Models/User");
const jwt = require("jsonwebtoken");


const authenticated = (req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "*");
try{
 const token = req.headers.authorization.split(' ')[1]
   //const token = req.body.token.split(' ')[1];
    const decoded = jwt.verify(token, 'secretValue', function(err, decoded) {
        if(err){
            res.json({
                error:err
            })
        }
        else{
            req.user = jwt.decode(token, 'secretValue');
            next();
        }
    });
}catch(error){
    res.json({
        message: "Authentication Failed!"
    })
}

}

module.exports = authenticated;