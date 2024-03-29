var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Rajatisagoodb$oy' // add it as env for not hardcoding same


const fetchuser = (req, res, next) =>{
    // Get the user from the jwt token and add id to req object
    // console.log(req.header('Authorization').split(' ')[1])

    const token = req.header('Authorization').split(' ')[1]
    // console.log(token)
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
        return
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        // console.log(req.user)
        next()
        // next means next function after middleware
        
    } catch (error) {
       return res.status(401).send({error: "Please authenticate using a valid token"})
    }
}
module.exports = fetchuser;