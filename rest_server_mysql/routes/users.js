var express = require('express');
var router = express.Router();
var db = require('../services/db');

var routes = function () {
    router.get('/instructor/login', function(req, res, next) {

        var username = req.body.username;
        var pw = req.body.pw;

        var query = `select * from users where username = '${username}' and password = '${pw} where role_id = 1'`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.send(err.message);
            }
            /*If you are creating api then get response in json format*/
            res.json(rows);

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    router.get('/student/login', function(req, res, next) {

        var username = req.body.username;
        var pw = req.body.pw;

        var query = `select * from users where username = '${username}' and password = '${pw} where role_id = 2'`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.send(err.message);
            }
            /*If you are creating api then get response in json format*/
            res.json(rows);

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    return router;
}

module.exports = routes();