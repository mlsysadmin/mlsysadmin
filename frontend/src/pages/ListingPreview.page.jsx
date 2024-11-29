import React, { useEffect, useState } from "react";
import ImagePreviewComponent from "../components/ImagePreviewComponent";
import '../styles/listingPreview.css';

// Icons
import RedCamera from "../assets/icons/previewlisting/redcamera.png";
import {
    HeartFilled,
    HeartOutlined,
} from "@ant-design/icons";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PhpOutlinedIcon from '@mui/icons-material/PhpOutlined';

import { GetPublicListingByID } from "../api/GetAllPublicListings";
import { useLocation } from "react-router-dom";
import { Button, Input, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "../components/mapComponent";
import MorePropertiesComponent from "../components/MorePropertiesComponent";

const ListingPreview = () => {
    const location = useLocation();

    const [oneListing, setOneListing] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("dsdsfdgdgf");
        getlistingByID();
    }, []);

    const getlistingByID = async () => {
        setIsLoading(true);
        try {
            const search = location.search;
            const params = new URLSearchParams(search);
            const id = params.get("id");

            if (params.size != 0 && id) {
                const onelistingdata = await GetPublicListingByID(id);
                const dataresp = onelistingdata.data;

                if (Object.keys(dataresp).length === 0) {
                    setOneListing(null);
                } else {
                    // const features = await GetFeaturesByPropertyNo(dataresp.PropertyNo);
                    // const photos = await UnitPhotos(dataresp.id);

                    let photo = dataresp.Photo;
                    // if (photos.length !== 0) {
                    //   let gallery = photos.map((item, i) => {
                    //     return item.Photo;
                    //   });

                    //   gallery.push(photo);

                    //   setUnitPhotos(gallery);
                    // } else {
                    //   setUnitPhotos([photo]);
                    // }

                    // const getFeatures = features.filter(
                    //   (item) => item.Type === "features"
                    // );
                    // const getAmenities = features.filter(
                    //   (item) => item.Type === "amenities"
                    // );
                    // const getIncludes = features.filter(
                    //   (item) => item.Type === "includes"
                    // );

                    setOneListing(dataresp);
                    // setFeatures(getFeatures);
                    // setAmenities(getAmenities);
                    // setIncludes(getIncludes);
                }
            } else {
                setOneListing(null);
            }
        } catch (error) {
            console.log(error);
            setOneListing(null);
        } finally {
            setIsLoading(false);
        }
    };

    const columns = [
        {
            title: 'Specifications',
            dataIndex: 'item_1',
            key: 'item_1',
            render: (text) => <span style={{ fontWeight: '600' }}>{text}</span>,
        },
        {
            dataIndex: 'item_2',
            key: 'item_2',
        },
        {
            dataIndex: 'item_3',
            key: 'item_3',
            render: (text) => <span style={{ fontWeight: '600' }}>{text}</span>,
        },
        {
            dataIndex: 'item_4',
            key: 'item_4',
        }
    ];

    const data = [
        {
            key: '1',
            item_1: 'Property ID',
            item_2: 123456789,
            item_3: 'Floor Area',
            item_4: '300 SqM',
        },
        {
            key: '2',
            item_1: 'Listing Type',
            item_2: 'House for Sale',
            item_3: 'Lot Area',
            item_4: '300 SqM',
        },
        {
            key: '3',
            item_1: 'Furnishing',
            item_2: 'Furnished',
            item_3: 'Price per SqM',
            item_4: 'PHP400,000',
        },
    ];
    const columnsFeatures = [
        {
            title: 'Features',
            dataIndex: 'item_1',
            key: 'item_1',
        },
        {
            dataIndex: 'item_2',
            key: 'item_2',
        },
    ];

    const dataFeatures = [
        {
            key: '1',
            item_1: 'Property ID',
            item_2: 123456789,
        },
        {
            key: '2',
            item_1: 'Listing Type',
            item_2: 'House for Sale',
        },
        {
            key: '3',
            item_1: 'Furnishing',
            item_2: 'Furnished',
        },
    ];
    const columnsAmenities = [
        {
            title: 'Amenities',
            dataIndex: 'item_1',
            key: 'item_1',
        },
        {
            dataIndex: 'item_2',
            key: 'item_2',
        },
    ];

    const dataAmenities = [
        {
            key: '1',
            item_1: 'Property ID',
            item_2: 123456789,
        },
        {
            key: '2',
            item_1: 'Listing Type',
            item_2: 'House for Sale',
        },
        {
            key: '3',
            item_1: 'Furnishing',
            item_2: 'Furnished',
        },
    ];
    const columnsIncludes = [
        {
            title: 'Includes',
            dataIndex: 'item_1',
            key: 'item_1',
        },
        {
            dataIndex: 'item_2',
            key: 'item_2',
        },

    ];

    const dataIncludes = [
        {
            key: '1',
            item_1: 'Property ID',
            item_2: 123456789,
        },
        {
            key: '2',
            item_1: 'Listing Type',
            item_2: 'House for Sale',
        },
        {
            key: '3',
            item_1: 'Furnishing',
            item_2: 'Furnished',
        },
    ];

    return (
        <div className="listing-preview">
            <div className="listing-preview--container">
                <div className="listing-preview__image">
                    <ImagePreviewComponent />
                </div>
                <div className="listing-preview--tags">
                    <div className="tag--top">
                        <div className="listing-preview--tag">
                            <div className="tag-icon">
                                <img src={RedCamera} alt="Red Camera" />
                            </div>
                            <div className="tag-value">
                                <div className="tag-value--text">Tag 2</div>
                            </div>
                        </div>
                    </div>
                    <div className="tag--bottom">
                        <div className="listing-preview--tag-wrapper">
                            <div className="listing-preview--tag tag__sale-type">
                                <div className="tag-value--text">
                                    <p>For Sale</p>
                                </div>
                            </div>
                            <div className="listing-preview--tag tag__price">
                                <div className="tag-value--text">
                                    <p>PHP 120,000,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="listing-preview--tag-wrapper">
                            <div className="listing-preview--tag tag__btn">
                                <div className="tag-icon">
                                    <HeartOutlined className="tag-icon__heart" />
                                </div>
                                <div className="tag-value">
                                    <div className="tag-value--text">
                                        <p>Save</p>
                                    </div>
                                </div>
                            </div>
                            <div className="listing-preview--tag tag__btn">
                                <div className="tag-value--text">
                                    <p>Show All</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listing-preview--content">
                    <div className="listing-preview__listing-details">
                        <section className="listing-preview__listing-title">
                            <h4>5 Bedroom House for Rent in Maria Luisa Park</h4>
                            <p>Maria Luisa Estate Park, Banilad, Cebu City </p>
                            <p className="listing-preview__listing-pre-approved">
                                <a href="/pre-approved">Get Pre-Approved</a>
                            </p>
                        </section>
                        <section className="listing-preview__listing-about">
                            <h4>About this property</h4>
                            <div className="listing-preview__listing-about--items">
                                <div className="listing-preview__listing-about--item">
                                    <div className="listing-preview__listing-about-item--title">
                                        <p>Bedrooms</p>
                                    </div>
                                    <div className="listing-preview__listing-about-item--value">
                                        <BedOutlinedIcon />
                                        <p>5</p>
                                    </div>
                                </div>
                                <div className="listing-preview__listing-about--item">
                                    <div className="listing-preview__listing-about-item--title">
                                        <p>Bathrooms</p>
                                    </div>
                                    <div className="listing-preview__listing-about-item--value">
                                        <ShowerOutlinedIcon />
                                        <p>5</p>
                                    </div>
                                </div>
                                <div className="listing-preview__listing-about--item">
                                    <div className="listing-preview__listing-about-item--title">
                                        <p>Garage</p>
                                    </div>
                                    <div className="listing-preview__listing-about-item--value">
                                        <DirectionsCarFilledOutlinedIcon />
                                        <p>3</p>
                                    </div>
                                </div>
                                <div className="listing-preview__listing-about--item">
                                    <div className="listing-preview__listing-about-item--title">
                                        <p>Area</p>
                                    </div>
                                    <div className="listing-preview__listing-about-item--value">
                                        <ShortcutOutlinedIcon />
                                        <p>300 Sqm</p>
                                    </div>
                                </div>
                                <div className="listing-preview__listing-about--item">
                                    <div className="listing-preview__listing-about-item--title">
                                        <p>Price per Sqm</p>
                                    </div>
                                    <div className="listing-preview__listing-about-item--value">
                                        <PhpOutlinedIcon />
                                        <p>400,000</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="listing-preview__listing--description">
                            <h4>Description</h4>
                            <div className="listing-preview__listing-description">
                                <p>
                                    Maria Luisa Estate Park, Cebu’s most prestigious and most sought after
                                    residential development both by locals and foreigners alike, is set proudly
                                    atop the Banilad and Busay Hills of Cebu. It encompasses 200 hectares of prime
                                    residential property with the excellent reputation of being the most desirable
                                    and exclusive neighborhood to live in Cebu. Homes there catches the cool breeze
                                    while enjoying a magnificent view of the city and the Visayan sea. It has been
                                    known to provide comfort, security and safety to its residents.
                                </p>
                            </div>
                        </section>
                        <section className="listing-preview__listing-location">
                            <h4>Location</h4>
                            {
                                !isLoading && (
                                    <div className="listing-preview__map">
                                        <MapComponent oneListing={oneListing} />
                                    </div>
                                )
                            }
                        </section>
                        <section className="listing-preview__listing-specifications">
                            <h4>Property Details</h4>
                            <div className="listing-preview__listing-specifications--table">
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={false}
                                    size="middle"
                                    rowHoverable={false}
                                />
                            </div>
                        </section>
                        <section className="listing-preview__listing-highlights">
                            <h4>Property Highlights</h4>
                            <div className="listing-preview__listing-highlights--table">
                                <Table
                                    columns={columnsFeatures}
                                    dataSource={dataFeatures}
                                    pagination={false}
                                    size="middle"
                                    rowHoverable={false}
                                />
                            </div>
                            <div className="listing-preview__listing-highlights--table">
                                <Table
                                    columns={columnsAmenities}
                                    dataSource={dataAmenities}
                                    pagination={false}
                                    size="middle"
                                    rowHoverable={false}
                                />
                            </div>
                            <div className="listing-preview__listing-highlights--table">
                                <Table
                                    columns={columnsIncludes}
                                    dataSource={dataIncludes}
                                    pagination={false}
                                    size="middle"
                                    rowHoverable={false}
                                />
                            </div>
                        </section>
                    </div>
                    <div className="listing-preview__listing-contact">
                        {
                            !isLoading && (
                                <div className="listing-preview__listing-contact--wrapper">
                                    <div className="listing-preview__listing-contact--info">
                                        <div className="listing__contact--title">
                                            <h4>Contact Us</h4>
                                        </div>
                                        <div className="listing__contact--form">
                                            <div className="listing__contact--form-control">
                                                <Input
                                                    type="text"
                                                    placeholder="Name"
                                                    className="contact__form-control"
                                                />
                                            </div>
                                            <div className="listing__contact--form-control">
                                                <Input
                                                    type="text"
                                                    placeholder="Email Address"
                                                    className="contact__form-control"
                                                />
                                            </div>
                                            <div className="listing__contact--form-control">
                                                <Input
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    className="contact__form-control"
                                                />
                                            </div>
                                            <div className="listing__contact--form-control">
                                                <TextArea
                                                    placeholder="I am interested in 5 Bedroom House for Rent in Maria Luisa Park"
                                                    className="contact__form-control"
                                                    rows={4}
                                                />
                                            </div>
                                            <div className="listing__contact--form-btns">
                                                <div className="form__btn--send">
                                                    <Button className="btn-send">
                                                        Send Message
                                                    </Button>
                                                </div>
                                                <div className="form__btn--calculator">
                                                    <Button className="btn-calculator">
                                                        Loan Calculator
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <hr className="listing-preview--divider" />
                <div className="listing-preview--more-properties">
                    <div className="more__properties">
                        {
                            !isLoading && (
                                <MorePropertiesComponent
                                    title="More Properties"
                                    subtitle="Discover more house and lot options — find your dream home today!"
                                    propertyType={oneListing.PropertyType}
                                    saleType={oneListing.SaleType}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPreview;