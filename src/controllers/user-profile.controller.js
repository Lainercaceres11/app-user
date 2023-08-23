
import UserModel from '../schemas/user-schema.js';

const userProfileController = async (req, res) => {
    const { id } = req.body;

    // Buscamos usuario por id
    const existingUserById = await UserModel.findById(id).exec();

    if (!existingUserById) return res.status(401).send('Usuario no autorizado');

    const { _id, name, surname, email } = existingUserById;

    return res.send({ _id, name, surname, email });
};

export default userProfileController;
