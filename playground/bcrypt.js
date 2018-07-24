const bcrypt = require('bcryptjs');

const password = '123abc!';

// how to hash password
bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

const hashedPassword = '$2a$10$SHGuhTzsrWw46uozuPL25OtHLRavoSsoryS4im3OnagTyKRb8VkD.';

// how to check hash value to real value
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});