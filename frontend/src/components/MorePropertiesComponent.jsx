import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";

import '../styles/moreProperties.css';
import { CameraFilled, CameraOutlined, HeartOutlined } from "@ant-design/icons";
import { CapitalizeEachWord, CapitalizeString } from "../utils/StringFunctions.utils";

const MorePropertiesComponent = ({ title, subtitle, propertyType, saleType }) => {

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
            imageCount: 0
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
                const filteredListing = getListingByPropertyType.filter((listing) =>
                    listing.PropertyType.toLowerCase() == propertyType.toLowerCase() && listing.SaleType == saleType
                ).slice(0, 6);

                const listing = filteredListing.map((list, i) => {
                    const formatPrice = Number(list.Price).toLocaleString()
                    const isRent = list.SaleType == saleType;

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
                        imageCount: 0
                    }
                })
                console.log(listing);

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
                            </div>
                            <div className="properties--group-card__details--middle">
                                <p>{item.subtitle}</p>
                            </div>
                            <div className="properties--group-card__details--bottom">
                                <div className="properties--group-card__details--bottom-left">
                                    <p>{item.price}</p>
                                </div>
                                <div className="properties--group-card__details--bottom-right">
                                    <p>{item.imageCount}</p>
                                    <p>{item.imageCount}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )
        })
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
                <button className="properties--group-card__button">View All</button>
            </div>
        </div>
    )
}

export default MorePropertiesComponent;