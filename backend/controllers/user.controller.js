
//CUSTOM RESPONSE
const responseManagement = require('../protected/responseManagement');

//JWT
const jwtFuncs = require('../protected/jwtFunctions');
const encrypt = require('../protected/encrypt');

//ORM
const Models = require("../models");
const { Op } = require('sequelize');


module.exports.list = async (req, res) => {

    try {
        
        const params = {
            include: [
                {
                    model: Models.Role,
                    required: true,
                }
            ],
            where : {
                id : {
                    [Op.notIn] : [1, req.body.userId]
                },
            },
            order : [
                ['id', 'desc']
            ]
        }

        const users = await Models.User.findAll(params)

        return responseManagement.responseJSON(res, { users : users });

        
    } catch (err) {
        return responseManagement.responseERROR(res, 500, ( err?.errors?.length ? err?.errors[0]?.message : null) || err?.message);
    }

}

module.exports.create = async (req, res) => {

    try {
        
        const data = {
            username: req.body.username || null,
            password: req.body.password || null,
            firstName: req.body.firstName || null,
            lastName: req.body.lastName || null,
            job: req.body.job || null,
            salary: req.body.salary,
            roleId: req.body.roleId,
            statusId: req.body.statusId,
        };

        if(!this.checkProperties(data)){
            return responseManagement.responseERROR(res, 400, 'Por favor ingrese todos los campos requeridos');
        }


        if (data.password) {
            data.password = encrypt.generateHashPassword(data.password)
        }

        const user = await Models.User.create(data);

        if (user != null) {
            return responseManagement.responseJSON(res, { message : 'Usuario creado correctamente'});
        }

        return responseManagement.responseERROR(res, 404, 'Usuario no creado');

        
    } catch (err) {
        return responseManagement.responseERROR(res, 500, ( err?.errors?.length ? err?.errors[0]?.message : null) || err?.message);
    }

}

module.exports.update = async (req, res) => {

    try {
        
        const data = {
            id : req.body.id,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            job: req.body.job,
            salary: req.body.salary,
            roleId: req.body.roleId,
            statusId: req.body.statusId,
        };

        if(!data.id || !data.username){
            return responseManagement.responseERROR(res, 400, 'Por favor ingrese todos los campos requeridos');
        }

        if (data.password && data.password != '******') {
            data.password = encrypt.generateHashPassword(data.password)
        }

        const user = await Models.User.findByPk(data.id);

        if (user != null) {

            await user.update(data);

            return responseManagement.responseJSON(res, { message : 'Usuario Actualizado correctamente'});
        }

        return responseManagement.responseERROR(res, 404, 'Usuario no encontrado');

        
    } catch (err) {
        return responseManagement.responseERROR(res, 500, ( err?.errors?.length ? err?.errors[0]?.message : null) || err?.message);
    }

}

module.exports.delete = async (req, res) => {

    try {
        
        const data = {
            id: req.params.id,
        };

        if(!data.id){
            return responseManagement.responseERROR(res, 400, 'Por favor ingrese usuario');
        }

        const user = await Models.User.findByPk(data.id);

        if (user != null) {

            await user.destroy();

            return responseManagement.responseJSON(res, { message : 'Usuario Eliminado correctamente'});
        }

        return responseManagement.responseERROR(res, 404, 'Usuario no encontrado');

        
    } catch (err) {
        return responseManagement.responseERROR(res, 500, ( err?.errors?.length ? err?.errors[0]?.message : null) || err?.message);
    }

}

module.exports.changeStatus = async (req, res) => {

    try {
        
        const data = {
            id: req.body.id,
            statusId: req.body.statusId,
        };

        if(!data.id){
            return responseManagement.responseERROR(res, 400, 'Por favor ingrese usuario');
        }

        const user = await Models.User.findByPk(data.id);

        if (user != null) {

            await user.update(data);

            return responseManagement.responseJSON(res, { message : 'Usuario Actualizado correctamente'});
        }

        return responseManagement.responseERROR(res, 404, 'Usuario no encontrado');

        
    } catch (err) {
        return responseManagement.responseERROR(res, 500, ( err?.errors?.length ? err?.errors[0]?.message : null) || err?.message);
    }

}

//FUNCION PARA VALIDAR QUE TODAS LAS PROPIEDADES DEL OBJETO X TENGAN VALOR
module.exports.checkProperties = (obj) => {
    for (var key in obj) {
        if ((obj[key] == null || obj[key] == "") && obj[key] != 0){
            return false;
        }
        
    }
    return true;
}
