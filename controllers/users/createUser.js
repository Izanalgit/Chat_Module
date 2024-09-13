const {dbCreateUser} = require('../../services/userServices');

// Error messages -> errMsgs to OBJ on config REFACT!
const payNullMsg = 'Payload is required';
const payErrMsg = 'Incorrect login payload';

module.exports =async (req,res)=>{
    let newUser;
    const payload = req.body.payload;

    //Logued check
    const sessionToken = req.user; //Middleware !!
    if(sessionToken)
        return res
            .status(409)
            .json({messageErr:'Already loged.'})

    //No payload check
    if(!payload)
        return res
            .status(400)
            .json({messageErr:payNullMsg});

    const {name,email,pswd} = payload;

    //Incorrect payload check
    if(!name || !email || !pswd)
        return res
            .status(400)
            .json({messageErr:payErrMsg});
    
    //Create new user
    try{
        newUser = await dbCreateUser({name,email,pswd}) //catch errors from db and send to client??
    }catch(err){
        return res
            .status(401)
            .json({messageErr:err})        
    }

    //Check created user
    if(!newUser) 
        return res
            .status(500)
            .json({messageErr: 'Something is wrong here.'});

    //Log and response
    res
        .status(201)
        .json(newUser);

}