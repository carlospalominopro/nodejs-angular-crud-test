
//CUSTOM RESPONSE
const responseManagement = require('../protected/responseManagement');

//JWT
const jwtFuncs = require('../protected/jwtFunctions');
const encrypt = require('../protected/encrypt');

//ORM
const { Op } = require("sequelize");
const Models = require("../models");


module.exports.login = async (req, res) => {

    try {
        
        

        return responseManagement.responseJSON(res, []);
        
    } catch (err) {
        return responseManagement.responseERROR(res, 500, JSON.stringify(err));
    }

}
