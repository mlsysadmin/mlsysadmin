
import {
    MLBROKERAGEAxiosInstance,
    IGOTSOLUTIONSAxiosInstance
} from "../helper/axios";

const GetPropertiesBySaleStatus = async () =>{
    
    try {
        const response = await IGOTSOLUTIONSAxiosInstance.get(`/api/getPropertiesBySaleStatus/unsold`);

        return response;
        
    } catch (error) {
        console.log(error);
    }
}

const GetPublicListingByID = async (propertyNo) =>{
    try {

        const response = await IGOTSOLUTIONSAxiosInstance.get(`api/getPropertyById/${propertyNo}`);
        const listingbyID = response.data;
        console.log("listing by id: ", listingbyID);
        return listingbyID;
        
    } catch (error) {
        console.log(error);
        
    }
}
const GetPublicListingCount = async () => {
	try {
		const response = await MLBROKERAGEAxiosInstance.get(
			`api/public/get/listing/all`,
			{
				headers: {
					"x-api-key": process.env.REACT_APP_API_KEY,
				},
			}
		);
		const allPublicListing = response.data.data.data
	   const listingCount = allPublicListing.length;
			console.log("Number of public listings: ", listingCount);
			return listingCount;
	} catch (error) {
		console.log("Error fetching public listings:", error);
		return 0; 
	}
};

const GetUnitPhotos = async (unitId) => {
    try {
        
        const response = await IGOTSOLUTIONSAxiosInstance.get(`api/getUnitPhotos/${unitId}`);

        const unitPhotos = response.data;

        return unitPhotos;
        

    } catch (error) {
        console.log(error);
        return error
    }
}

export { GetPropertiesBySaleStatus, GetPublicListingByID, GetPublicListingCount, GetUnitPhotos };