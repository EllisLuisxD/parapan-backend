const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {

    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado',
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {});

                const data = {
                    id: `${myUser.id}`,
                    usuario: myUser.usuario,
                    email: myUser.email,
                    phone: myUser.phone,
                    dni: myUser.dni,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'El password es incorrecto',
                });
            }
        });
    },
    register(req, res) {
        const user = req.body;
        // Validación del número de teléfono
        if (user.phone.length !== 9) {
            return res.status(400).json({
                success: false,
                message: 'El número de teléfono debe tener 9 dígitos',
            });
        }
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: print(err)
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Registro exitoso',
                data: data
            });
        });
    },

    async registerWithImage(req, res) {
        const user = JSON.parse(req.body.user); //Capturamos los datos enviados por el cliente
        const files = req.files;
        if (files.length > 0) {
            const path = `image_${Date.now()}`; //bactick
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            user.id = `${data}`;

            const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;

            return res.status(201).json({
                success: true,
                message: 'Registro exitoso',
                data: user
            });
        });
    },

}