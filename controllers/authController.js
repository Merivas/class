// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { SECRET_KEY } = require('../config');

function generarToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
}

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    const user = await User.create(username, password, role);
    res.status(201).send('Usuario registrado');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = User.findByUsername(username);
    if (!user) return res.status(404).send('Usuario no encontrado');

    const isMatch = await User.validatePassword(password, user.password);
    if (!isMatch) return res.status(400).send('Credenciales inválidas');

    const token = generarToken(user);
    res.json({ token });
};

exports.getData = (req, res) => {
    res.send('Datos disponibles para usuarios autenticados');
};

exports.createData = (req, res) => {
    res.send('Datos creados por usuario con rol admin');
};

exports.updateData = (req, res) => {
    res.send('Datos actualizados por usuario con rol editor o admin');
};

exports.deleteData = (req, res) => {
    res.send('Datos eliminados por usuario con rol admin');
};
