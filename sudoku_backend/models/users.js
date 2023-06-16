const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
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
    }
}, { timestamps: true }) 

module.exports = mongoose.model('users',usersSchema);