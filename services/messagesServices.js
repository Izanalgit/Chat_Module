
const Message = require('../models/Message');

// Send message with ID
async function sendMessage(remit,recep,messageText) {

    const messageObjt = {remit,recep,messageText}

    try{
        const newMessage = await Message.create(messageObjt);
        return newMessage;

    }catch (err){
        console.error('DB-SEND MESSAGE ERROR : ',err);
        throw new Error ('ERROR : can not send new message');
    }
}

// Read messages from bouth IDs
async function readMessages(userID0,userID1) {

    try{

        if (!userID0 || !userID1) {
            throw new Error('ERROR : Invalid user IDs on read messages');
        }

        const messages = await Message.find({
            $or:[
                {remit:userID0,recep:userID1},
                {remit:userID1,recep:userID0}
            ]
        },).sort({createdAt: -1})
        return messages;

    }catch (err){
        console.error('DB-READ MESSAGES ERROR : ',err);
        throw new Error ('ERROR : can not read messages');
    }
}

module.exports = {sendMessage,readMessages}