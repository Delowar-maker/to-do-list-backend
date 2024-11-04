const mongoose = require('mongoose')


const ProfileSchema = mongoose.Schema({
    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { type: String },
    MobileNumber: { type: String },
    City: { type: String },
    UserName: { type: String, unique: true },
    Password: { type: String }

}, { versionKey: false })

const ProfileModel = mongoose.model("Profile", ProfileSchema)

module.exports = ProfileModel;