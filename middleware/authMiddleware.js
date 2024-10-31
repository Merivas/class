// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Acceso denegado');
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).send('Token inválido');
        req.user = decoded;
        next();
    });
}

module.exports = verificarToken;