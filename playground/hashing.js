const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const message = "I'm robot";

const hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

const data = {
    id: 10
};

// jwt.sign(data, secret key)
const token = jwt.sign(data, '123abc');

const decoded = jwt.verify(token, '123abc');
console.log(decoded);

// this is how jwt work (basic understand)

// user login as id = 4 
// const data = {
//     id: 4
// };

// server provide a token with SHA256 
// the SHA256 is a encrypt function that return same result when we put same value
// look at somesecret string that string provide by server and insert to data 
// const token = {
//     data, 
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// };

// user 4 very mad of user 5 
// user 4 try to rehash and update token to get auth as user 5
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString()

// fortunatly we have put some random key in data, hash and send to user4 as token 
// user 4 fail to auth ass user 5
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash)
// {
//     console.log('data not changed');
// }
// else
// {
//     console.log('dont trusted');
// }