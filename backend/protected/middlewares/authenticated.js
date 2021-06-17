'use strict';

const responseManagement = require('./../responseManagement');
const jwtFuncs = require('./../jwtFunctions');

module.exports.authenticated = async function(req, res, next) {
    
    let token = req.headers.authorization;
    
    if (token) {
        token = token.replace('Bearer ', '');
    }

    const decoded = jwtFuncs.verifyAuth(token);

    if (decoded?.status == 1) {
        req.tokenData = decoded.data;
        next();
    }
    
    return responseManagement.responseJSON(res, 401, 'No autorizado');
    
}