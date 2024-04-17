var mongoose = require("mongoose")

var Schema = mongoose.Schema

var studentModel = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model("student", studentModel)