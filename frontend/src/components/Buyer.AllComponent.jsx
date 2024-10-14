import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/All.css";
import Card from "./custom/cards/Card";
import property from "../images/Guest/property.png";
import { CardSkeleton } from "./Skeleton";
import Pagination from "./custom/pagination/Pagination";
import {
  FooterComponent,
  CustomMlFooter,
  ListingSearch,
  MainLayout,
  SearchPropertiesSoration,
} from "../components";
import {
  GetPropertiesBySaleStatus,
  GetUnitPhotos,
} from "../api/GetAllPublicListings";
import { GetAllFeaturesByPropertyNo } from "../api/GetAllAmenities";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto";
import {
  CapitalizeString,
  FillLocationFilter,
  GetPropertyTitle,
  isPastAMonth,
} from "../utils/StringFunctions.utils";
import NoListingAvailable from "./custom/custom.NoListingAvailable";

import DefaultPropertyImage from "../asset/fallbackImage.png";
import { GetAllListing } from "../api/GetAllPublicListings";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import NoDataAvailable from "./NoDataFoundComponent";
import { capitalize } from "@mui/material";

const AllComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [saleType, setSaleType] = useState("sale");

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const [publiclisting, setPublicListing] = useState([
    {
      id: 0,
      title: "",
      price: 0,
      status: "",
      pics: 0,
      img: DefaultPropertyImage,
      bathrooms: 0,
      lot: 0,
      property_no: "",
      isFeatured: "",
      sale_type: "",
      bedrooms: "",
      property_type: "",
      city: "",
      parking: 0,
      location: ""
    },
  ]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [headerText, setHeaderText] = useState('');

  const handleCardClick = (id) => {
    navigate(`/previewListing/?id=${id}`, { state: id });
  };

  // const getlistings = async (
  //   keyword,
  //   whatLocation,
  //   propertyType,
  //   listingType,
  //   indoor,
  //   outdoor
  // ) => {
  //   try {
  //     const res = await GetPropertiesBySaleStatus();
  //     const dataresp = res.data;

  //     if (dataresp.length == 0) {
  //       setPublicListing([]);
  //     } else {
  //       const features = [];
  //       const propertyNos = dataresp.map((item) => item.PropertyNo);

  //       const results = await Promise.all(
  //         propertyNos.map((propertyNo) =>
  //           GetAllFeaturesByPropertyNo(propertyNo)
  //         )
  //       );
  //       const filteredFeatures = results.filter(
  //         (resFeature) =>
  //           resFeature && resFeature.data && resFeature.data.length > 0
  //       );

  //       filteredFeatures.forEach((resFeature) => {
  //         const featureNames = resFeature.data.map(
  //           (feature) => feature.FeatureName
  //         );
  //         features.push({
  //           PropertyNo: resFeature.data[0].PropertyNo,
  //           FeatureName: featureNames.join(", "),
  //         });
  //       });
  //       const searchedFeatures = dataresp.filter((resp) =>
  //         features.some((feature) => feature.PropertyNo === resp.PropertyNo)
  //       );

  //       const listingRes =
  //         listingType === undefined || null
  //           ? dataresp.filter((listing) =>
  //             ["sale", "rent"].includes(listing.SaleType.toLowerCase())
  //           )
  //           : dataresp.filter((listing) => {
  //             // console.log(
  //             //   "searchedFeatures.some((feature) => feature.PropertyNo === listing.PropertyNo: ",
  //             //   listing.PropertyNo.toLowerCase().includes(
  //             //     searchedFeatures.some(
  //             //       (feature) => feature.PropertyNo === listing.PropertyNo
  //             //     )
  //             //   )
  //             // );

  //             return keyword
  //               ? listing.UnitName.toLowerCase().includes(
  //                 keyword.toLowerCase()
  //               )
  //               : whatLocation
  //                 ? listing.City.toLowerCase().includes(
  //                   whatLocation.toLowerCase()
  //                 )
  //                 : propertyType
  //                   ? listing.PropertyType.toLowerCase().includes(
  //                     propertyType.toLowerCase()
  //                   )
  //                   : searchedFeatures
  //                     ? searchedFeatures.some(
  //                       (feature) => feature.PropertyNo === listing.PropertyNo
  //                     )
  //                     : listing.SaleType.toLowerCase().includes(
  //                       listingType.toLowerCase()
  //                     );
  //           });
  //       if (listingRes.length !== 0) {
  //         const listings = await Promise.all(
  //           listingRes.map(async (item, i) => {
  //             const getPhotoGallery = await GetUnitPhotos(item.id);

  //             const gallery = getPhotoGallery.data;

  //             const image = GetPhotoWithUrl(item.Photo);

  //             return {
  //               id: item.id,
  //               title: CapitalizeString(item.UnitName),
  //               price: AmountFormatterGroup(item.Price),
  //               status: `For ${CapitalizeString(item.SaleType)}`,
  //               pics: image ? gallery.length + 1 : 0,
  //               img: image,
  //               bathrooms: item.BathRooms,
  //               lot: item.LotArea,
  //               property_no: item.PropertyNo,
  //               isFeatured: item.IsFeatured,
  //               sale_type: CapitalizeString(item.SaleType),
  //               bedrooms: item.BedRooms,
  //               property_type: item.PropertyType,
  //               city: item.City,
  //               parking: item.Parking,
  //               location: item.City
  //             };
  //           })
  //         );

  //         const location = FillLocationFilter(listings);
  //         setFilterLocation(location);
  //         setPublicListing(listings);
  //         setLoading(false);

  //       } else {
  //         setPublicListing([]);
  //         setLoading(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching public listings:", error);
  //     setPublicListing([]);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // allPublicListing()
    // getlistings()
    const search = location.search;

    const queryParams = new URLSearchParams(search);
    const isSearchParams = queryParams.get("search");
    // const sale_type = queryParams.get("sale_type");
    // const keyword = queryParams.get("keyword") ?? undefined;
    // const city = queryParams.get("location") ?? undefined;
    // const property_type = queryParams.get("property_type")?.replace(/-/g, " ") ?? undefined;
    // const indoor = queryParams.get("indoor") ?? undefined;
    // const outdoor = queryParams.get("outdoor") ?? undefined;

    const searchKeys = ['sale_type', 'keyword', 'property_type', 'location', 'indoor', 'outdoor'];
    const searchParams = searchKeys
      .filter((key, i) => queryParams.get(key) != undefined || queryParams.get(key) != null)
      .map(item => {
        return { [item]: queryParams.get(item) }
      })

    if (isSearchParams && searchParams.length !== 0) {
      // getlistings(
      //   keyword,
      //   city,
      //   property_type,
      //   sale_type,
      //   indoor,
      //   outdoor
      // );
      getlistings(true, searchParams);
      setHeaderText('Search Properties')
    } else {
      if (!isSearchParams && queryParams.size !== 0) {
        // getlistings(
        //   keyword,
        //   city,
        //   property_type,
        //   sale_type,
        //   indoor,
        //   outdoor
        // );
        // setSaleType(sale_type);
      } else {
        getlistings(false, "all");
        // setSaleType("Rent/Sale");
        setHeaderText(`All Properties for Rent/Sale`);
      }
    }
  }, []);

  const getlistings = async (isSearch, renderParams) => {
    try {

      console.log(renderParams);

      const res = await GetPropertiesBySaleStatus();
      const dataresp = res.data;

      if (dataresp.length !== 0) {
        if (isSearch) {
          const formattedListings = dataresp.map((listing) => {
            return {
              id: listing.id,
              title: CapitalizeString(listing.UnitName),
              price: AmountFormatterGroup(listing.Price),
              status: `For ${CapitalizeString(listing.SaleType)}`,
              pics: 0,
              img: listing.Photo,
              bathrooms: listing.BathRooms,
              lot: listing.LotArea,
              property_no: listing.PropertyNo,
              isFeatured: listing.IsFeatured,
              sale_type: CapitalizeString(listing.SaleType),
              bedrooms: listing.BedRooms,
              property_type: listing.PropertyType,
              city: listing.City,
              parking: listing.Parking,
              location: listing.City
            }
          });
          // console.log("DATA: ",  formattedListings);

          const filteredListings = formattedListings.map((item, i) => {

            // Get all keys from listings
            const listingKeys = Object.keys(item);

            // Get all keys from params
            const paramsKeys = renderParams.flatMap(params => Object.keys(params));

            // Matched keys from params and listing
            const matchedKeys = listingKeys.filter(key => paramsKeys.includes(key));

            const findParams = matchedKeys.map(key => {

              let paramsVal = {};

              renderParams.forEach((search, k) => {
                if (Object.keys(search).includes(key)) {
                  paramsVal[key] = search[key]
                }
              });
              return paramsVal
            });

            

            return { ...findParams }
          });

          console.log("filteredListings", filteredListings);

        }
      } else {
        setPublicListing([]);
        setLoading(false);
      }

      // if (dataresp.length == 0) {
      //   setPublicListing([]);
      // } else {
      //   const features = [];
      //   const propertyNos = dataresp.map((item) => item.PropertyNo);

      //   const results = await Promise.all(
      //     propertyNos.map((propertyNo) =>
      //       GetAllFeaturesByPropertyNo(propertyNo)
      //     )
      //   );
      //   const filteredFeatures = results.filter(
      //     (resFeature) =>
      //       resFeature && resFeature.data && resFeature.data.length > 0
      //   );

      //   filteredFeatures.forEach((resFeature) => {
      //     const featureNames = resFeature.data.map(
      //       (feature) => feature.FeatureName
      //     );
      //     features.push({
      //       PropertyNo: resFeature.data[0].PropertyNo,
      //       FeatureName: featureNames.join(", "),
      //     });
      //   });
      //   const searchedFeatures = dataresp.filter((resp) =>
      //     features.some((feature) => feature.PropertyNo === resp.PropertyNo)
      //   );

      //   const listingRes =
      //     listingType === undefined || null
      //       ? dataresp.filter((listing) =>
      //         ["sale", "rent"].includes(listing.SaleType.toLowerCase())
      //       )
      //       : dataresp.filter((listing) => {
      //         // console.log(
      //         //   "searchedFeatures.some((feature) => feature.PropertyNo === listing.PropertyNo: ",
      //         //   listing.PropertyNo.toLowerCase().includes(
      //         //     searchedFeatures.some(
      //         //       (feature) => feature.PropertyNo === listing.PropertyNo
      //         //     )
      //         //   )
      //         // );

      //         return keyword
      //           ? listing.UnitName.toLowerCase().includes(
      //             keyword.toLowerCase()
      //           )
      //           : whatLocation
      //             ? listing.City.toLowerCase().includes(
      //               whatLocation.toLowerCase()
      //             )
      //             : propertyType
      //               ? listing.PropertyType.toLowerCase().includes(
      //                 propertyType.toLowerCase()
      //               )
      //               : searchedFeatures
      //                 ? searchedFeatures.some(
      //                   (feature) => feature.PropertyNo === listing.PropertyNo
      //                 )
      //                 : listing.SaleType.toLowerCase().includes(
      //                   listingType.toLowerCase()
      //                 );
      //       });
      //   if (listingRes.length !== 0) {
      //     const listings = await Promise.all(
      //       listingRes.map(async (item, i) => {
      //         const getPhotoGallery = await GetUnitPhotos(item.id);

      //         const gallery = getPhotoGallery.data;

      //         const image = GetPhotoWithUrl(item.Photo);

      //         return {
      //           id: item.id,
      //           title: CapitalizeString(item.UnitName),
      //           price: AmountFormatterGroup(item.Price),
      //           status: `For ${CapitalizeString(item.SaleType)}`,
      //           pics: image ? gallery.length + 1 : 0,
      //           img: image,
      //           bathrooms: item.BathRooms,
      //           lot: item.LotArea,
      //           property_no: item.PropertyNo,
      //           isFeatured: item.IsFeatured,
      //           sale_type: CapitalizeString(item.SaleType),
      //           bedrooms: item.BedRooms,
      //           property_type: item.PropertyType,
      //           city: item.City,
      //           parking: item.Parking,
      //           location: item.City
      //         };
      //       })
      //     );

      //     const location = FillLocationFilter(listings);
      //     setFilterLocation(location);
      //     setPublicListing(listings);
      //     setLoading(false);

      //   } else {
      //     setPublicListing([]);
      //     setLoading(false);
      //   }
      // }
      setPublicListing([])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching public listings:", error);
      setPublicListing([]);
      setLoading(false);
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = publiclisting.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(publiclisting?.length / cardsPerPage);
  return (
    <div className="all-container">
      <div className="all-searchcomponent">
        <ListingSearch location={filterLocation} />
      </div>
      <div className="all-page-container">
        <span className="all-h1">
          {/* Properties For {capitalize(saleType)} */}
          {headerText}
        </span>
        {currentCards.length !== 0 ? (
          <>
            <SearchPropertiesSoration
              properties_count={publiclisting.length}
              current_properties_count={currentCards.length}
            />
            {!loading ? (
              currentCards.length !== 0 ? (
                <div className="card-container">
                  {currentCards.map((data, index) => (
                    <Card
                      key={index}
                      id={data.id}
                      title={data.title}
                      price={`PHP ${data.price}`}
                      imgSrc={data.img}
                      beds={data.bedrooms}
                      baths={data.bathrooms}
                      size={data.lot}
                      likes={data.pics}
                      forsale={data.status}
                      subtitle={`${CapitalizeString(
                        data.property_type
                      )} For ${CapitalizeString(data.sale_type)}`}
                      handleClick={() => handleCardClick(data.property_no)}
                    />
                  ))}
                </div>
              ) : (
                <NoDataAvailable
                  message={`No available properties for Rent/Sale`}
                />
              )
            ) : (
              <div
                className="card-skeleton-loading"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
              </div>
            )}
          </>
        ) : (
          <NoDataAvailable message={`No available properties for Rent/Sale`} />
        )}

        {currentCards.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={setCurrentPage}
          />
        )}
      </div>
      <CustomMlFooter />
      <FooterComponent />
    </div>
  );

};

export default AllComponent;
