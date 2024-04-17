var mongoose = require("mongoose")

var Schema = mongoose.Schema

var leaveModel = new Schema({
    name:String,
    startDate: Date,
    endDate: Date,
    reason: String
})

module.exports = mongoose.model("leave", leaveModel)