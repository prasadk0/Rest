
const jwt = require('jsonwebtoken');

class JwtService{//you have to write jwt token in .env file

    static sign(payload,expiry = '1y',secret='thisismysecret'){

     return jwt.sign(payload,secret,{expiresIn:expiry});
    }
}

module.exports = JwtService;