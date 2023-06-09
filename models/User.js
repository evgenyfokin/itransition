import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../config.js';

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql'
});

export const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(50), unique: true },
    password: { type: DataTypes.STRING(255) },
    register_date: { type: DataTypes.DATE },
    last_login_date: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM('active', 'blocked', 'deleted') }
}, { timestamps: false });

User.sync();

export default User;