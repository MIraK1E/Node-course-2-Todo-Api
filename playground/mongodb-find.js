// const MongoClient = require('mongodb').MongoClient;

// destructor es6
// var user = {name: 'andrew', age: 25};
// var { name } = user;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server :', err);
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').find().count().then((res) => {
    //     // console.log(`Todos count : ${res}`);
    //     console.log(JSON.stringify(res, undefined, 2));
    // })
    // .catch((err) => {
    //     console.log(err);
    // }) 

    db.collection('Users').find({ name: 'Mikeal' }).toArray()
        .then((res) => {
            console.log('Users');
            console.log(res);
        })
        .catch((err) => {
            console.log(`Unable to fetch Users : ${err}`);
        });

    // client.close()
});