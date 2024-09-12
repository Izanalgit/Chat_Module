const {genToken} = require('../../utils/jwtAuth');
const {dbFindUserLogIn} = require('../../services/userServices');
const {saveToken,findToken} = require('../../services/tokenServices');

// Error messages -> errMsgs to OBJ on config REFACT!
const payNullMsg = 'Payload is required';
const payErrMsg = 'Incorrect login payload , required : {name,pswd}';
const sesErrMsg = 'Already loged';
const bdErrMsg = 'Incorrect user credentials';
const apiErrMsg = 'Server token error';

module.exports = async (req,res) => {

    const payload = req.body.payload;

    //No payload check
    if(!payload)
        return res
            .status(400)
            .json({messageErr:payNullMsg});

    const {email,pswd} = payload;

    //Incorrect payload check
    if(!email || !pswd)
        return res
            .status(400)
            .json({messageErr:payErrMsg});

        
    //User check
    const user = await dbFindUserLogIn(email,pswd);
    if(!user)
        return res
            .status(401)
            .json({messageErr:bdErrMsg});

    
    //Check if there is a token allready from the user
    const tokenSaved = await findToken (user._id);
    if(tokenSaved) 
        return res
            .status(409)
            .json({messageErr:sesErrMsg});
    
    //Generate token
    const token = genToken(user._id);
    const tokenDB = await saveToken(user._id,token);
    if(!tokenDB) return res
            .status(500)
            .json({messageErr:apiErrMsg}); 

    console.log('SESSION UPDATED - LOGIN : ',user.name);

    res
        .status(200)
        .headers('Authorization',token)
        .json({
            user:user.name,
            message:'Succes on login!'
        })

}