import { useEffect, useState } from "react";
import { GetCities, GetCountry, GetProvince } from "../../api/Public/Location.api";
import ListingDetailsLayout from "../layout/support/ListingDetailsLayout";
import SupportSubMenu from "./SupportSubMenu";
import SemiRoundBtn from "../custom/buttons/SemiRoundBtn.custom";
import LocationIcon from "../../asset/icons/location.png";
import GlobeIcon from "../../asset/icons/globe.png";

import "../../styles/support/Support.css";

import { icon } from "leaflet";
const SupportListingComponent = (props) => {
  const { isEditListing, tabTitle, isShowDetails, listingId, setEditListing, listingDetails } = props;
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

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
    console.log(listingDetails);
    
    if (!isEditListing) {
      Countries();
      Provinces();
      Cities();
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
      onClick: () => { },
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
  return (
    <div className="support-listing--wrapper" style={{ width: "85%", margin: 'auto' }}>
      <SupportSubMenu title={tabTitle} isShowDetails={isShowDetails} listingId={listingId} />
      {
        isShowDetails && (
          <div className="sub-btns">
            <SubButtons />
          </div>
        )
      }
      <ListingDetailsLayout
        countries={countries}
        provinces={provinces}
        cities={cities} 
        isShowDetails={isShowDetails}
        isEditListing={isEditListing}
        listingDetails={listingDetails}/>
    </div>
  );
};
export default SupportListingComponent;
