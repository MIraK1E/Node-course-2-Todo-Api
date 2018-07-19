const mongoose = require('mongoose');

// tell mongoose to use native Promise cause
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
    text: { 
        type: String, 
        required: true,
        minlength: 1,
        trim: true
        },
    complete: { 
        type: Boolean,
        default: false 
    },
    completeAt: { 
        type: Number ,
        default: null
    }
});

// const newTodo = new Todo({
//     text: 'Cook dinner'
// });

// const newTodo = new Todo({
//     text: 'Edit Video',
//     complete: false,
//     completeAt: 0000
// });

// newTodo.save()
//     .then((res) => console.log('Saved Todo'))
//     .catch((err) => console.log('Unable to save todo'));

const User = mongoose.model('User', {
    email: {
        type: 'String',
        required: true,
        trim: true,
        minlength: 1,
    }
});

const newUser = new User({email: 'mike.pattana@gmail.com'});

newUser.save()
        .then((res) => console.log('Saved Todo'))
        .catch((err) => console.log('Unable to save todo', err));