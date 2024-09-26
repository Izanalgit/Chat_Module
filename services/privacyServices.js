const User = require('../models/User');

async function addBloquedUser (userId, blockUserId){
    try{
        await User.findByIdAndUpdate(userId,{
            $addToSet: {blockedUsers : blockUserId}
        })
    }catch (err){
        console.error('DB-BLOCK USERS ERROR : ',err);
        throw new Error ('ERROR : can not block that user');
    }
}

async function removeBloquedUser (userId, blockUserId) {
    try{
        await User.findByIdAndUpdate(userId,{
            $pull: {blockedUsers : blockUserId}
        })
    }catch (err){
        console.error('DB-UNBLOCK USERS ERROR : ',err);
        throw new Error ('ERROR : can not unblock that user');
    }
}

async function getBloquedUser(userId) {
    try{

        const user = await User.findById(userId)
            .select('blockedUsers')
            .populate('blockedUsers', 'name');

        return user.blockedUsers;

    }catch (err){
        console.error('DB-UNBLOCK USERS ERROR : ',err);
        throw new Error ('ERROR : can not unblock that user');
    }
}

module.exports = {
    addBloquedUser,
    removeBloquedUser,
    getBloquedUser
}