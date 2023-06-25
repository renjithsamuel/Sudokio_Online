const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    userId : {
        type : String
    },
    username : {
        type : String,
        required : [true , "send the username!"]
    },
    emailId : {
        type : String,
        required : [true , "send the userEmail!"]
    },
    todayScore : {
        type : Number,
    },
    totalScore : {
        type : Number
    },
    numberOfGamesPlayed : {
        type : Number
    },
    todayRanking : {
        type : Number
    },
    overallRanking : {
        type : Number
    },
    todayGameWon : {
        type : Boolean
    },
    userImgLink : {
        type : String
    },
    heart : {
        type : Number
    },
    timer : {
        type : Object
    },streak : {
        type : Number
    },gameOverToday : {
        type : Boolean
    },todayBoard : {
        type : Array
    },
    theme:  {
        type : String
    }
}, { timestamps: true }) 

module.exports = mongoose.model('users',usersSchema);