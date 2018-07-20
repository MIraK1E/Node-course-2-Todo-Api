const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../model/todo');

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

// this function will run before test case
// it will run test case when call done
beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
})

describe('POST/todos', () => {

    it('should create a new todo', (done) => {
        const text = 'test todo text';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(201)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({ text })
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done()
                    })
                    .catch((err) => done(err));
            });
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    })
                    .catch((err) => done(err));
            })
    });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        const Id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${Id}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non-object id', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        const id = todos[1]._id.toHexString()
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id)
            })
            .end((err, res) => {
                if(err)
                {
                    return done(err);
                }

                Todo.findById(id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                })
                .catch((err) => done(err));
            })
    });

    it('should return 404 if todo not found', (done) => {
        const Id = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${Id}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        const id = todos[0]._id.toHexString();

        const todo = { text: 'update test', complete: true }

        request(app)
            .patch(`/todos/${id}`)
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todo.text);
                expect(res.body.todo.completeAt).toBeA('number');
                expect(res.body.todo.complete).toBe(true);
            })
            .end(done);
    });

    it('should clear completeAt when todo is not complete', () => {
        const id = todos[1]._id.toHexString();

        const todo = { text: 'update test2', complete: false }

        request(app)
            .patch(`/todos/${id}`)
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todo.text);
                expect(res.body.todo.complete).toBe(false);
                expect(res.body.todo.completeAt).toNotExist();
            });
    });
});