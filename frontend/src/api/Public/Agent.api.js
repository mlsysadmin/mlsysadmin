import { IGOTSOLUTIONSAxiosInstance } from "../helper/axios";

const AddAgent = async () => {
  try {
    const response = await IGOTSOLUTIONSAxiosInstance.get(
      `api/addAgent/${property_no}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export { AddAgent };
