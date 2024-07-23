import MLBROKERAGEAxiosInstance from "../helper/axios";

const PostSellerListing = async () => {
  try {
    const response = await MLBROKERAGEAxiosInstance.post(`api/seller/add-listing`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_type: {
          type: selectedPropertyTab,
        },
        listing_type: selectedListingTab,
      }),
    });

    if (response.ok) {
      console.log("Listing Data Posted");
    } else {
      console.error("Error posting data");
    }
  } catch (error) {
    console.log(error);
  }
};

export default PostSellerListing;
