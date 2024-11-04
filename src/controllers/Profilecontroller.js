
const ProfileModel = require("../models/ProfileModel");
var jwt = require('jsonwebtoken');

exports.CreateProfile = (req, res) => {
    let reqBody = req.body;
    ProfileModel.create(reqBody)
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};

exports.UserLogin = (req, res) => {
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];
    ProfileModel.find({ UserName: UserName, Password: Password })
        .then(data => {
            if (data.length > 0) {
                // Create Auth Token
                let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0] };
                let token = jwt.sign(Payload, 'SecretKey123456789');

                res.status(200).json({ status: "success", token: token, data: data[0] });
            } else {
                res.status(401).json({ status: "unauthorized" });
            }
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};

exports.SelectProfile = (req, res) => {
    let UserName = req.headers['username'];
    ProfileModel.find({ UserName: UserName })
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};



exports.UpdateProfile = (req, res) => {
    let UserName = req.headers['username'];
    let reqBody = req.body;

    ProfileModel.updateOne({ UserName: UserName }, { $set: reqBody }, { upsert: true })
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};

//43