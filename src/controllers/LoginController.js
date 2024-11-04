const ProfileModel = require("../models/ProfileModel");
var jwt = require('jsonwebtoken');


exports.UserLogin = async (req, res) => {
    try {
        // let reqBody = req.body;
        let UserName = req.body['UserName'];
        let Password = req.body['Password'];
        const data = await ProfileModel.find({ UserName: UserName, Password: Password });
        if (data.length > 0) {
            //Jwt
            let Payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: data[0]
            }

            let Token = jwt.sign(Payload, "SecretKey123");

            res.status(201).json({ status: "Success", data: data, Token: Token });
        }
        else {
            res.status(400).json({ status: "Failed", data: "Invalid UserName or Password" });
        }

    } catch (err) {
        res.status(400).json({ status: "Failed", data: err });
    }
}

// exports.UserLogin = async (req, res) => {
//     try {

//         let UserName = req.body['UserName'];
//         let Password = req.body['Password'];
//         ProfileModel.find({ UserName: UserName, Password: Password }, (err, data) => {
//             if (err) {
//                 res.status(400).json({ status: "Failed", data: err });
//             }
//             else {
//                 if (data.length > 0) {
//                     let Payload = {
//                         exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
//                         data: data[0]
//                     }

//                     let Token = jwt.sign(Payload, "SecretKey123");

//                     res.status(201).json({ status: "Success", data: data[0], Token: Token });
//                 }
//                 else {
//                     res.status(400).json({ status: "Failed", data: "Invalid UserName or Password" });
//                 }
//             }

//         })

//     } catch (err) {
//         res.status(400).json({ status: "Failed", data: err });
//     }


// }
