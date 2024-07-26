'use strict'

const { default: MLBROKERAGEAxiosInstance } = require("../../helper/axios");

const Config = (params, headers) => {
    const config = {
        headers: {
            ...headers
        },
        params: {
            ...params
        }
    }

    return config;
}

const CallGetApi = async (endpoint, config) => {

    try {

        const response = await MLBROKERAGEAxiosInstance.get(endpoint, config);

        return response.data;
        
    } catch (error) {
        throw error;
    }
}

const GoogleSignIn = async () => {
    try {

        const endpoint = `api/user/support/sign-in`

        const headers = {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
        const config = Config({}, headers);

        const getUrl = await CallGetApi(endpoint, config);

        return getUrl;
        
    } catch (error) {
        throw error.response;
    }
}

export {
    GoogleSignIn
}