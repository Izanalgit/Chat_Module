const { body } = require('express-validator');

const messageValidations = [
	body('payload.recep')
        .trim()
        .notEmpty()
        .withMessage('Se requiere de un usuario receptor para el mensaje')
        .isEmail()
        .withMessage('El usuario receptor debe ser un email válido'),
    body('payload.message')
        .trim()
        .notEmpty()
        .withMessage('Se requiere de un cuerpo de mensaje')
]

module.exports = { messageValidations }