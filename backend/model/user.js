const { mongoose } = require('../database/database');

const userSchema = mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String, require: true },
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;