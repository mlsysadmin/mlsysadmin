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
import { Breadcrumb } from "antd";

const SearchListingComponent = () => {
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
    const [headerText, setHeaderText] = useState('Search Properties');
    const [breadCrumbItems, setBreadCrumbItems] = useState([
        {
            title: 'Home',
            href: '/'
        },
        {
            title: 'Search Properties',
        },
    ]);
    const [searchParams, setSearchParams] = useState({
        location: "",
        price_min: 0,
        price_max: 100000000,
        keyword: "",
        property_type: "",
        bedrooms: 0,
        bathrooms: 0,
        parking: 0,
        sale_type: "",
        lot_area: ""
    })

    const handleCardClick = (id) => {
        navigate(`/previewListing/?id=${id}`, { state: id });
    };

    useEffect(() => {
        const search = location.search;

        const queryParams = new URLSearchParams(search);
        const isSearchParams = queryParams.get("search");

        let searchQueryParams = {};

        const searchKeys = ['sale_type', 'keyword', 'property_type', 'location', 'indoor', 'outdoor'];
        const filtersearchKeys = searchKeys.filter((key, i) => queryParams.get(key) != undefined || queryParams.get(key) != null)

        for (let index = 0; index < Object.values(filtersearchKeys).length; index++) {

            setSearchParams((prevState) => ({
                ...prevState,
                [Object.values(filtersearchKeys)[index]]: queryParams.get(Object.values(filtersearchKeys)[index])
            }))
            searchQueryParams[Object.values(filtersearchKeys)[index]] = queryParams.get(Object.values(filtersearchKeys)[index]);
        }

        console.log("Search Query Params: ", searchQueryParams);

        if (searchParams.length !== 0) {
            getlistings(searchQueryParams);
            setHeaderText('Search Properties');
        } else {
            getlistings(searchParams);
            setHeaderText('Search Properties');
        }
    }, [location]);

    const getlistings = async (renderParams) => {
        try {

            console.log(renderParams);

            const res = await GetPropertiesBySaleStatus();
            const dataresp = res.data;

            if (dataresp.length !== 0) {
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

                const listings = formattedListings.flatMap((item, i) => {

                    // Get all keys from listings
                    const listingKeys = Object.keys(item);

                    // Get all keys from params
                    const paramsKeys = Object.keys(renderParams);

                    // Matched keys from params and listing
                    const matchedKeys = listingKeys.filter(key => paramsKeys.includes(key));

                    const findParams = matchedKeys.map(key => {
                        if (renderParams[key].toLowerCase() == item[key].toLowerCase()) {
                            return item;
                        }
                    });

                    return { ...findParams }
                });

                // Filter listing from undefined and distinct
                const filteredListings = listings.map((l, k) => {

                    const f = Object.keys(l);

                    for (let index = 0; index < f.length; index++) {
                        const element = f[index];

                        if (l[element] !== undefined) {

                            return l[element]
                        }
                    }
                }).filter(fl => fl !== undefined).filter(
                    (value, index, self) =>
                        index === self.findIndex((t) => t.property_no === value.property_no)
                );

                const finalFilteredListing = await Promise.all(
                    filteredListings.map(async ffl => {
                        const getPhotoGallery = await GetUnitPhotos(ffl.id);

                        const gallery = getPhotoGallery.data;

                        const image = GetPhotoWithUrl(ffl.img);

                        ffl['img'] = image;
                        ffl['pics'] = image ? gallery.length + 1 : 0;

                        return ffl;
                    })
                )

                setPublicListing(finalFilteredListing)
                setLoading(false);
                console.log("filteredListings", filteredListings);

            } else {
                setPublicListing([])
                setLoading(false)
            }
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
                <ListingSearch location={filterLocation} searchParams={searchParams} setSearchFilters={setSearchParams} />
            </div>
            <div className="all-page-container">
                <Breadcrumb
                    separator=">"
                    items={breadCrumbItems}
                    className="all-h1 breadcrumb--search" />
                <span className="all-h1">
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
                                            isFeatured={data.isFeatured}
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

export default SearchListingComponent;
