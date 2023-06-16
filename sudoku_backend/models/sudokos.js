const mongoose = require('mongoose');

const sudokoSchema = mongoose.Schema({
    board : {
        type : Array,
    },
    date : {
        type : String
    }
}, { timestamps: true }) 

module.exports = mongoose.model('sudokos',sudokoSchema);