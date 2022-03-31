var express = require('express');
var router = express.Router();
var db = require('../services/db');


var routes = function () {
    //Get all questions from topic
    router.get('/topic/:topic_id', function(req, res, next) {

        var topic_id = req.params.topic_id;

        var query = `select * from questions where topic_id = ${topic_id}`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.send(err.message);
            } else {
                if(rows.length == 0) {
                    res.status(200).json([{message: `No questions found for topic with the id of ${topic_id}`}]);
                } else 
                    res.json(rows);
            }
            /*If you are creating api then get response in json format*/
            // res.json(rows);

            /*If you want response as json then comment below line*/
            // res.render('items', { title: 'Items', items: rows});
        })
    });

    //Get necessary data for specific question for the session 
    router.get('/:session_id/:question_id', function(req, res, next) {

        var session_id = req.params.session_id;
        var question_id = req.params.question_id;

        var query = `select q.question_no, q.description as question, a.option, a.description as answer, a.isCorrect from questions as q inner join topics as t on q.topic_id = t.topic_id inner join answers as a
        on a.question_id = q.question_id where t.session_id = ${session_id} and a.question_id = ${question_id}`;
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

    //Insert new question for specific topic 
    router.post('/', function(req, res, next) {
        
        var user_id = req.body.user_id;
        var topic_id = req.body.topic_id;
        var question_no = req.body.question_no;
        var description = req.body.description;

        var checkUser = `select count(*) as exist from users as u inner join roles as r on u.role_id = r.role_id where r.name = "Instructor" and u.user_id = ${user_id}`;
        var query = `insert into questions (topic_id, question_no, description) values ('${topic_id}', '${question_no}', '${description}')`;
        db.query(checkUser, function(err, rows, fields) {
            if (err) {
                res.status(500).json({error: err});
            } else {
            /*If you are creating api then get response in json format*/
                if(rows[0].exist == 1){
                    db.query(query, function(err, rows, fields){
                        if(err){
                            db.rollback();
                            res.status(500).json({error: err});
                        } else
                            res.status(200).json({message: "Question inserted successfully!"});
                    });
                } else 
                    res.status(500).json({error: rows[0]});
                // res.status(200).json({message: "Topic inserted successfully!"});
            }
        })
    });

    //Update the question description of the specific topic by author
    router.put('/:topic_id/:question_no', function(req, res, next) {

        var user_id = req.body.user_id;
        var topic_id = req.params.topic_id;
        var question_no = req.params.question_no;
        var description = req.body.description;

        var query = `update questions set description = '${description}' where topic_id = ${topic_id} and question_no = ${question_no} and user_id = ${user_id}`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                db.rollback();
                res.status(500).json({error: err});
            } else {
                if(rows.affectedRows == 0)
                    res.status(500).json({message: rows.message});
                else
                    res.status(200).json({message: "Question updated successfully!", rows: rows});
            }
        })
    });

    //Delete the question of the specific topic by author
    router.delete('/:topic_id/:question_no', function(req, res, next) {

        var user_id = req.body.user_id;
        var topic_id = req.params.topic_id;
        var question_no = req.params.question_no;

        var query = `delete from questions where topic_id = ${topic_id} and question_no = ${question_no} and user_id = ${user_id}`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                db.rollback();
                res.status(500).json({error: err});
            } else {
                if(rows.affectedRows == 0)
                    res.status(500).json({message: "Question deletion failed!"});
                else
                    res.status(200).json({message: "Question deleted successfully!", rows: rows});
            }
        })
    });

    return router;
}

module.exports = routes();