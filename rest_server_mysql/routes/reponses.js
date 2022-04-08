var express = require('express');
var router = express.Router();
var db = require('../services/db');


var routes = function () {
    //Get answers from the specific question
    router.get('/insert/:question_id/:user_id/:choice/:session_id', function(req, res, next) {

        var session_id = req.params.session_id;
        var choice = req.params.choice;
        var question_id = req.params.question_id;
        var user_id = req.params.user_id;

        var query = `insert into responses (question_id, user_id, choice, session_id) values (${question_id}, ${user_id}, '${choice}', ${session_id})`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.status(500).json({success: true, data: err.message});
            } else {
                res.status(200).json({success: true, value: "responses", data: rows});
            }
        })
    });

    return router;
}

module.exports = routes();