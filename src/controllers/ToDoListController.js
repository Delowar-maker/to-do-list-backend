// const ToDoListModel = require("../models/ToDoListModel");

// exports.CreateToDo = (req, res) => {
//     let reqBody = req.body;
//     let TodoSubject = reqBody['TodoSubject'];
//     let TodoDescription = reqBody["TodoDescription"];
//     let UserName = req.headers['username'];
//     let TodoStatus = "New";
//     let TodoCreateDate = Date.now()
//     let TodoUpdateDate = Date.now()

//     let PostBody = {
//         UserName: UserName,
//         TodoSubject: TodoSubject,
//         TodoDescription: TodoDescription,
//         TodoStatus: TodoStatus,
//         TodoCreateDate: TodoCreateDate,
//         TodoUpdateDate: TodoUpdateDate
//     }
//     ToDoListModel.create(PostBody)
//         .then(data => {
//             res.status(200).json({ status: "success", data: data });
//         })
//         .catch(err => {
//             res.status(400).json({ status: "fail", data: err });
//         });
// };

const ToDoListModel = require("../models/ToDoListModel");

exports.CreateToDo = (req, res) => {
    const { TodoSubject, TodoDescription } = req.body;
    const UserName = req.headers['username'];
    const currentDate = Date.now();

    const PostBody = {
        UserName,
        TodoSubject,
        TodoDescription,
        TodoStatus: "New",
        TodoCreateDate: currentDate,
        TodoUpdateDate: currentDate
    };

    ToDoListModel.create(PostBody)
        .then(data => res.status(200).json({ status: "success", data }))
        .catch(err => res.status(400).json({ status: "fail", data: err }));
};

exports.SelectToDo = (req, res) => {
    const UserName = req.headers['username'];

    ToDoListModel.find({ UserName })
        .then(data => {
            res.status(200).json({ status: "success", data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};


exports.UpdateToDo = (req, res) => {
    const { TodoSubject, TodoDescription, _id } = req.body;
    const TodoUpdateDate = Date.now();

    const PostBody = {
        TodoSubject,
        TodoDescription,
        TodoUpdateDate
    };

    ToDoListModel.updateOne({ _id }, { $set: PostBody }, { upsert: true })
        .then(data => res.status(200).json({ status: "success", data }))
        .catch(err => res.status(400).json({ status: "fail", data: err }));
};


exports.UpdateStatusToDo = (req, res) => {
    const { TodoStatus, _id } = req.body;
    const TodoUpdateDate = Date.now();

    const PostBody = {
        TodoStatus,
        TodoUpdateDate
    };

    ToDoListModel.updateOne({ _id }, { $set: PostBody }, { upsert: true })
        .then(data => res.status(200).json({ status: "success", data }))
        .catch(err => res.status(400).json({ status: "fail", data: err }));
};

exports.RemoveToDo = (req, res) => {
    const { _id } = req.body;

    ToDoListModel.deleteOne({ _id })
        .then(data => res.status(200).json({ status: "success", data }))
        .catch(err => res.status(400).json({ status: "fail", data: err }));
};

exports.SelectToDoByStatus = (req, res) => {
    const UserName = req.headers['username'];
    const { TodoStatus } = req.body;

    ToDoListModel.find({ UserName, TodoStatus })
        .then(data => res.status(200).json({ status: "success", data }))
        .catch(err => res.status(400).json({ status: "fail", data: err }));
};

exports.SelectToDoByDate = (req, res) => {
    const UserName = req.headers['username'];
    const { FormDate, ToDate } = req.body;

    ToDoListModel.find({
        UserName,
        TodoCreateDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) }
    })
        .then(data => res.status(200).json({ status: "success", data }))
        .catch(err => res.status(400).json({ status: "fail", data: err }));
};
