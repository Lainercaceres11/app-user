import { jwtVerify } from 'jose';

const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.body;
    if (!authorization) return res.status(401).send('Usuario no autorizado');
    try {
        const JWT = '3RP!DT248<@B~T$Kmum+';
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(authorization, encoder.encode(JWT));
        req.id = payload.id;

        next();
    } catch (error) {
        res.status(401).send('Usuario no autorizado');
    }
};

export default userJWTDTO;
