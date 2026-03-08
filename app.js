const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('client'));

// with this we don't need to parse req
app.use(express.json());  
app.use(express.urlencoded());

const library = require('./json_stuff/library.json');
const topics = require('./json_stuff/topics.json');

let testTopic, subTopic;

// GET function to get topics in library   -->  /library/topics
app.get('/library/topics', function(req, res) {
    let response = new Array;
    for (const topic of library) {
        response.push({"name":topic.name, "id":topic.id});
    };
    res.status(200).send(response);
});

// GET function to search for topics by name         -->  /search/topics/:value
app.get('/search/topics/:value', function(req, res) {
    let value = req.params.value;

    if (value=="§") {       // was empty
        res.status(400).send("empty search");
        return;
    } else if (value=="§§") {       // was a space
        value = " "
    } else {
        value = value.toLowerCase();
    };

    const match = new Array;
    topics.forEach( topic => {
        if (topic.name.toLowerCase().includes(value)) {
            // need to also filter out ones in the library already
            let topicIndex = library.findIndex(entry => entry.id == topic.id);
            if (topicIndex==-1) {
                match.push({"name":topic.name, "id":topic.id});         // not in library
            };
        };
    });

    res.status(200).send(match);
});

// GET function to return questions by topic    --> /:topic/questions
app.get('/test/questions', function(req, res) {
    let topicIndex = topics.findIndex(topic => topic.id == testTopic);
    if (topicIndex==-1) {
        res.status(500).send("something went wrong");
        return };
    let testingTopic = topics[topicIndex];

    console.log("testing subject:", testingTopic.name);           ////

    let subTopicIndex = testingTopic.topics.findIndex(subtopic => subtopic.id == subTopic);
    if (subTopicIndex==-1) {
        res.status(500).send("something went wrong");
        return };
    let test = testingTopic.topics[subTopicIndex];
    console.log("testing topic:", test.name);           ////

    let questions = test.questions;
    let answers = test.answers;
    let response = {questions, answers};
    console.log("questions and answers:", response);            //////
    res.status(200).send(response);
});

// POST function to add a topic to the library by id         --> /library/new
app.post('/library/new', function(req, res) {
    topicID = req.body.id;
    // identify topic
    let topicIndex = topics.findIndex(topic => topic.id == topicID);
    if (topicIndex==-1) {
        res.status(400).send("topic not found");
        return };
    let topicToAdd = topics[topicIndex];
    let newEntry = {"name":topicToAdd.name, "id":topicToAdd.id};
    library.push(newEntry);
    try {
        fs.writeFileSync(
            './json_stuff/library.json', 
            JSON.stringify(library, null, 2)  // we want 2 indents and the space to fill with null (empty)
        );                                   // literally just making the json file stay pretty print

        res.status(200).send("post successful");
    } 
    catch(e){
        res.status(500).send("something went wrong");
    };
});

// POST function to set the test topic and get the subtopics        --> /test
app.post('/test', function(req, res) {
    testTopic = req.body.id;
    console.log("set test topic:", testTopic);       ///

    let topicIndex = topics.findIndex(topic => topic.id == testTopic);
    let topic = topics[topicIndex];
    let subTopics = topic.topics;
    res.status(200).send(subTopics);
});

// POST function to set the test subtopic       --> /test/subtopic
app.post('/test/subtopic', function(req, res) {
    subTopic = req.body.id;
    console.log("set test sub-topic:", subTopic);       ///

     res.status(200).send("post successful");
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