const StringToArray = (value, separator) => {
    try {
        
        return value.split(separator);

    } catch (error) {
        throw error
    }
}

module.exports = {
    StringToArray
}