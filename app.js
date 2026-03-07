const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('client'));

// with this we don't need to parse req
app.use(express.json());  
app.use(express.urlencoded());


// GET function to get topics in library   -->  /library/topics
app.get('/library/topics', function(req, res) {         // mocked for now
    let response = ['calculus', 'first order logic'];
    res.status(200).send(response);
});

// GET function to search for topics by name         -->  /search/topics/:value
app.get('/search/topics/:value', function(req, res) {
    let value = req.params.value;
    console.log("search value is:", value);         ////

    let response = ['calculus', 'first order logic'];           // mocked for now
    res.status(200).send(response);
});

// GET function to return questions by topic    --> /:topic/questions
app.get('/:topic/questions', function(req, res) {
    let topic = req.params.topic;
    console.log("topic is:", topic);        //

    let response = ['q1', 'q2'];            // mocked for now
    res.status(200).send(response);
});
// GET function to return answers by topic    --> /:topic/answers
app.get('/:topic/answers', function(req, res) {
    let topic = req.params.topic;
    console.log("topic is:", topic);        //

    let response = ['a1', 'a2'];            // mocked for now
    res.status(200).send(response);
});


// POST function to add a topic to the library



// POST / DELETE function to remove a topic from the library



module.exports = app;