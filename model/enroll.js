var mongoose = require("mongoose")

var Schema = mongoose.Schema

var enrollModel = new Schema({
    rgnum:String,
    name: String,
    email: String,
    password: String,
    phone:String,
    status: { type: String, enum: ['active', 'blocked'], default: 'active' }
})

module.exports = mongoose.model("enroll", enrollModel)