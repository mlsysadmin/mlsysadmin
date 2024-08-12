import React, { useEffect, useState } from "react";
import { ApprovalSectionComponent, SupportListingComponent } from "../../components/index";
import { useLocation, useOutletContext } from "react-router-dom";
import { GetListingDetailsByIdandStatus } from "../../api/Support/Listing.api";

const ListingDetailsPage = () => {

  const { setIsMessageLoadingOpen, setIndex, openMessage } = useOutletContext();

  const [listingId, setListingId] = useState('');
  const [tabTitle, setTabTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isShowDetails, setShowDetails] = useState(false);
  const [listingDetails, setListingDetails] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [listingSuccess, setListingSuccess] = useState(false);

  useEffect(() => {

    setIsMessageLoadingOpen(true);
    setIndex(-1);
    openMessage('loading', 'Retrieving listing...', 2);

    if (sessionStorage.getItem('props')) {

      const props = JSON.parse(sessionStorage.getItem('props'));
      setListingId(props.listing_id);
      setTabTitle(props.tabTitle);
      setIsEdit(props.isEditListing);
      setShowDetails(props.isShowDetails);

      GetListingDetails(props.listing_id);
    }
  }, []);

  const GetListingDetails = async (listing_id) => {
    try {

      const response = await GetListingDetailsByIdandStatus(listing_id);
      setListingDetails(response.data.listing);
      setApprovals(response.data.approvals);
      openMessage('success', response.message, 1);
      setIsMessageLoadingOpen(false);
      setIndex(100);
      setListingSuccess(true);

    } catch (error) {
      const data = error.data;
      console.log(error);
      openMessage('error', data.error.message, 3);
      setIsMessageLoadingOpen(false);
      setIndex(100);
    }
  }

  return (
    <>
      {
        listingSuccess ? (
          <>
            <SupportListingComponent
              isEditListing={isEdit} 
              tabTitle={tabTitle}
              isShowDetails={isShowDetails}
              listingId={listingId}
              setEditListing={setIsEdit}
              listingDetails={listingDetails} />
            <ApprovalSectionComponent
              approvals={approvals}
              level={listingDetails.current_level}
              isEditListing={isEdit}
              isShowDetails={isShowDetails} />
          </>
        ) : <></>
      }
    </>
  );
};

export default ListingDetailsPage;
