import JWT from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {

    try {
        let token
        const authHeader = req.headers.Authorization || req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];

            if (!token) {
                return res.status(401).send("Invalid Token or authorization denied");
            }
        }
        try {            
            const decode = JWT.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log(req.user)
            next();
        } catch (error) {
            return res.status(401).send("Invalid Token");
        }

    } catch (error) {
        return res.status(401).send({msg: `NOT VALID TOKEN ${error}`})
    }

}