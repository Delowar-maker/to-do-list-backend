const ProfileModel = require("../models/ProfileModel");


exports.CreateProfile = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await ProfileModel.create(reqBody);
        res.status(201).json({ status: "Success", data: data });
    } catch (err) {
        res.status(400).json({ status: "Failed", data: err });
    }
}

