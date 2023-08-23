import { Type } from '@sinclair/typebox';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';

const RegisterDTOSchema = Type.Object({
    _id: Type.String({
        format: 'uuid',
        errorMessage: {
            type: 'El campo no coincide con su tipo, debe ser un string',
            format: 'Error en el formato',
        },
    }),
    name: Type.String({
        minLength: 2,
        maxLength: 20,
        errorMessage: {
            minLength: 'El nombre debe tener 2 caracteres minimo de longitud',
            maxLength: 'El nombre debe tener como maximo 20 caracateres',
        },
    }),

    surname: Type.String({
        minLength: 4,
        maxLength: 50,
        errorMessage: {
            minLength: 'El nombre debe tener 4 caracteres minimo de longitud',
            maxLength: 'El nombre debe tener como maximo 50 caracateres',
        },
    }),

    email: Type.String({
        format: 'email',
        errorMessage: {
            type: 'El email no coincide con el formato',
            format: 'Error en el formato de email',
        },
    }),

    password: Type.String({
        format: 'password',
        minLength: 10,
        maxLength: 25,
        errorMessage: {
            type: 'El tipo de la contraseña no es valido',
            format: 'El formato de la contraseña no es valido',
            minLength: "Debe tener al menos 10 caracteres",
            maxLength: "Debe tener como maximo 25 caracteres"
        },
    }),
},  {
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Campo invalido',
    },
});

const ajv = new Ajv({allErrors: true}).addKeyword("kind").addKeyword("modifier");

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addFormats(ajv, ["email", "uuid"])
addErrors(ajv)


const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDto = (req, res, next) =>{
    const isValidDTO = validateSchema(req.body)
    if(!isValidDTO) return res.status(400).send({errors: validateSchema.errors.map(error => error.message)})
    next()
}

export default userRegisterDto;