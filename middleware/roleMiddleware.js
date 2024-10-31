// middleware/roleMiddleware.js
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('No tienes permiso para acceder a esta ruta');
        }
        next();
    };
}

module.exports = authorizeRoles;