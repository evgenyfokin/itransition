import express from 'express';
import jwt from "jsonwebtoken";
import { jwtSecret } from './config.js';
import * as authController from './controllers/authentication.js';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const checkJwt = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
            return res.status(500).send("Failed to authenticate token");
        }

        req.userId = decoded.id;
        next();
    });
};

app.post('/deleteUsers', checkJwt, authController.deleteUsers);
app.post('/updateUserStatus', checkJwt, authController.updateUserStatus);
app.post('/blockUsers', checkJwt, authController.blockUsers);
app.get('/users', checkJwt, authController.getUsers);
app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/user/:id', checkJwt, authController.getUser);

app.get('/', (req, res) => {
    res.send('Hello, Server!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});