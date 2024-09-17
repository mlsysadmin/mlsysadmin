import {MLBROKERAGEAxiosInstance} from "../helper/axios";


const PostSellerListing = async (property_fields = {}) => {
	try {
		const {
			listing_id,
			seller,
			property_id,
			listing_status,
			current_level,
			level,
			title,
			description,
			property_type: { type, subtype } = {},
			listing_type_id,
			unit_details: {
				price,
				discounted_price,
				price_per_sqm,
				furnishing,
				classification,
				no_of_beds,
				no_of_bathrooms,
				no_of_floors,
				parking,
				floor_area,
				lot_area,
			} = {}, 
			location: {
				subdivision,
				city,
				province,
				other,
				zipcode,
				map_location,
			} = {}, 
			amenities: {
				indoor_features,
				outdoor_features,
				custom_amenities: { feature_name } = {}, 
				custom_inclusion: { inclusion_name } = {}, 
			} = {},
			photos: { photo, upload_date_time } = {}, 
		} = property_fields;

		const reqbody = {
			payload: {
				listing_id,
				seller,
				property_id,
				listing_status,
				current_level,
				level,
				description,
				title,
				property_type: { type, subtype },
				listing_type_id,
				unit_details: {
					price,
					discounted_price,
					price_per_sqm,
					furnishing,
					classification,
					no_of_beds,
					no_of_bathrooms,
					no_of_floors,
					parking,
					floor_area,
					lot_area,
				},
				location: { subdivision, city, province, other, zipcode, map_location },
				amenities: {
					indoor_features,
					outdoor_features,
					custom_amenities: { feature_name },
					custom_inclusion: { inclusion_name },
				},
				photos: {
					photo,
					upload_date_time,
				},
			},
		};

		console.log("Sending payload:", reqbody);

		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.REACT_APP_API_KEY,
			},
		};

		const response = await MLBROKERAGEAxiosInstance.post(
			`/api/seller/add-listing`,
			reqbody,
			config
		);

		if (response.status === 200) {
			console.log("Listing Data Posted Successfully");
		} else {
			console.error("Error posting data:", response.statusText);
		}
		return response.data;
	} catch (error) {
		console.log("Error:", error.message);
	}
};



export default PostSellerListing;
