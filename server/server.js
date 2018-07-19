const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { User } = require('./model/user');
const { Todo } = require('./model/todo');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then((doc) => {
            res.status(201).send(doc);
        }, (err) => {
            res.status(400).send(err);
        });
});

app.get('/todos', (req, res) => {

});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };