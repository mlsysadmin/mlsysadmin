const User = require("../models/User");

module.exports = {
    FindUserOne: async (user) => {
        try {
            
           const user = await User.findOne()

        } catch (error) {
            console.log(error);
        }
    }
}