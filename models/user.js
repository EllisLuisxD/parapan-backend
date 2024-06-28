const db = require('../config/config');

const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {
    const sql = `
    SELECT
		id,
        usuario,
        email,
        phone,
        dni,
        password,
        image
	FROM
		users
	WHERE
		id=?
    `;

    db.query
        (
            sql,
            [id],
            (err, user) => {
                if (err) {
                    console.log('Error: ', err)
                    result(err, null);
                }
                else {
                    console.log('Usuario obtenido: ', user);
                    result(null, user);
                }
            }
        )
}

User.findByEmail = (email, result) => {
    const sql = `
    SELECT
        id,
        usuario,
        email,
        phone,
        dni,
        password,
        image
	FROM
		users
	WHERE
		email=?
    `;

    db.query
        (
            sql,
            [email],
            (err, user) => {
                if (err) {
                    console.log('Error: ', err)
                    result(err, null);
                }
                else {
                    console.log('Usuario obtenido: ', user[0]);
                    result(null, user[0]);
                }
            }
        )
}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
    INSERT INTO
        users(
            usuario,
            email,
            phone,
            dni,
            password,
            image,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
        (
            sql,
            [
                user.usuario,
                user.email,
                user.phone,
                user.dni,
                hash,
                user.image,
                new Date(),
                new Date()
            ],
            (err, res) => {
                if (err) {
                    console.log('Error: ', err)
                    result(err, null);
                }
                else {
                    console.log('ID del nuevo usuario: ', res.insertId);
                    result(null, res.insertId);
                }
            }
        )
}



module.exports = User;