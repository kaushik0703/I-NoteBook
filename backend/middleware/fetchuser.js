var jwt = require('jsonwebtoken');

const JWT_SECRET = 'agoodsecretisalwaysbetter'; // to sign our web token

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token) {
        res.status(401).send({error : "invalid session login again"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;  //appending user to req so that we can use it in next function
        next();
    } catch (error) {
        res.status(401).send({error : "invalid session login again"});
    }
}


module.exports = fetchuser;