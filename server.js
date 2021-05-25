const express = require("express");
const app = express();
const cors = require('cors'); //Require Cors

const mongoose = require("mongoose");

const AppRoute = require("./app_route");

const fs = require("fs");
var bodyParser = require("body-parser");



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("uploads"));

// the url for mongodb is not the correct url, it is just for an example
const uri = "mongodb+srv://cluster1:cluster1@cluster.obm6h.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});


db.once("open", () => {
  console.log("Database connected Successfully");
});


app.use("/api", AppRoute);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});




app.listen(3000, function () {
  console.log("Server is running on port: 3000");
});
