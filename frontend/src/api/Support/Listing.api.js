import MLBROKERAGEAxiosInstance from "../../helper/axios";

const GetAllPendingMasterList = async (payload) => {
    try {

        const config = {
            params: {
                payload
            },
            headers:{
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        }

        const response = await MLBROKERAGEAxiosInstance.get(`/api/support/get/listing/for-approval`, config)

        return response.data.data;
        
    } catch (error) {
        throw error.response.data;
    }
}

const GetAllActiveMasterList = async (payload) => {
    try {

        const config = {
            params: {
                ...payload
            },
            headers:{
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        }

        const response = await MLBROKERAGEAxiosInstance.get(`/api/support/get/listing/master/all`, config)

        return response.data.data;
        
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

const GetAllDeniedList = async () => {
    try {

        const config = {
            headers:{
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        }
        const response = await MLBROKERAGEAxiosInstance.get(`/api/support/get/listing/denied/all`, config);

        return response.data.data;
        
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}
const GetSummary = async (payload) => {
    try {
        console.log(payload);
        
        const config = {
            headers:{
                'x-api-key': process.env.REACT_APP_API_KEY
            },
            params: {
                payload
            }
        }
        const response = await MLBROKERAGEAxiosInstance.get(`/api/support/get/listing/total-summary`, config);

        return response.data.data;
        
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

const GetListingDetailsByIdandStatus = async (listing_id) => {
    try {

        const config = {
            headers:{
                'x-api-key': process.env.REACT_APP_API_KEY
            },
            params: {
                listing_id
            }
        }
        const response = await MLBROKERAGEAxiosInstance.get(`/api/support/get/listing/details/one`, config);

        return response.data.data;
        
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

export {
    GetAllPendingMasterList,
    GetAllActiveMasterList,
    GetAllDeniedList,
    GetSummary,
    GetListingDetailsByIdandStatus
}