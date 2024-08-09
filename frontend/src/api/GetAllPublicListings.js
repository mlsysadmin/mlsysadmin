
import MLBROKERAGEAxiosInstance from "../helper/axios";

const GetAllPublicListing = async () =>{
    try {
        const response = await MLBROKERAGEAxiosInstance.get(`api/public/get/listing/all` ,{
            headers: {
                'x-api-key' : process.env.REACT_APP_API_KEY
            }
        });
        const allpubliclisting = response.data.data
        console.log("public listing: ", allpubliclisting);
        return allpubliclisting;
        
    } catch (error) {
        console.log(error);
    }
}

const GetPublicListingByID = async (params) =>{
    try {
       
        const payload = {

            listing_id: params.listing_id,
            property_status: params.property_status,
        }
        const config ={
            headers: {
                'x-api-key' :'AIzaSyDC86gN1O512Ucqzc9UEtYnyosw8vpLIFM'
            },
            params: {payload}
        }

        const response = await MLBROKERAGEAxiosInstance.get(`api/public/get/listing/one`,config);
        const listingbyID = response.data.data;
        console.log("listing by id: ", listingbyID);
        return listingbyID;

        
    } catch (error) {
        console.log(error);
        
    }
}
export {GetAllPublicListing, GetPublicListingByID} ;