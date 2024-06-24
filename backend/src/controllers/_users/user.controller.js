const { JwtSign } = require("../../services/jwt.auth.service");

module.exports = {
    Login: (req, res) => {
        console.log("REQUEST: ",req.body);
        const token = JwtSign();

        res.send({ token })
    }
}