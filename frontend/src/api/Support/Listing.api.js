import MLBROKERAGEAxiosInstance from "../../helper/axios";

const GetAllPendingMasterList = async (payload) => {
    try {

        const config = {
            params: {
                payload
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

        const response = await MLBROKERAGEAxiosInstance.get(`/api/support/get/listing/denied/all`);

        return response.data.data;
        
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

export {
    GetAllPendingMasterList,
    GetAllActiveMasterList,
    GetAllDeniedList
}