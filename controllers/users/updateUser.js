const {dbUpdateUser} = require('../../services/userServices');

// Error messages
const payNullMsg = 'Payload is required';
const payErrMsg = 'Incorrect user payload';
const bdErrMsg = 'Data base do not accept that ID';


module.exports = async (req,res) => {
    
    const userId = req.user;
    const payload = req.body.payload;

    //No payload
    if(!payload)
        return res
            .status(400)
            .json({messageErr:payNullMsg});

    const {name,email,pswd} = payload;

    //Incorrect payload
    if(!name && !email && !pswd)
        return res
            .status(400)
            .json({messageErr:payErrMsg});

    const user = {...payload};

    //DB query
    const updtUser = await dbUpdateUser(userId,user);
    
    if (updtUser)
        //Correct result send 
        return res
            .status(200)
            .json(updtUser);
    else 
        //Null result on DB
        return res
            .status(400)
            .json({messageErr:bdErrMsg});
    
};