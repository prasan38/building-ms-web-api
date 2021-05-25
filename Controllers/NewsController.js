const News = require("../Models/News");
const moment = require("moment");
const User = require("../Models/User");

const jwt = require("jsonwebtoken");


const index = (req, res, next) => {
    News.find()
    .then(news=> {
        res.json({
            message: "Successfull",
            status: "200",
            news: news
        })
    })
    .catch(err => {
        res.json({
            message: "error"
        })
    })
}

const create = (req, res, next) => {
    let news = new News( {
        title: req.body.title,
        description: req.body.description,
        created_date: moment(),
        created_by: req.user.id 
    });

    news.save()
    .then(news => {
        res.json({
            message: "success",
            news: news
        })
    })
    .catch(err => {
        res.json({
            message: "error"
        })
    })
}

const update = (req, res, next) => {
    News.findOne({_id: req.params.id}, function(err, news) {
        news.title = req.body.title;
        news.description = req.body.description;
        news.save();
    })
    .then(news => {
        res.json({
            message: "News Updated!",
            ticket: news
        })
    })
    .catch(err => {
        res.json({
            message: "error"
        })
    })
}


module.exports = { create, index };