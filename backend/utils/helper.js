const salt = 10;
const bcrypt = require('bcryptjs');

module.exports.passwordHash = async(password) => {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

module.exports.compareHash = async(loginPassword, dbPassword) => {
    const comparePassword = await bcrypt.compare(loginPassword, dbPassword);
    return comparePassword;
};

module.exports.validateUser = async(loginPassword, dbPassword) => {
    const comparePassword = await bcrypt.compare(loginPassword, dbPassword);
    return comparePassword;
};

