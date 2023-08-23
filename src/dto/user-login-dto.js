import { Type } from '@sinclair/typebox';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';

const LoginDTOSchema = Type.Object({
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

addFormats(ajv, ["email"])
addErrors(ajv)


const validateSchema = ajv.compile(LoginDTOSchema);

const LoginRegisterDto = (req, res, next) =>{
    const isValidDTO = validateSchema(req.body)
    if(!isValidDTO) return res.status(400).send({errors: validateSchema.errors.map(error => error.message)})
    next()
}

export default LoginRegisterDto;