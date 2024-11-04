const ProfileModel = require("../models/ProfileModel");
var jwt = require('jsonwebtoken');


exports.UserLogin = async (req, res) => {
    try {
        // let reqBody = req.body;
        let UserName = req.body['UserName'];
        let Password = req.body['Password'];
        const data = await ProfileModel.find({ UserName: UserName, Password: Password });
        if (data.length > 0) {


            res.status(201).json({ status: "Success", data: data });
        }
        else {
            res.status(400).json({ status: "Failed", data: "Invalid UserName or Password" });
        }

    } catch (err) {
        res.status(400).json({ status: "Failed", data: err });
    }
}

