var express = require('express');
var router = express.Router();
var db = require('../services/db');

var routes = function () {
    router.get('/', function(req, res, next) {

        var user_id = req.body.user_id;
        var query = 'select * from topics where user_id = ' + user_id;
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

    router.post('/', function(req, res, next) {

        var user_id = req.body.user_id;
        var name = req.body.name;
        var query = `insert into topics (user_id, name) values ('${user_id}', '${name}')`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                db.rollback();
                res.status(500).json({error: err});
            } else
            /*If you are creating api then get response in json format*/
                res.status(200).json({message: "Topic inserted successfully!"});

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
                    res.status(200).json({message: "Topic updated successfully!", rows: rows});
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
                res.status(500).json({error: err});
            } else {
                if(rows.affectedRows == 0)
                    res.status(500).json({message: "Topic deletion failed!"});
                else
                    res.status(200).json({message: "Topic deleted successfully!", rows: rows});
            }
        })
    });

    return router;
}

module.exports = routes();