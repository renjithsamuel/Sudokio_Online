const Sudokos = require('../models/sudokos');
const Users = require('../models/users');

// Board controller
exports.getBoard = async ( req , res , next ) => {
    try {
        const board = await Sudokos.find();
        return res.status(200).json({
            success : true,
            data  : board , 
            count : board.length
        })
    }catch(err){
        return res.status(500).json({
            success : false , 
            error : "Internal server error " + err 
        })
    }
}

// create board in 12 noon : 
exports.postBoard = async (req,res,next) => {
    if(req.body.board==null || req.body.date==null)
        return res.status(400).json({
        success : false,
        error : "send correct values!"
    })
    try{
        const board = await Sudokos.create(req.body);
        if(board == null){
            return res.status(400).json({
                success : false,
                error : "something went wrong!"
            })
        }
        return res.status(200).json({
            success : true,
            data : board,
            count : board.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            error : "Internal server error "+ err
        })
    }
}

// User controller
exports.getUsers = async (req,res,next) =>{
    try{
        const users = await Users.find();
        if(!users){
            return res.status(400).json({
                success : false ,
                error : "Something went wrong!",
            })
        }
        return res.status(200).json({
            success : true ,
            data : users,
            count : users.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            error : "Internal server error "+ err
        })
    }
}

exports.postUser = async (req,res,next) =>{
    if(req.body.username == null || req.body.emailId == null){
        return res.status(400).json({
            success : false,
            error : "send correct values!"
        })
    }
    try{
        const totalNumberOfUsers = await Users.estimatedDocumentCount();
        const obj = {
            username  : req.body.username,
            emailId : req.body.emailId , 
            todayScore : 0,
            totalScore : 0,
            numberOfGamesPlayed : 0,
            todayRanking : 0,
            overallRanking : totalNumberOfUsers,
        }
        const user = await Users.create(obj);
        if(!user){
            return res.status(400).json({
                success : false,
                error : "something went wrong "
            })
        }
        return res.status(200).json({
            success : true,
            data : user
        })
    }catch(err){
        return res.status(500).json({
            success: false ,
            error : "Internal server error ",err
        })
    }
}


exports.patchUser = async (req,res,next) =>{
    const Id = req.params.id;
    if(Id==null)return res.status(400).send("send valid id of user!");
    if(req.body.username==null && req.body.emailId==null && req.body.todayScore==null && req.body.totalScore==null && req.body.numberOfGamesPlayed==null && req.body.todayRanking ==null && req.body.overallRanking==null){
        return res.status(400).json({
            success : false,
            error : "send any one valid data to update!"
        })
    }
    try{
        const userOldObj = await Users.findById(Id);
        const obj = {
            username  : req.body.username || userOldObj.username,
            emailId : req.body.emailId || userOldObj.emailId, 
            todayScore : req.body.todayScore || userOldObj.todayScore,
            totalScore : req.body.todayScore || userOldObj.totalScore,
            numberOfGamesPlayed : req.body.numberOfGamesPlayed || userOldObj.numberOfGamesPlayed,
            todayRanking : req.body.todayRanking || userOldObj.todayRanking,
            overallRanking : req.body.overallRanking || userOldObj.overallRanking,
        }
        const user = await Users.findByIdAndUpdate(Id , obj, {new:true});
        if(!user){
            return res.status(400).json({
                success : false,
                error : "something went wrong!"                
            })
        }
        return res.status(200).json({
            success : true,
            data : user,
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            error : "Internal server error!" + err
        })
    }
}

    exports.deleteUserById = async (req,res,next) => {
        const Id = req.params.id;
        const user = await Users.findById(Id);
        if(!user){
            return res.status(404).json({
                success : false,
                error : "Cannot find user!"
            })
        }
        try{
            const deleteData = await Users.findByIdAndDelete(Id);
            if(!deleteData){
                return res.status(400).json({
                    success : false,
                    error : "something went wrong!"
                })
            }
            return res.status(200).json({
                success : true,
                data : deleteData,
            })
        }catch(err){
            return res.status(500).json({
                success : false,
                error : "Internal server error!"
            })
        }
    }
