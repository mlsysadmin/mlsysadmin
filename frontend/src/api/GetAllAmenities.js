import MLBROKERAGEAxiosInstance from "../helper/axios";

const GetAllIndoorAmenities = async () =>{
    try{
      
      const res = await MLBROKERAGEAxiosInstance.get(`api/listing/get/all-amenities`);
      const indoorAmenities = res.data.data.data.amenities.indoor;
    //   console.log(indoorAmenities);
      return indoorAmenities;
    }catch (error){
      console.log("error");
      throw error
    }
  }

const GetAllOutdoorAmenities = async () =>{
    try{
      const res = await MLBROKERAGEAxiosInstance.get(`api/listing/get/all-amenities`);
      const outdoorAmenities = res.data.data.data.amenities.outdoor;
      return outdoorAmenities;
    }catch (error){
      console.log("error");
      throw error
    }
}

export{
  GetAllIndoorAmenities,
  GetAllOutdoorAmenities
}
 
