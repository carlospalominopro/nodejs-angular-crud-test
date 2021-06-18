
//CUSTOM RESPONSE
const responseManagement = require('../protected/responseManagement');

//JWT
const jwtFuncs = require('../protected/jwtFunctions');
const encrypt = require('../protected/encrypt');

//ORM
const Models = require("../models");


module.exports.login = async (req, res) => {

    try {

        const data = {
            username: req.body.username || null,
            password: req.body.password || null
        };

        if (!data.username || !data.password) {
            return responseManagement.responseERROR(res, 400, 'Por favor ingrese usuario y contraseña');
        }

        const params = {
            include: [
                {
                    model: Models.Role,
                    required: true,
                }
            ],
            where: {
                username: data.username
            }
        }

        const user = await Models.User.findOne(params)

        if (user != null) {

            if (user.statusId != 1) {
                return responseManagement.responseERROR(res, 403, 'Usuario inactivo');
            }

            if (encrypt.comparePasswordHash(data.password, user.password)) {

                let token = jwtFuncs.signAuth({
                    userId: user.id,
                    roleId: user.Role.id,
                })

                // ACTUALIZA FECHA DE INGRESO
                await user.update({ entryDate: new Date() });

                return responseManagement.responseJSON(res, {
                    user,
                    token
                });

            } else {
                return responseManagement.responseERROR(res, 400, 'Contraseña incorrecta');
            }

        }

        return responseManagement.responseERROR(res, 404, 'Usuario no encontrado');


    } catch (err) {
        return responseManagement.responseERROR(res, 500, (err?.errors?.length ? err?.errors[0]?.message : null) || err?.message);
    }

}
