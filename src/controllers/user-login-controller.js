import { SignJWT } from 'jose';
import UserModel from '../schemas/user-schema.js';
import { compare } from 'bcrypt';

const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    // Buscamos usuario por mail
    const existingUserByEmail = await UserModel.findOne({ email }).exec();

    if (!existingUserByEmail)
        return res.status(401).send('Credenciales incorrectas');

    // Comparamos la contraseñas
    const checkPassword = await compare(password, existingUserByEmail.password);

    if (!checkPassword) return res.status(401).send('Credenciales incorrectas');

    // Instanciamos constructor para crear jwt y le pasamos el id
    const jwtConstructor = new SignJWT({ id: existingUserByEmail._id });

    const encoder = new TextEncoder();

    const JWT_KEY = '3RP!DT248<@B~T$Kmum+';

    // Creamos JWT
    const jwt = await jwtConstructor
        .setProtectedHeader({ alg: 'HS256', type: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encoder.encode(JWT_KEY));

    return res.send({ jwt });
};

export default userLoginController;
