require("dotenv").config();
const crypto = require("node:crypto");

const iterations = 100000;
const saltLength = 10;
const keyLength = 64;
const digest = 'sha512';
const secret = process.env.SECRET_KEY;

const Hash = (body) => {
        
    try {
        let hash;

        const salt = crypto.randomBytes(saltLength).toString('hex');
    
        return crypto.pbkdf2(body, salt, iterations, keyLength, digest, (err, derivedKey) => {
            let hash_res = null;
            if (err) throw err;

            const hashed = `${derivedKey.toString('hex')}`;

            return hashed;

        })

    } catch (error) {
        console.log(error);
        return error
    }
    
}

const VerifyHash = () => {

}

module.exports = {
    Hash
}