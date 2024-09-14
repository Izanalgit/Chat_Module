const {cleanToken,findToken} = require('../../services/tokenServices');
const {dbFindUser} = require('../../services/userServices');

// Error messages -> errMsgs to OBJ on config REFACT!
const payNullMsg = 'Payload is required';
const sesErrMsg = 'Not loged yet';
const apiErrMsg = 'Server token error';
const bdErrMsg = 'Incorrect user credentials';

module.exports = async (req,res) => {

    const userId = req.user;  //headers Auth from middleware

    //No payload
    if(!userId)
        return res
            .status(400)
            .json({messageErr:payNullMsg});

    //User check
    const user = await dbFindUser(userId);
    if(!user)
        return res
            .status(401)
            .json({messageErr:bdErrMsg});

    //Check if there is a token from the user
    const tokenSaved = await findToken (userId);
    if(!tokenSaved) 
        return res
            .status(409)
            .json({messageErr:sesErrMsg});

    //Delete session token
    const tokenClean = await cleanToken (userId);
    if(!tokenClean) 
        return res
            .status(500)
            .json({messageErr:apiErrMsg});

    console.log('SESSION UPDATED - LOGOUT : ', userId);

    res
        .status(200)
        .json({
            message:'Succes on logout!'
        })

}