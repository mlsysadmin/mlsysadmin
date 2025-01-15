require("dotenv").config();
const bcrypt = require("bcrypt");
const { createHash } = require("node:crypto");

const algo = 'sha256';
const secret = process.env.SECRET_KEY;
const saltRounds = 10; 

const Hash = async (body) => {
    
    try {

        const salt = await bcrypt.genSalt(saltRounds);
        
        const hash = await bcrypt.hash(body, salt);

        return hash.toString()

    } catch (error) {
        return error
    }
    
}

const VerifyHash = async(password,signature) => {
    try {
        
        const verify = await bcrypt.compare(password, signature);

        return verify
        
    } catch (error) {
        return error
    }
}

const SignatureGenerator = (passPhrase) => {

    const hash = createHash("sha512").update(passPhrase).digest("hex");

    return hash;
}

module.exports = {
    Hash,
    VerifyHash,
    SignatureGenerator
}