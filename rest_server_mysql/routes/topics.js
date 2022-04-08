var express = require('express');
var router = express.Router();
var db = require('../services/db');

var routes = function () {
    router.get('/:user_id', function(req, res, next) {
        var user_id = req.params.user_id;
        var query = 'select * from topics where user_id = ' + user_id;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.send(err.message);
            } else {
            /*If you are creating api then get response in json format*/
                res.json(rows);
            }

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    router.get('/check/:session_id', function(req, res, next) {
        var session_id = req.params.session_id;
        var query = 'select * from topics where session_id = ' + session_id;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.status(500).json({success:true, data: err.message});
            } else {
                if(rows.length == 0){
                    res.status(200).json({success:false, data: rows});
                } else {
                    res.status(200).json({success:true, data: rows});
                }
            /*If you are creating api then get response in json format*/
                
            }

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    router.get('/no_session/:user_id', function(req, res, next) {
        var user_id = req.params.user_id;

        var query = `select * from topics where user_id = ${user_id} and not session_id or session_id is null`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.json({success: false, message: err.message});
            } else {
            /*If you are creating api then get response in json format*/
                res.json({success:true, data: rows});
            }

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    router.get('/have_session/:user_id', function(req, res, next) {
        var user_id = req.params.user_id;

        var query = `select * from topics where user_id = ${user_id} and session_id <> '' and session_id is not null`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.json({success: false, message: err.message});
            } else {
            /*If you are creating api then get response in json format*/
                res.json({success:true, data: rows});
            }

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    router.post('/', function(req, res, next) {

        var user_id = req.body.user_id;
        var name = req.body.name;
        var query = `insert into topics (user_id, name) values ('${user_id}', '${name}')`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                db.rollback();
                res.status(500).json({success:false, error: err});
            } else
            /*If you are creating api then get response in json format*/
                res.status(200).json({success:true, message: "Topic inserted successfully!"});

        })
    });

    router.put('/:id', function(req, res, next) {

        var user_id = req.body.user_id;
        var topic_id = req.params.id;
        var name = req.body.name;
        var query = `update topics set name = '${name}' where topic_id = ${topic_id} and user_id = ${user_id}`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                db.rollback();
                res.status(500).json({error: err});
            } else {
                if(rows.affectedRows == 0)
                    res.status(500).json({message: rows.message});
                else
                    res.status(200).json({message: "Topic updated successfully!", success: true, rows: rows});
            }
        })
    });

    router.delete('/:id', function(req, res, next) {

        var user_id = req.body.user_id;
        var topic_id = req.params.id;

        var query = `delete from topics where topic_id = ${topic_id} and user_id = ${user_id}`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                db.rollback();
                res.status(500).json({success: false, error: err});
            } else {
                if(rows.affectedRows == 0)
                    res.status(500).json({success: false, message: "Topic deletion failed!"});
                else {
                    res.status(200).json({success: true, message: "Topic deleted successfully!", rows: rows});
                }
                    
            }
        })
    });

    router.put('/:topic_id/start/:session_id', function(req, res, next) {

        var user_id = req.body.user_id;
        var topic_id = req.params.topic_id;
        var session_id = req.params.session_id;
        var checkQuery = `select * from topics where session_id = ${session_id} and user_id = ` + user_id;
        var query = `update topics set session_id = '${session_id}' where topic_id = ${topic_id} and user_id = ${user_id}`;

        db.query(checkQuery, function(err, rows){
            if(err){
                res.status(500).json({error: err});
            } else {
                if(rows.length >= 1)
                    res.status(500).json({message: "Duplicate Session", success: false});
                else {
                    db.query(query, function(err, rows, fields) {
                        if (err) {
                            db.rollback();
                            res.status(500).json({error: err});
                        } else {
                            if(rows.affectedRows == 0)
                                res.status(500).json({message: rows.message});
                            else
                                res.status(200).json({message: "Topic session started successfully!", success: true, rows: rows});
                        }
                    })
                } 
            }
        });
        
    });

    return router;
}

module.exports = routes();