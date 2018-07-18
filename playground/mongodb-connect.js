// const MongoClient = require('mongodb').MongoClient;

// destructor es6
// var user = {name: 'andrew', age: 25};
// var { name } = user;

// destructed require module
const { MongoClient, ObjectID } = require('mongodb');

//  arggument[0] = url where database live
//  arggument[1] = callback function
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server :', err);
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to Insert to do', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // insert user
    // db.collection('Users').insertOne({ 
    //     name: 'Mike',
    //     age: 24,
    //     location: 'Chiang Mai'
    // }, (err, result) => {
    //     if(err)
    //     {
    //         return console.log('unable to Insert User', err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    // close a connection
    client.close()
});