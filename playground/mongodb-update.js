const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server :', err);
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate(
    //     { _id: new ObjectID('5b4f6828af6187878f75cb2b') },
    //     { $set: { completed: true } },
    //     { returnOriginal: false }
    // ).then((res) => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate(
        { name: 'Mike' },
        {
            $set: { name: 'MIrak!E' },
            $inc: { age: 1 }
        },
        { returnOriginal: false }
    ).then((res) => {
        console.log(res);
    });

    client.close()
});