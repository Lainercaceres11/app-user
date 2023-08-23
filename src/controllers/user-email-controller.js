import { compare } from 'bcrypt';
import UserModel from '../schemas/user-schema.js';

const userEmailController = async (req, res) => {
    const { id } = req;
    const { password, email } = req.body;

    // Buscamos usuario por id
    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById) return res.status(401).send('Usuario no autorizado');

    
    // Comparamos la contraseñas
    const checkPassword = await compare(password, existingUserById.password);
    if (!checkPassword) return res.status(401).send('Credenciales no encontradas');

    existingUserById.email = email

    await existingUserById.save()

    return res.send("Email modificado");
};

export default userEmailController;
