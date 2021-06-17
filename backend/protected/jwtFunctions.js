const jwt = require('jsonwebtoken');

process.env.expiresIn = '120m';
process.env.expiresInReset = '60m';
process.env.secret = 'secretKey*2021';

//Firmar token de autentificacion
module.exports.signAuth = function(payload) {

    //Opciones de ingreso
    const signOptions = {
        expiresIn: process.env.expiresIn,
    };

    const tokenJwt = jwt.sign(payload, process.env.secret, signOptions);
    return tokenJwt;
}

//Verificar token de autenfificacion
module.exports.verifyAuth = function(token) {
    //Opciones de verificacion
    const verifyOptions = {
        expiresIn: process.env.expiresIn
    };
    return jwt.verify(token, process.env.secret, verifyOptions, (err, decoded) => {
        if (err) {
            return { status: 0, error: err };
        } else {
            return { status: 1, data: decoded };
        }
    });
}