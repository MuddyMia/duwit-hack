const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('client'));

// with this we don't need to parse req
app.use(express.json());  
app.use(express.urlencoded());

let testTopic;

// GET function to get topics in library   -->  /library/topics
app.get('/library/topics', function(req, res) {         // mocked for now
    let response = [{"name":'calculus',"id":1}, {"name":'first order logic', "id":2}]; 
    res.status(200).send(response);
});

// GET function to search for topics by name         -->  /search/topics/:value
app.get('/search/topics/:value', function(req, res) {
    let value = req.params.value;
    console.log("search value is:", value);         ////
    // need to also filter out ones in the library already

    let response = [{"name":'calculus',"id":1}, {"name":'first order logic', "id":2}];           // mocked for now
    res.status(200).send(response);
});

// GET function to return questions by topic    --> /:topic/questions
app.get('/test/questions', function(req, res) {
    console.log("topic is:", testTopic);        //

    let questions = ['q1', 'q2'];            // mocked for now
    let answers = ['a1', 'a2'];
    let response = {questions, answers};
    res.status(200).send(response);
});

// POST function to add a topic to the library by id         --> /library/new
app.post('/library/new', function(req, res) {
    topicID = req.body.id;

    // identify topic

    // add it to library.json       --> maybe with id as index?

    console.log("added");           ///
    res.status(200);            // mocked
})

// POST function to set the test topic       --> /test
app.post('/test', function(req, res) {
    testTopic = req.body.id;

    console.log("set test topic:", testTopic);       ///

    res.status(200);
});

// POST / DELETE function to remove a topic from the library         --> /library/remove
app.post('/library/remove', function(req, res) {
    topicID = req.body.id;

    // identify topic

    // remove it from library.json

    console.log("deleted");             ////
    res.status(200).send("successfully deleted");            // mocked
})


module.exports = app;