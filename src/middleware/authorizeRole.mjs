export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)) {
            return res.status(401).send({msg: "You are not authorized"});
        }
        next();
    }
}