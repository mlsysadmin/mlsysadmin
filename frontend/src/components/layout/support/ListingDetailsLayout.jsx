import React, { useEffect, useRef, useState } from "react";
import CustomTextField from "../../custom/support/custom.TextField";
import SupportFeatureLayout from "./SupportFeatureLayout";
import Modal from "react-modal";
import "../../../styles/support/Support.css";
import CustomSelectTypeField from "../../custom/support/custom.SelectTypeField";
import TextArea from "antd/es/input/TextArea";
import SemiRoundBtn from "../../custom/buttons/SemiRoundBtn.custom";

Modal.setAppElement("#root"); // Set this to your app root element

const ListingDetailsLayout = (props) => {
  const countries = props.countries;
  const provinces = props.provinces;
  const cities = props.cities;
  const isShowDetails = props.isShowDetails;
  const listingDetails = props.listingDetails;

  const [subdivision, setSubdivision] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [mapLocation, setMapLocation] = useState("");
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [listing, setListing] = useState(false);

  const [fileList, setFileList] = useState([{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },]);

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const openFirstModal = () => setIsFirstModalOpen(true);
  const closeFirstModal = () => setIsFirstModalOpen(false);
  const openSecondModal = () => {
    closeFirstModal();
    setIsSecondModalOpen(true);
  };
  const closeSecondModal = () => setIsSecondModalOpen(false);
  const handleSubdivisionChange = (e) => setSubdivision(e.target.value);
  const handleCompleteAddressChange = (e) => setCompleteAddress(e.target.value);
  const handleMapLocationChange = (e) => setMapLocation(e.target.value);

  const [selectedOption, setSelectedOption] = useState("");

  const getBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleOnBeforeUpload = async (file) => {
    if (!file.url && !file.preview) {
      file.url = await getBase64(file);
      setFileList([...fileList, file])
      return false
    }
  };

  const handleOnRemoveUpload = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const ref = useRef(null)
  // const generateMapSrc = () => {
  //   const query = `${subdivision} ${completeAddress} ${mapLocation}`;
  //   return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(query)}`;
  // };

  useEffect(() => {
    console.log(listingDetails);

    setListing((prevState) => ({
      ...prevState,
      property_type: listingDetails.property_type.subtype,
      listing_type: listingDetails.listing_type.listing_type,
      price: listingDetails.unit_details.price,
      discounted_price: listingDetails.unit_details.discounted_price,
      furnishing: listingDetails.unit_details.furnishing,
      classification: listingDetails.unit_details.classification,
      no_of_beds: listingDetails.unit_details.no_of_beds,
      no_of_bathrooms: listingDetails.unit_details.no_of_bathrooms,
      parking: listingDetails.unit_details.parking,
      no_of_floors: listingDetails.unit_details.no_of_floors,
      floor_area: listingDetails.unit_details.floor_area,
      lot_area: listingDetails.unit_details.lot_area,
      price_per_sqm: listingDetails.unit_details.price_per_sqm,
      property_id: listingDetails.property_id,
      country: listingDetails.location.country,
      province: listingDetails.location.province,
      city: listingDetails.location.city,
      zipcode: listingDetails.location.zipcode,
      other: listingDetails.location.other,
      map_location: listingDetails.location.map_location,
      title: listingDetails.title,
      description: listingDetails.description,

    })
    )

  }, [listingDetails]);

  return (
    <>
      <div className="ListingDetails">
        <div className="leftSide">
          <div className="propertyDetailsText">Property Details</div>
          <div className="propertyDetailsFields">
            <CustomSelectTypeField
              labelName="Property Type"
              readOnly={isShowDetails}
              value={listingDetails.property_type.subtype}
              disabled={isShowDetails}
            />
            <CustomSelectTypeField labelName="Listing Type" />
          </div>
          <div className="unitDetailsText">Unit Details</div>
          <div className="unitDetailsFields">
            <CustomTextField inputType="input" labelName="Selling Price" />
            <CustomTextField
              inputType="input"
              labelName="Discounted Selling Price"
            />
            <CustomSelectTypeField labelName="Furnishing" />
            <CustomSelectTypeField labelName="Classification" />
            <CustomSelectTypeField labelName="Beds" />
            <CustomSelectTypeField labelName="Bathrooms" />
            <CustomSelectTypeField labelName="Parking" />
            <CustomSelectTypeField labelName="No of Floors" />
            <CustomTextField inputType="input" labelName="Floor Area (sqm)" />
            <CustomTextField inputType="input" labelName="Lot Area (sqm)" />
            <CustomTextField inputType="input" labelName="Price per sqm" />
            <CustomTextField inputType="input" labelName="Property ID" />
          </div>
          <div className="locationText">Location</div>
          <div className="support-location">
            <CustomSelectTypeField
              labelName="Country"
              countries={countries} />
            <CustomSelectTypeField
              labelName="Province/State"
              provinces={provinces} />
            <CustomSelectTypeField
              labelName="City/Town"
              cities={cities} />
            <CustomTextField
              inputType="input"
              labelName="Zipcode"
              value={subdivision}
              onChange={handleSubdivisionChange}
            />
          </div>
          <div>
            <CustomTextField
              inputType="input"
              labelName="House No/Unit/Building Name/Street"
              value={subdivision}
              onChange={handleSubdivisionChange}
            />
            <CustomTextField
              inputType="input"
              labelName="Map Location"
              value={mapLocation}
              onChange={handleMapLocationChange}
            />
          </div>
        </div>
        <div className="rightSide">
          <div className="descriptionText">Description</div>
          <div className="descriptionFields">
            <CustomTextField inputType="input" labelName="Title" />
            <br />
            <label htmlFor={'Caption'} className="caption-textLabel">
              Caption
            </label>
            <TextArea className="description-caption" name="" id="" rows={40} placeholder="Enter Caption"></TextArea>
            <div className="googleMapDisplay">
              {/* <iframe
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                src={generateMapSrc()}
                allowFullScreen
              ></iframe> */}
            </div>
          </div>
        </div>
        <SupportFeatureLayout
          beforeUpload={handleOnBeforeUpload}
          onRemoved={handleOnRemoveUpload}
          fileList={fileList}
          onPreview={handlePreview}
          previewImage={previewImage}
          previewOpen={previewOpen}
          setPreviewImage={setPreviewImage}
          setPreviewOpen={setPreviewOpen}
          ref={ref}
        />
        <Modal
          isOpen={isFirstModalOpen}
          onRequestClose={closeFirstModal}
          className="fmodal"
          overlayClassName="overlay"
          contentLabel="First Modal"
        >
          <h2>Confirmation Message</h2>
          <p>Are you sure you want to create listing?</p>
          <div>
            <button className="button button-primary" onClick={openSecondModal}>
              Confirm
            </button>
            <button
              className="button button-secondary"
              onClick={closeFirstModal}
            >
              Cancel
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isSecondModalOpen}
          onRequestClose={closeSecondModal}
          className="smodal"
          overlayClassName="overlay"
          contentLabel="Second Modal"
        >
          <h2>Successful Message</h2>
          <p>Listing successfully created!</p>
          <button className="button button-primary">Preview Listing</button>
        </Modal>
      </div>
      {
        !isShowDetails && (
          <div className="support--submit-btn">
            <div></div>
            <SemiRoundBtn
              className="submit-btn"
              onClick={openFirstModal}
              type={'primary'}
              label={'Create'}
              size={'large'}
            />
          </div>
        )
      }
    </>
  );
};

export default ListingDetailsLayout;
