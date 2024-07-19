import MLBROKERAGEAxiosInstance from "../helper/axios";

const GetAllListingDrafts = async (seller_id) =>{
    try{
        const response = await MLBROKERAGEAxiosInstance.get(`api/seller/get/all-listings/draft/${seller_id}`);
        const sellerdrafts = response.data.data.

    }catch (error){
        error
    }
}