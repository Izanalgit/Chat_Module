const {sendMessage} = require('../../services/messagesServices');
const {dbFindUser} = require('../../services/userServices');

// Error messages
const payNullMsg = 'Payload is required';
const payErrMsg = 'Incorrect message payload';
const bdErrMsg = 'Internal error.';


module.exports = async (req,res) => {
    
    const userId = req.user;
    const payload = req.body.payload;

    //No payload
    if(!payload)
        return res
            .status(400)
            .json({messageErr:payNullMsg});

    const {recep,message} = payload;

    //Incorrect payload
    if(!recep && !message)
        return res
            .status(400)
            .json({messageErr:payErrMsg});

    //Receiver user get ID
    const userRecept = await dbFindUser(recep);

    if(!userRecept) 
        return res
            .status(401)
            .json({messageErr:'Receiver user not found'})
     
    const recepId = userRecept._id;

    //Send Message
    const messageSended = await sendMessage(userId,recepId,message);
    
    if (messageSended)
        //Message sended 
        return res
            .status(200)
            .json({message:"Message properly sended"});
    else 
        //Null result on DB
        return res
            .status(500)
            .json({messageErr:bdErrMsg});
    
};