const randomString = require('randomstring');

module.exports = () => {
    try {
        
        const generateString = randomString.generate({
            length: 7,
            charset: 'alphabetic'
        }).toUpperCase();

        return `MLBR${generateString}`;

    } catch (error) {
        throw error
    }
}