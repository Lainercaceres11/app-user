import { Type } from '@sinclair/typebox';
import addErrors from 'ajv-errors';
import Ajv from 'ajv';

const userUpdatePasswordDTOSchema = Type.Object(
    {
        oldPassword: Type.String({
            format: 'password',
            minLength: 10,
            maxLength: 25,
            errorMessage: {
                type: 'El tipo de la contraseña no es valido',
                format: 'El formato de la contraseña no es valido',
                minLength: 'Debe tener al menos 10 caracteres',
                maxLength: 'Debe tener como maximo 25 caracteres',
            },
        }),
        newPassword: Type.String({
            format: 'password',
            minLength: 10,
            maxLength: 25,
            errorMessage: {
                type: 'El tipo de la contraseña no es valido',
                format: 'El formato de la contraseña no es valido',
                minLength: 'Debe tener al menos 10 caracteres',
                maxLength: 'Debe tener como maximo 25 caracteres',
            },
        }),
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'Campo invalido',
        },
    }
);

const ajv = new Ajv({allErrors: true}).addKeyword("kind").addKeyword("modifier");

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addErrors(ajv)


const validateSchema = ajv.compile(userUpdatePasswordDTOSchema);

const userUpdatePassword = (req, res, next) =>{
    const isValidDTO = validateSchema(req.body)
    if(!isValidDTO) return res.status(400).send({errors: validateSchema.errors.map(error => error.message)})
    next()
}

export default userUpdatePassword;