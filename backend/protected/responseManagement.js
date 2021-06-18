'use strict';

module.exports = {

    responseJSON: (res, data) => {
        return res.status(200).send(data);
    },

    responseERROR: (res, code, message) => {
        return res.status(code).send({ message: message, code: code });
    },
    
    notAuth: (res) => {
        return res.status(401).send({ type : 'logout' });
    }
};