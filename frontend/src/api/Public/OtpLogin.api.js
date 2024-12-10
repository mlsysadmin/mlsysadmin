import {
    MLBROKERAGEAxiosInstance
} from '../../helper/axios';

const SendOtp = async (cellphoneNumber) => {
    try {
        
        const config = {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        }

        const postData = {
            payload: {
                cellphoneNumber
            }
        }

        const response = await MLBROKERAGEAxiosInstance.post('/api/user/external-send-otp', postData, config);

        return response.data;

    } catch (error) {
        throw error;
    }
}

const ValidateOtpLogin = async (cellphoneNumber, pin) => {
    try {
        
        const config = {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        }

        const postData = {
            payload: {
                cellphoneNumber,
                pin
            }
        }

        const response = await MLBROKERAGEAxiosInstance.post('/api/user/external-login', postData, config);

        return response.data;
        
    } catch (error) {
        throw error;
    }
}

export {
    SendOtp,
    ValidateOtpLogin
}