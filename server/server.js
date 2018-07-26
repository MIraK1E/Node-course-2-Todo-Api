require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { User } = require('./model/user');
const { Todo } = require('./model/todo');
const { authenticate } = require('./middleware/authenticate');

const port = process.env.PORT;

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
    Todo.find()
        .then((todos) => {
            res.send({ todos });
        }, (err) => {
            res.status(400).send(err);
        });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }
    Todo.findById(id)
        .then((todo) => {
            if(!todo)
            {
                return res.status(404).send();
            }
            res.status(200).send({todo});
        })
        .catch((err) => {
            res.status(400).send();
        });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo)
        {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    })
    .catch((err) => {
        res.status(400).send();
    })

});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id
    // take object and array of thing that you wat to pull of
    const body = _.pick(req.body, ['text', 'complete']);

    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }

    // if this variable is boolean and value = true
    if(_.isBoolean(body.complete) && body.complete)
    {
        body.completeAt = new Date().getTime();
    }
    else
    {
        body.complete = false;
        body.completeAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {
            if(!todo)
            {
                return res.status(404).send();
            }
            res.send({ todo });
        })
        .catch((err) => {
            res.status(404).send();
        });

});

app.post('/users', (req, res) => {
    const userObject = _.pick(req.body, ['email', 'password']);

    const user = new User(userObject);

    user.save()
        .then(() => {
            return user.generateAuthToken();
        })
        .then((token) => {
            res.header('x-auth', token).send(user);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

// move to middleware authenticate
// const authenticate = (req, res, next) => {
//     const token = req.header('x-auth');

//     User.findByToken(token)
//         .then((user) => {
//             if(!user) {
//                 return Promise.reject();
//             } 
            
//             req.user = user;
//             req.token = token;
//             next();
//         })
//         .catch((err) => {
//             res.status(401).send();
//         })
// }

app.get('/users/me', authenticate, (req, res) => {
    // code before authenticate middleware
    // const token = req.header('x-auth');

    // User.findByToken(token)
    //     .then((user) => {
    //         if(!user) {
    //             return Promise.reject();
    //         } 
    //         res.send(user);
    //     })
    //     .catch((err) => {
    //         res.status(401).send();
    //     })
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    const user = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(user.email, user.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        });
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };