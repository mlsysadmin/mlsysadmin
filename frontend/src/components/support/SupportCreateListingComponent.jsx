import { useEffect, useState } from "react";
import { GetCities, GetCountry, GetProvince } from "../../api/Public/Location.api";
import ListingDetailsLayout from "../layout/support/ListingDetailsLayout";
import SupportSubMenu from "./SupportSubMenu";
const SupportCreateListingComponent = () => {
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
    Countries();
    Provinces();
    Cities();
   }, [])
  return (
    <div className="SupportCreateListingDiv" style={{ width: "85%", margin: 'auto' }}>
      <SupportSubMenu title={'Create Listing'} isShowDetails={false}/>
      <ListingDetailsLayout 
        countries={countries}
        provinces={provinces}
        cities={cities}/>
    </div>
  );
};
export default SupportCreateListingComponent;
