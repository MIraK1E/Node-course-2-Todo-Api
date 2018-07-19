const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');

// const id = 'b5065e8593ff92944093a1e';

// if(!ObjectID.isValid(id))
// {
//     console.log('ID not found');
// }
// Todo.find({ _id: id })
//     .then((todos) => {
//         console.log('Todo :', todos)
//     });

// Todo.findOne({ _id: id })
//     .then((todo) => {
//         console.log('Todo', todo);
//     });

// Todo.findById(id)
//     .then((todo) => {
//         if(!todo)
//         {
//             return console.log('Id not Found');
//         }
//         console.log('Todo By Id', todo);
//     }).catch((err) => {
//         console.log(err);
//     })

const { User } = require('./../server/model/user');

const id = '4b502d5e8d090c0eccff95d0';

User.findById(id)
    .then((user) => {
        if(!user)
        {
            return console.log('Not found');
        }
        console.log(user);
    })
    .catch((err) => {
        console.log(err);
    });