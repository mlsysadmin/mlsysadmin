'use strict'

import { IGOTSOLUTIONSAxiosInstance } from "../../helper/axios";

const AddAgent = async (reqBody) => {
  try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.REACT_APP_API_KEY,
			},
		};
    const response = await IGOTSOLUTIONSAxiosInstance.post(
      `api/addAgentByAgent`,
      reqBody,
			config
    );
    if (response.status === 200 || response.status === 201) {
			console.log("Listing Data Posted Successfully");
			return response.data;
		} else {
			console.error("Error posting data:", response.statusText);
			console.log("Error details:", {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				data: response.data,
			});
	}
  } catch (error) {
    console.error("Error occurred while posting listing:", error);
    console.log("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response, })
	  throw error;
  }
  
};
const GetControlLastNumber = async (idType) => {
    try {
      const response = await IGOTSOLUTIONSAxiosInstance.get(
        `api/getControlLastNumber/${idType}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
const GetAgentByContactNumber = async (number) => {
  try {
    const config = {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.REACT_APP_API_KEY,
			},
		};

    const response = await IGOTSOLUTIONSAxiosInstance.get(
			`api/getAgentByContactNo/${number}`,
			config
		);
    console.log("agent data retrieved", response);
    
    return response.data;
    
  } catch (error) {
     console.error("Error occurred while posting listing:", error);
    console.log("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response, })
  }

}
const GetAgentByRecordStatus = async () => {
  try {
     const config = {
				headers: {
					"Content-Type": "application/json",
					"x-api-key": process.env.REACT_APP_API_KEY,
				},
			};
      const response = await IGOTSOLUTIONSAxiosInstance.get(
				`api/getAgentsByRecordStatus/active`,
				config
			);
      console.log("active", response.data);
       return response.data;
      
  } catch (error) {
         console.error("Error occurred while posting listing:", error);
					console.log("Error details:", {
						message: error.message,
						stack: error.stack,
						response: error.response,
					});
  }

}

export {
	AddAgent,
	GetControlLastNumber,
	GetAgentByContactNumber,
	GetAgentByRecordStatus,
};
