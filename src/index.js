import connectDB from './config/db.js';
import httpServer from './config/http.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const URL_DB =
    'mongodb+srv://lainercaceres:YbdtIAVUbRWLwlSw@node-course.8fllnj7.mongodb.net/';

const bootstrap = async () => {
    await connectDB(URL_DB);
    httpServer.listen(PORT, () => {
        console.log(`Server run in port ${PORT}  `);
    });
};

bootstrap();
