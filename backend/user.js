const mongoose = require('mongoose');
// const user = new mongoose.Schema({
//     username: String,
//     password: String,
// });

// module.exports = mongoose.model("User", user)

module.exports = {
    DB_PORT: 4300,
    DB_URL: 'mongodb://localhost:27017/User'
}