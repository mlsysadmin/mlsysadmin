
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
        const response = await IGOTSOLUTIONSAxiosInstance.get(`/api/getPropertiesBySaleStatus/unsold`);

	        const listingCount = response.data.length;
			console.log("Number of public listings: ", listingCount);
			return listingCount;
	} catch (error) {
		console.log("Error fetching public listings:", error);
		return 0; 
	}
};

// const GetAllListing = async () =>{
//     try{
//         const response = await IGOTSOLUTIONSAxiosInstance.get(
// 					`api/getProperties`,
// 					{
// 						headers: {
// 							"x-api-key": process.env.REACT_APP_API_KEY,
// 						},
// 					}
// 				);

//         console.log("all listings:", response);
//         return response;

//     }catch (error){
//         return error;
//     }
// }

const GetUnitPhotos = async (unitId) => {
    try {
        
        const response = await IGOTSOLUTIONSAxiosInstance.get(`api/getUnitPhotos/${unitId}`);

        const unitPhotos = response;

        return unitPhotos;
        

    } catch (error) {
        console.log(error);
        return error
    }
}

export {
	GetPropertiesBySaleStatus,
	GetPublicListingByID,
	GetPublicListingCount,
	GetUnitPhotos,
	// GetAllListing,
};