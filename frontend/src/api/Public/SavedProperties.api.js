'use strict'

import { IGOTSOLUTIONSAxiosInstance } from "../../helper/axios";

const GetSavedPropertiesBySellerNo = async (number) => {
	try {
		const response = await IGOTSOLUTIONSAxiosInstance.get(
			`api/getSavedPropertiesByContactNo/${number}`
		);
		return response;
	} catch (error) {
		throw error;
	}
};
  
export { GetSavedPropertiesBySellerNo };
