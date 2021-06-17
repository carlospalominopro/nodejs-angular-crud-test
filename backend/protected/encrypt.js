const bcrypt = require('bcrypt');
const saltRounds = 10; 
 
module.exports.generateHashPassword = (password) =>{
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash; 
};

module.exports.comparePasswordHash = (password, hash) =>{
    return bcrypt.compareSync(password, hash);
}; 