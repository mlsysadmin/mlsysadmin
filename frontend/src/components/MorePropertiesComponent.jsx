import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { GetPropertiesBySaleStatus, GetUnitPhotos } from "../api/GetAllPublicListings";

import '../styles/moreProperties.css';
import { CameraFilled, CameraOutlined, HeartOutlined } from "@ant-design/icons";
import { CapitalizeEachWord, CapitalizeString } from "../utils/StringFunctions.utils";

// ICONS
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";

const MorePropertiesComponent = ({ title, subtitle, propertyType, saleType, filterValue, filterProperty }) => {

    const [properties, setProperties] = useState([
        {
            title: "",
            photo: "",
            price: "",
            subtitle: "",
            area: "",
            bathrooms: "",
            bedrooms: "",
            isFeatured: false,
            saleType: "",
            imageCount: 0,
            city: ""
        }
    ]);

    useEffect(() => {
        getListingByPropertyType()
    }, [])
    const getListingByPropertyType = async () => {
        try {
            const getListingByPropertyType = await GetPropertiesBySaleStatus();

            const URL = process.env.REACT_APP_IGOT_API_URL;

            if (getListingByPropertyType.length > 0) {
                console.log(getListingByPropertyType);

                let filteredListing;

                filterProperty.forEach(fp => {

                    filteredListing = getListingByPropertyType.filter(fList => filterValue == fList[fp]);
                });

                filteredListing = filteredListing.filter((listing) =>
                    listing.PropertyType == propertyType && listing.SaleType == saleType
                ).slice(0, 6)
                const listing = await Promise.all(
                    filteredListing.map(async (list, i) => {

                        const formatPrice = Number(list.Price).toLocaleString()
                        const isRent = list.SaleType == saleType;

                        const getPhotoGallery = await GetUnitPhotos(list.id);

                        const gallery = getPhotoGallery.data;

                        return {
                            title: list.UnitName,
                            photo: `${URL}/${list.Photo}`,
                            price: `PHP ${formatPrice} ${isRent ? '/ month' : ''}`,
                            subtitle: `${CapitalizeEachWord(list.PropertyType)} For ${CapitalizeString(list.SaleType)}`,
                            area: list.LotArea,
                            bathrooms: list.BathRooms,
                            bedrooms: list.BedRooms,
                            isFeatured: list.IsFeatured,
                            saleType: `For ${CapitalizeString(list.SaleType)}`,
                            imageCount: list.Photo ? gallery.length + 1 : 1,
                            city: list.City
                        }
                    })
                )

                setProperties(listing);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const PropertiesByPropertyType = () => {
        return properties.map((item, k) => {
            return (
                <div className="properties--group-card__card">
                    <Card key={k} className="properties--group-card__card-item">
                        <div className="properties--group-card__card-image">
                            <img src={item.photo} alt={item.Name} />
                        </div>
                        <div className="properties--group-card__card--tags">
                            <div className="tag--top">
                                <div className="properties--group-card--tag-wrapper">
                                    <div className="tag-value--text">
                                        <p>{item.saleType}</p>
                                    </div>
                                </div>
                                <div className="properties--group-card--tag-wrapper">
                                    <div className="tag-icon">
                                        <CameraFilled className="tag-icon__camera" />
                                    </div>
                                    <div className="tag-value">
                                        <div className="tag-value--text">
                                            <p>{item.imageCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tag--bottom">
                                <div className="properties--group-card--tag-wrapper tag--heart">
                                    <div className="tag-icon icon-heart">
                                        <HeartOutlined className="tag-icon__heart" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="properties--group-card__details">
                            <div className="properties--group-card__details--top">
                                <p>{item.title}</p>
                                {/* <p>Newly Built and Furnished Condominium dsdsffdsd dsds This is some long text that will not fit in the box.</p> */}
                            </div>
                            <div className="properties--group-card__details--middle">
                                <p>{item.subtitle}</p>
                            </div>
                            <div className="properties--group-card__details--bottom">
                                <div className="properties--group-card__details--bottom-left">
                                    <p>{item.price}</p>
                                </div>
                                <div className="properties--group-card__details--bottom-right">
                                    {
                                        Features(item.bedrooms, item.bathrooms, item.area)
                                    }
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )
        })
    }

    const Features = (no_of_beds, no_of_bathrooms, lot) => {
        return (
            <div className="more-properties__features">
                {
                    parseInt(no_of_beds) > 0 && (
                        <div className="feature-content">
                            <>
                                <BedOutlinedIcon />
                                <p className="feature-detail">{no_of_beds}</p>
                            </>
                        </div>
                    )
                }
                {
                    parseInt(no_of_bathrooms) > 0 && (
                        <div className="feature-content">
                            <>
                                <ShowerOutlinedIcon />
                                <p className="feature-detail">{no_of_bathrooms}</p>
                            </>
                        </div>
                    )
                }
                {
                    lot && (
                        <div className="feature-content">
                            {/* <img src={Sqm} alt="sqm" className="feature-icon" /> */}
                            <ShortcutOutlinedIcon />
                            <p className="feature-detail">{lot} SqM</p>
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <div className="properties--group-card">
            <div className="properties--group-card__header">
                <div className="properties--group-card__title">
                    <h2>{title}</h2>
                </div>
                <div className="properties--group-card__sub-title">
                    <p>{subtitle}</p>
                </div>
            </div>
            <div className="properties--group-card__cards">
                <PropertiesByPropertyType />
            </div>
            <div className="properties--group-card__button">
                <Button size="large" className="properties--group-card__button">View more properties</Button>
            </div>
        </div>
    )
}

export default MorePropertiesComponent;