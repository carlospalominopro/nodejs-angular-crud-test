'use strict';

const responseManagement = require('./../responseManagement');
const jwtFuncs = require('./../jwtFunctions');

function authorize(roles = []) {
    
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        
        (req, res, next) => {

            let token = req.headers.authorization;
    
            if (token) {
                token = token.replace('Bearer ', '');
            }

            const decoded = jwtFuncs.verifyAuth(token);

            if (decoded?.status == 1) {

                if (roles.length && !roles.includes(decoded.data?.roleId)) {
                    return responseManagement.responseERROR(res, 401, 'No autorizado');
                }

                req.body.userId = decoded.data?.userId;

                return next();
            }

            //AUTORIZA CIERRE DE SESION EN FRONTEND
            return responseManagement.notAuth(res);

        }
    ];
}

module.exports = authorize;