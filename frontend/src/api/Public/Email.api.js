import {
    MLBROKERAGEAxiosInstance
} from '../../helper/axios';

const SendEmailInquiry = async (payload) => {
    try {
        
        const config = {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        }

        const response = await MLBROKERAGEAxiosInstance.post('/api/public/mail/send-email-inquiry', { payload }, config);

        return response.data;
    } catch (error) {
        throw error;
    }
}

const SendEmailMessage = async (payload) => {
    try {

        const config = {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        }
        
        const response = await MLBROKERAGEAxiosInstance.post('/api/public/mail/send-email', { payload }, config);

        return response.data;

    } catch (error) {
        throw error;
    }
}

export {
    SendEmailInquiry,
    SendEmailMessage
}