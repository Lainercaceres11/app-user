import { hash } from 'bcrypt';
import UserModel from '../schemas/user-schema.js';

const userRegisterController = async (req, res) => {
    const { _id, name, surname, email, password } = req.body;

    // Buscamos usuario por id
    const existingUserById = await UserModel.findById(_id).exec();
    if (existingUserById)
        return res.status(409).send('Ya existe un usuario con ese id');

    // Buscamos usuario por email
    const existingUserByEmail = await UserModel.findOne({email}).exec();
    if (existingUserByEmail)
        return res.status(409).send('Ya existe un usuario con ese email');

    // Creamos hash de password
    const hashedPassword = await hash(password, 12);

    // Creamos usuario
    const user = new UserModel({
        _id,
        name,
        surname,
        email,
        password: hashedPassword,
    });

    await user.save();

    return res.send('Usuario guardado con exito');
};

export default userRegisterController;
