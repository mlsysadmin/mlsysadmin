'use strict'

import { IGOTSOLUTIONSAxiosInstance } from "../../helper/axios";

const GetSavedPropertiesBySellerNo = async (sellerNo) => {
    try {
      const response = await IGOTSOLUTIONSAxiosInstance.get(
        `api/getSavedPropertiesBySellerNo/${sellerNo}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  
export { GetSavedPropertiesBySellerNo };
