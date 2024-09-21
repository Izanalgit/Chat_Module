const {readMessages} = require('../../services/messagesServices');
const {dbFindUser} = require('../../services/userServices');

// Error messages
const payNullMsg = 'Payload is required';
const payErrMsg = 'Incorrect search payload';
const bdErrMsg = 'Internal error';


module.exports = async (req,res) => {
    
    const userId = req.user;
    const payload = req.body.payload;

    //No payload
    if(!payload)
        return res
            .status(400)
            .json({messageErr:payNullMsg});

    const {contact} = payload;

    //Incorrect payload
    if(!contact)
        return res
            .status(400)
            .json({messageErr:payErrMsg});

    //Contact user get ID
    const userContact = await dbFindUser(contact);

    if(!userContact) 
        return res
            .status(401)
            .json({messageErr:'Contact user not found'})
     
    const contactId = userContact._id;

    //Read messages
    const messages = await readMessages(userId,contactId);
    
    if (messages)
        //Messages
        return res
            .status(200)
            .json({messages}); //RAW CONTECT ,NEEDS WORK ON SERVICES !!
    else 
        //Null result on DB
        return res
            .status(500)
            .json({messageErr:bdErrMsg});
    
};