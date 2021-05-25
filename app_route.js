const express = require("express");

const router = express.Router();


const LoginController = require("./Controllers/LoginController");
const TicketController = require("./Controllers/TicketController");
const authenticated = require("./Middlewares/authenticated");
const NewsController = require("./Controllers/NewsController");
const isAdmin = require("./Middlewares/isAdmin");
const UserController = require("./Controllers/UserController");

router.post('/login',  LoginController.login);
router.post('/register',  LoginController.register);
router.post('/tickets', authenticated, TicketController.create);
router.get('/tickets', authenticated, TicketController.index);

router.post('/news', authenticated, isAdmin, NewsController.create);
router.get('/news', authenticated, NewsController.index);

router.put('/tickets/:id', authenticated, TicketController.update);

router.get('/user/:id', authenticated, UserController.show);

router.get('/solved-tickets', authenticated, TicketController.solvedTickets);

router.get('/test', function (req, res) {
    res.json({
        message: "successfull"
    })
});

module.exports = router;