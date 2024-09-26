const jwt = require ('jsonwebtoken');

//Token generator
function genToken(user){
    const payload = {user: user._id};
    return jwt.sign(payload,process.env.JWT_SECRECT,{expiresIn:'2h'});
}

module.exports = {genToken}