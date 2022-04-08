var express = require('express');
var router = express.Router();
var db = require('../services/db');


var routes = function () {
    //Get answers from the specific question
    router.get('/:question_id', function(req, res, next) {

        // var session_id = req.params.session_id;
        // var topic_id = req.body.topic_id;
        var question_id = req.params.question_id;

        var query = `select a.option, description answer, isCorrect from answers a where question_id = ${question_id}`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                if(rows.length == 0) {
                    res.status(404).json({message: `No answers found for question with the id of ${question_id}`});
                } else
                    res.status(200).json(rows);
            }
        })
    });

    //Get all answers from question
    router.get('/topic/:topic_id', function(req, res, next) {

        // var session_id = req.params.session_id;
        // var topic_id = req.body.topic_id;
        var topic_id = req.params.topic_id;

        var query = `select q.question_id, q.question_no, q.description question, a.answer_id, a.option, a.description answer, a.isCorrect from questions as q inner join answers as a on q.question_id = a.question_id where topic_id = ${topic_id}`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                res.status(500).send({success: false, data: err.message});
            } else {
                if(rows.length == 0) {
                    res.status(404).json({success: false, message: `No answers found for topic with the id of ${topic_id}`});
                } else {
                    res.status(200).json({success: true, data: rows});
                }
                    
            }
        })
    });

    //Insert choice A for specific question 
    router.post('/:question_id', function(req, res, next) {
        
        // var user_id = req.body.user_id;
        var question_id = req.params.question_id;

        var isCorrect = req.body.isCorrect;
        var description = req.body.description;
        var option = req.body.option;

        // var checkUser = `select count(*) as exist from users as u inner join roles as r on u.role_id = r.role_id where r.name = "Instructor" and u.user_id = ${user_id}`;
        var query = `insert into answers (question_id, answers.option, description, isCorrect) values (${question_id}, '${option}', '${description}', ${isCorrect})`;
        
        db.query(query, function(err, rows, fields){
            if(err){
                // db.rollback();
                res.status(500).json({success:false, error: err});
            } else {
                res.status(200).json({success: true, message: "Answer inserted successfully!"});
            }
        });
    });

    //Update the question description of the specific topic by author
    router.put('/:question_no', function(req, res, next) {

        var user_id = req.body.user_id;
        // var topic_id = req.params.topic_id;
        var question_no = req.params.question_no;
        var description = req.body.description;

        var query = `update answers set description = '${description}' where question_no = ${question_no} and user_id = ${user_id}`;
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