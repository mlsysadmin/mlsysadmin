import MLBROKERAGEAxiosInstance from "../helper/axios";

const GetAllCountry = async () => {
	try {
		const responsedata = await MLBROKERAGEAxiosInstance.get(`api/public/get/countries` ,{
            headers: {
                'x-api-key' : process.env.REACT_APP_API_KEY
            }
        });
		const countries = responsedata.data;
        console.log("countries", countries)
        return countries;
	} catch (error) {
        console.error(error);
    }
};

export default GetAllCountry;
