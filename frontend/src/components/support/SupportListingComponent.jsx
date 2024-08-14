import { useEffect, useState } from "react";
import { GetCities, GetCountry, GetProvince } from "../../api/Public/Location.api";
import ListingDetailsLayout from "../layout/support/ListingDetailsLayout";
import SupportSubMenu from "./SupportSubMenu";
import SemiRoundBtn from "../custom/buttons/SemiRoundBtn.custom";
import LocationIcon from "../../asset/icons/location.png";
import GlobeIcon from "../../asset/icons/globe.png";

import "../../styles/support/Support.css";

import { icon } from "leaflet";
import AntdModal from "../modals/AntdModal";
import MapWrapper from "../custom/custom.mapWrapper";
import MapComponent from "../mapComponent";
const SupportListingComponent = (props) => {
  const { isEditListing, tabTitle, isShowDetails, listingId, setEditListing, listingDetails } = props;
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const center = [10.3157, 123.8854];

  const Countries = async () => {
    try {
      const countries = await GetCountry();
      setCountries(countries);

    } catch (error) {
      console.log(error);
    }

  }

  const Provinces = async () => {
    try {
      const provinces = await GetProvince();

      setProvinces(provinces)

    } catch (error) {
      console.log(error);
    }

  }
  const Cities = async () => {
    try {
      const cities = await GetCities();

      setCities(cities)

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {

    if (!isEditListing && !isShowDetails) {
      // Countries();
      // Provinces();
      // Cities();
    }
  }, [])

  const subBtns = [
    {
      label: 'Edit Listing',
      onClick: () => { setEditListing(true) },
      icon: <></>
    },
    {
      label: 'Show Property on Map',
      onClick: () => { setIsModalOpen(true) },
      icon: <img src={LocationIcon} alt="location-icon" width={20} />
    },
    {
      label: 'View Listing as Public',
      onClick: () => { },
      icon: <img src={GlobeIcon} alt="globe-icon" width={15} />
    }
  ]

  const SubButtons = () => {
    return subBtns.map((btn, index) => {
      if (listingDetails.listing_status !== "PENDING" && isShowDetails) {
        if (btn.label === 'Edit Listing') {
          return null;
        }
      }
      return (
        <SemiRoundBtn
          key={index}
          label={btn.label}
          handleClick={btn.onClick}
          icon={btn.icon}
          size='large'
          className={'listing-details--sub-btn'}
        />
      )
    })
  }

  const ModalContent = () => {

    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={LocationIcon} alt="location-icon" width={20} />
          <span>Cebu City, Cebu</span>
        </div>
        <MapWrapper
          style={{ margin: '20px 0px', height: "260px" }}
          children={
            <MapComponent
              coordinates={center}
              style={{ height: "260px", width: "100%", borderRadius: "20px" }}
            />
          }
        />
        <div className="is-btn--wrapper" style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <SemiRoundBtn
            label={'Close'}
            type={'default'}
            handleClick={() => { setIsModalOpen(false) }}
            className={'is-btn'}
          />
        </div>
      </>
    )
  }
  return (
    <div className="support-listing--wrapper" style={{ width: "85%", margin: 'auto' }}>
      <SupportSubMenu title={tabTitle} isShowDetails={isShowDetails} listingId={listingId} />
      {
        isShowDetails && (
          <>
            <div className="sub-btns">
              <SubButtons />
            </div>
            <AntdModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              title={'Show Property on Map'}
              isOkBtn={null}
              footer={null}
              handleClick={() => { setIsModalOpen(false) }}
              children={<ModalContent />}
            />
          </>
        )
      }
      <ListingDetailsLayout
        countries={countries}
        provinces={provinces}
        cities={cities}
        isShowDetails={isShowDetails}
        isEditListing={isEditListing}
        listingDetails={listingDetails}
        setEditListing={setEditListing}
        listingId={listingId}
        coordinates={center}
      />
    </div>
  );
};
export default SupportListingComponent;
