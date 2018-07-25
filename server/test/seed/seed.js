const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../model/todo');
const { User } = require('./../../model/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'example@example.com',
        password: 'examplepassword',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'exampletwo@example.com',
        password: 'exampleTwopassword'
    }
];


const todos = [
    { 
        _id:  new ObjectID(),
        text: 'First test todo',
    }, 
    { 
        _id:  new ObjectID(),
        text: 'Second text todo',
        complete: true,
        completeAt: 333
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUser = (done) => {
    User.remove({}).then(() => {
        const UserOne = new User(users[0]).save(); 
        const UserTwo = new User(users[1]).save();
        
        return Promise.all([UserOne, UserTwo])
    }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUser }