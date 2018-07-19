const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');

// Todo.remove({}).then((res) => {
//     console.log(res);
// }, ((err) => {
//     console.log(err);
// }));

Todo.findByIdAndRemove('5b50a0f1af6187878f75efac').then((todo) => {
    console.log(todo);
})