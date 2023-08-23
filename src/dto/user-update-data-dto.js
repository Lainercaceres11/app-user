import { Type } from '@sinclair/typebox';
import addErrors from 'ajv-errors';
import Ajv from 'ajv';

const updateDataDTOSchema = Type.Object({
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

},  {
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Campo invalido',
    },
});

const ajv = new Ajv({allErrors: true}).addKeyword("kind").addKeyword("modifier");
addErrors(ajv)


const validateSchema = ajv.compile(updateDataDTOSchema);

const updateDataDto = (req, res, next) =>{
    const isValidDTO = validateSchema(req.body)
    if(!isValidDTO) return res.status(400).send({errors: validateSchema.errors.map(error => error.message)})
    next()
}

export default updateDataDto;