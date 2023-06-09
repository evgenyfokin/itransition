import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8); // Problem is here
        console.log("Registering user with data:", req.body);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            register_date: new Date(),
            last_login_date: new Date(),
            status: 'active'
        });
        console.log("User registered:", user);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.status === 'blocked') {
            return res.status(403).send('User is blocked');
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: 86400
        });

        await user.update({ last_login_date: new Date() });

        res.status(200).send({ auth: true, token: token });
    } catch (e) {
        res.status(500).send(e);
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
};

export const getUsers = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send('No token provided');
        }

        jwt.verify(token, jwtSecret, async (error, decoded) => {
            if (error) {
                return res.status(500).send("Failed to authenticate token");
            }

            const users = await User.findAll();
            res.status(200).json(users);
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { userIds, status } = req.body;
        await User.update({ status: status }, { where: { id: userIds } });
        res.status(204).end();
    } catch (e) {
        res.status(500).send(e);
    }
};

export const blockUsers = async (req, res) => {
    try {
        const { userIds } = req.body;
        await User.update({ status: 'blocked' }, { where: { id: userIds } });
        res.status(204).end();
    } catch (e) {
        res.status(500).send(e);
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const { userIds } = req.body;
        await User.destroy({ where: { id: userIds } });
        res.status(204).end();
    } catch (e) {
        res.status(500).send(e);
    }
};