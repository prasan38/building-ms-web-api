const Ticket = require("../Models/Ticket");
const moment = require("moment");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const index = (req, res, next) => {
    if (req.user.role === 'tenant') {
        Ticket.find({ created_by: req.user.id })
            .then(ticket => {
                res.json({
                    message: "successfull",
                    status: "200",
                    ticket: ticket
                });
            })
            .catch(err => {
                res.json({
                    message: "error"
                })
            })
    } else {
        Ticket.find()
            .then(ticket => {
                res.json({
                    message: "successfull",
                    status: "200",
                    ticket: ticket
                });
            })
            .catch(err => {
                res.json({
                    message: "error"
                })
            })
    }
}

const create = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    var upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        let ticket = new Ticket({
            title: req.body.title,
            urgency: req.body.urgency,
            description: req.body.description,
            issue_date: moment(),
            created_by: req.user.id,
            status: req.body.status,
            image: req.file.filename
        });
        ticket.save()
            .then(ticket => {
                res.json({
                    message: "success",
                    ticket: ticket
                })

            })
            .catch(err => {
                res.json({
                    message: "error"
                })
            })
    });
}

const update = (req, res, next) => {
    Ticket.findOne({ _id: req.params.id }, function (err, ticket) {
        ticket.remarks = req.body.description;
        ticket.status = req.body.status;
        ticket.save();
    })
        .then(ticket => {
            res.json({
                message: "Ticket Updated!",
                ticket: ticket
            })
        })
        .catch(err => {
            res.json({
                message: "error"
            })
        })
}

const solvedTickets = (req, res, next) => {
    Ticket.find({ status: "INACTIVE" })
        .then(ticket => {
            res.json({
                message: "Successfull",
                status: "200",
                ticket: ticket
            })
        })
        .catch(err => {
            res.json({
                message: "error"
            })
        })
}

module.exports = { create, update, index, solvedTickets };