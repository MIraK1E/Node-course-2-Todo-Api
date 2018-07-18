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

    // deleteMany
    // db.collection('Todos').deleteMany({ text: 'Eat lunch' })
    //     .then((res) => {
    //         console.log(res);
    //     });

    // deleteOne
    // db.collection('Todos').deleteOne({ text: 'Eat lunch' })
    //     .then((res) => {
    //         console.log(res);
    //     });


    // findOneAndDelete
    // find the first one that match the condition delete and return deleted document 
    // db.collection('Todos').findOneAndDelete({ completed: false })
    //     .then((res) => {
    //         console.log(res);
    //     });

    // db.collection('Users').deleteMany({ name: 'Mike' });

    // db.collection('Users').deleteOne({ _id: new ObjectID('5b4f46f31ca23907fcc99b1b') });

    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5b4f6201af6187878f75caa4') });

    client.close()
});