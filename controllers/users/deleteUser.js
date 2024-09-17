const {dbFindUserLogIn} = require('../../services/userServices');
const {cleanToken} = require('../../services/tokenServices');

//NEEDS TO REVIEW AND IMPROVE !!!

module.exports = async (req,res) => {
    const {email,pswd} = req.body.payload;
    const userId = req.user;
    let user;
    let userDel;

    //Search user
    try{
        user = await dbFindUserLogIn(email,pswd);
    }catch(err){
        return res
            .status(401)
            .json({messageErr:err});
    }

    //Check user
    if(!user) return res
        .status(401)
        .json({messageErr:'Invalid credentials.'})


    //Check if is same user
    if(userId != user._id) {
        console.log(`ID ${userId} attepts to erase ${user._id}`);
        return res
            .status(401)
            .json({messageErr:'Invalid user.'})
    }
    
    //Delete user
    try{
        userDel = await dbDeleteUser(userId)
    }catch(err){
        return res
            .status(401)
            .json({messageErr:err});
    }

    //Log
    console.log(userDel.name,' deleted'); //IMPROVE!
    
    //Destroy session
    try{
        const tokenDel = await cleanToken(userId) //for loggin?
    }catch(err){
        return res
            .status(401)
            .json({message:err});
    }

    res.status(200)
        .json({message:`Farewell ${user.name}!`});
}