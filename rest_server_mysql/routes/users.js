var express = require('express');
var router = express.Router();
var db = require('../services/db');

var routes = function () {
    router.post('/instructor/login', function(req, res, next) {

        var username = req.body.username;
        var pw = req.body.pw;

        var query = `select * from users where username = '${username}' and password = '${pw}' and role_id = 1`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.status(500).json([{success: false, message: err.message}]);
            } else {
                if(rows.length == 0){
                    /*If you are creating api then get response in json format*/
                    res.status(200).json([{success: false, data: rows}]);
                } else {
                    res.status(200).json([{success: true, data: rows}]);
                }
            }
            

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    router.post('/instructor/register', function(req, res, next) {

        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        var query = `insert into users (username, password, email, role_id) values ('${name}', '${password}', '${email}', 1)`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.status(500).json({success: false, data: err.message});
            } else {
                /*If you are creating api then get response in json format*/
                res.status(200).json({success:true, data: rows});
            }
            

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    router.get('/student/login/:email/:pw', function(req, res, next) {

        var email = req.params.email;
        var pw = req.params.pw;

        var query = `select * from users where email = '${email}' and password = '${pw}' and role_id = 2`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.send({success: false, data: err.message});
            } else {
                /*If you are creating api then get response in json format*/
                res.json({success:true, data: rows});
            }
            

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    router.get('/student/register/:name/:email/:contact/:password', function(req, res, next) {

        var name = req.params.name;
        var email = req.params.email;
        var contact = req.params.contact;
        var password = req.params.password;

        var query = `insert into users (username, password, email) values ('${name}', '${password}', '${email}')`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.json({success: false, data: err.message});
            } else {
                /*If you are creating api then get response in json format*/
                res.json({success:true, data: rows});
            }
            

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    return router;
}

module.exports = routes();