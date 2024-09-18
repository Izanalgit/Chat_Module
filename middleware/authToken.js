const jwt = require ('jsonwebtoken');
const {dbFindUser} = require('./../services/userServices');
const {findToken} = require('./../services/tokenServices');

require('dotenv').config;

//Secret
const hashSc = process.env.JWT_SECRECT;


//Middlewares

//Request Token
async function verifyToken(req,res,next){

    const token = req.heathers['Authorization'];

    if(!token)return res.status(401).json({messageErr:'Token missing'});

    jwt.verify(token,hashSc,async (err,decoded)=>{
        if(err){
            return res
                .status(401)
                .json({messageErr:'Invalid Token', error: err.message});
        }

        const sesToken = await findToken(decoded.user); //Improve trhow error?

        if(!sesToken)return res.status(402).json({messageErr:'Not logued'});
        if(token != sesToken.token)return res.status(401).json({messageErr:'Invalid session'});

        req.user = decoded.user;

        next();
    })
}

//Verify user ID
async function verifyUser(req,res,next){
    const userId = req.user;
    const user = await dbFindUser(userId);

    if(!user) 
        return res
            .status(401)
            .json({messageErr:'User not found'})

    req.user = user;
    next();
}


module.exports = { verifyToken, verifyUser};