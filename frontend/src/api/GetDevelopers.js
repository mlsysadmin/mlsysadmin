import { IGOTSOLUTIONSAxiosInstance } from "../helper/axios";

const getDevelopers = async () => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.REACT_APP_API_KEY,
			},
		};
		const response = await IGOTSOLUTIONSAxiosInstance.get(
			`api/getDevelopersWithTotalUnit`,
			config
		);
		console.log("developers", response.data);

		if (response.status === 200 || response.status === 201) {
			console.log("success");
			return response;
		} else {
			console.log("Error:", response.status.text);
			console.log(
				"Error Details:",
				response.message,
				response.stack,
				response.response
			);
		}
		return response.data;
	} catch (error) {
        console.error("Error:", caches.message);
				console.log(
					"Error Details:",
					error.message,
					error.stack,
					error.response
				);
    }
};

export { getDevelopers };
