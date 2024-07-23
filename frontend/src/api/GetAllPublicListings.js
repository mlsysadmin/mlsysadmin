
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
export default GetAllPublicListing