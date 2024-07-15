'use strict'

const axios = require('axios');

module.exports = {
    SearchUserKyc: async (token, user) => {
        try {
            const API_BASE_URL = process.env.SYMPH_CKYC_API_URL;
            const url = `${API_BASE_URL}/api/v1/customers/exact-search`;
    
            const queryParams = user
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                params:{...queryParams}
    
            };
    
            const response = await axios.get(url, config);
            
            return response
        } catch (error) {
            throw error
        }
    }
}