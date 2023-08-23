import { compare } from 'bcrypt';
import UserModel from '../schemas/user-schema.js';

const userPasswordController = async (req, res) => {
    const { id } = req;
    const { oldPassword, newPassword } = req.body;

    // Buscamos usuario por id
    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById) return res.status(401).send('Usuario no autorizado');

    
    // Comparamos la contraseñas
    const checkPassword = await compare(oldPassword, existingUserById.password);
    if (!checkPassword) return res.status(401).send('Credenciales no encontradas');

    existingUserById.password = newPassword

    await existingUserById.save()

    return res.send("Password modificado");
};

export default userPasswordController;
