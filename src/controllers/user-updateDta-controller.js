import UserModel from '../schemas/user-schema.js';

const userUpdateDataController = async (req, res) => {
    const { id } = req;
    const { name, surname } = req.body;

    // Buscamos usuario por id
    const existingUserById = await UserModel.findById(id).exec();

    if (!existingUserById) return res.status(401).send('Usuario no autorizado');

    existingUserById.name = name
    existingUserById.surname = surname

    await existingUserById.save()

    return res.send("Usuario modificado");
};

export default userUpdateDataController;
