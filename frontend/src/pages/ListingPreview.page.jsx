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

import { GetPublicListingByID, GetUnitPhotos } from "../api/GetAllPublicListings";
import { useLocation } from "react-router-dom";
import { Button, Input, Modal, Table, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "../components/mapComponent";
import MorePropertiesComponent from "../components/MorePropertiesComponent";
import { CapitalizeEachWord, CapitalizeString } from "../utils/StringFunctions.utils";
import { GetAllFeaturesByPropertyNo } from "../api/GetAllAmenities";
import PreviewLoadingModal from "../components/modals/PreviewLoadingModal";
import { FormatLocation } from "../utils/LocationDateFormatter";
import ViewPhotoGallery from "../components/ViewPhotoGalleryComponent";
import { CustomMlFooter, FooterComponent } from "../components";

const ListingPreview = () => {
    const location = useLocation();

    const [oneListing, setOneListing] = useState(null);
    const [features, setFeatures] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [includes, setIncludes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [unitPhotos, setUnitPhotos] = useState([]);
    const [galleryLength, setGalleryLength] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [loadingModal, setLoadingmodal] = useState(true);
    const [checked, setIsChecked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [showTooltip, setShowTooltip] = useState(false);
    const [aboutFeatures, setAboutFeatures] = useState([]);

    useEffect(() => {
        console.log("dsdsfdgdgf");
        getlistingByID();

        if (oneListing) {
            FilterFeature(oneListing.PropertyType);
        }
    }, []);

    useEffect(() => {
        if (oneListing) {
            FilterFeature(oneListing.PropertyType);
        }
    }, [oneListing]);

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
                    const features = await GetFeaturesByPropertyNo(dataresp.PropertyNo);
                    const photos = await UnitPhotos(dataresp.id);

                    let photo = dataresp.Photo;
                    if (photos.length !== 0) {
                        let gallery;

                        gallery = photos.map((item, i) => {
                            return item.Photo;
                        });

                        gallery.unshift(photo);

                        console.log("gallery", gallery);

                        setUnitPhotos(gallery);
                        setGalleryLength(gallery.length)

                    } else {
                        setUnitPhotos([photo]);
                        setGalleryLength(1)
                    }

                    const getFeatures = features.filter(
                        (item) => item.Type === "features"
                    );
                    const getAmenities = features.filter(
                        (item) => item.Type === "amenities"
                    );
                    const getIncludes = features.filter(
                        (item) => item.Type === "includes"
                    );
                    dataresp.Price = Number(dataresp.Price).toLocaleString('en', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });

                    setOneListing(dataresp);
                    setFeatures(getFeatures);
                    setAmenities(getAmenities);
                    setIncludes(getIncludes);
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
    const GetFeaturesByPropertyNo = async (propertyNo) => {
        try {
            const resFeatures = await GetAllFeaturesByPropertyNo(propertyNo);

            return resFeatures.data;
        } catch (error) {
            console.log("Get Features: ", error);

            return [];
        }
    };
    const UnitPhotos = async (propertyId) => {
        try {
            console.log(propertyId);

            const res = await GetUnitPhotos(propertyId);

            return res.data;
        } catch (error) {
            setUnitPhotos([]);
        }
    };

    const FilterFeature = (property_type) => {
        const feat = [
            {
                title: "Bedrooms",
                iconSrc: <BedOutlinedIcon />,
                value: oneListing.BedRooms,
            },
            {
                title: "Bathrooms",
                iconSrc: <ShowerOutlinedIcon />,
                value: oneListing.BathRooms,
            },
            {
                title: "Garage",
                iconSrc: <DirectionsCarFilledOutlinedIcon />,
                value: oneListing.Parking,
            },
            {
                title: "Area",
                iconSrc: <ShortcutOutlinedIcon />,
                value: `${oneListing.LotArea} Sqm`
            },
            {
                title: "Price per SqM",
                iconSrc: <PhpOutlinedIcon />,
                value: Number(oneListing.PricePerSqm).toLocaleString('en', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),
            },
        ];
        // setFeatures(feat);

        let feature = [];

        try {
            if ((property_type.toLowerCase().includes("lot") && !property_type.toLowerCase().includes("house")) || property_type.toLowerCase().includes("office")) {
                feature = feat.filter((item, i) =>
                    ["price per sqm", 'area'].includes(item.title.toLocaleLowerCase())
                );
            }
            else if (property_type.toLowerCase().includes("lot") && property_type.toLowerCase().includes("house")) {
                feature = feat;
            }
            else {
                feature = feat.filter(
                    (item, i) => !["price per sqm"].includes(item.title.toLocaleLowerCase())
                );
            }

            setAboutFeatures(feature);
        } catch (error) {
            console.log("error", error);

            setAboutFeatures([]);
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
    const HandleViewGallery = () => {
        console.log('Gallery View');
        setOpen(true)
        setTimeout(() => {
            setLoadingmodal(false);
        }, 1000);
    }
    const HandleChangeHeart = (isChecked, tag, id) => {
        console.log("dsfdgdg");

        const nextSelectedTags =
            isChecked && !likes.includes(id)
                ? [...likes, id]
                : likes.filter((t) => t !== id);

        setLikes(nextSelectedTags);
        setIsChecked(isChecked);

        if (isChecked) {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 800);
        }
    };

    const FeaturesTables = () => {
        try {
            console.log("features", features);
            const headers = features.length > 0 ? Object.keys(features[0]) : [];

            const groupedData = [];
            for (let i = 0; i < features.length; i += 4) {
                groupedData.push(features.slice(i, i + 4));
            }

            return (
                <table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Column 1</th>
                            <th style={{ textAlign: 'center' }}>Column 2</th>
                            <th style={{ textAlign: 'center' }}>Column 3</th>
                            <th style={{ textAlign: 'center' }}>Column 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((item, colIndex) => (
                                    <td key={colIndex} style={{ textAlign: 'center', padding: '8px' }}>
                                        {item.FeatureName}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        } catch (error) {
            console.log("FeaturesTables", error);

        }
    }

    return (
        <>
            {
                isLoading ? (
                    <PreviewLoadingModal />
                ) : oneListing && (
                    <>
                        <div className="listing-preview">
                            <div className="listing-preview--container">
                                <div className="listing-preview__image">
                                    <ImagePreviewComponent
                                        gallery={unitPhotos}
                                        handleViewGallery={HandleViewGallery}
                                    />
                                </div>
                                <div className="listing-preview--tags">
                                    <div className="tag--top">
                                        <div className="listing-preview--tag">
                                            <div className="tag-icon">
                                                <img src={RedCamera} alt="Red Camera" />
                                            </div>
                                            <div className="tag-value">
                                                <div className="tag-value--text">
                                                    {galleryLength}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tag--bottom">
                                        <div className="listing-preview--tag-wrapper">
                                            <div className="listing-preview--tag tag__sale-type">
                                                <div className="tag-value--text">
                                                    <p>For {CapitalizeString(oneListing.SaleType)}</p>
                                                </div>
                                            </div>
                                            <div className="listing-preview--tag tag__price">
                                                <div className="tag-value--text">
                                                    <p>PHP {oneListing.Price}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="listing-preview--tag-wrapper">
                                            <Tooltip
                                                color="var(--red)"
                                                title="Added to favorites"
                                                open={showTooltip}
                                                className="preview-listing__tooltip"
                                            ></Tooltip>
                                            <div className="listing-preview--tag tag__btn" onClick={HandleChangeHeart}>
                                                <div className="tag-icon">
                                                    {
                                                        checked
                                                            ? <HeartFilled className="tag-icon__heart" />
                                                            : <HeartOutlined className="tag-icon__heart" />
                                                    }

                                                </div>
                                                <div className="tag-value">
                                                    <div className="tag-value--text">
                                                        <p>Save</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="listing-preview--tag tag__btn" onClick={HandleViewGallery}>
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
                                            <h4>{oneListing.UnitName}</h4>
                                            <p>
                                                {FormatLocation(
                                                    oneListing.City,
                                                    oneListing.ProvinceState,
                                                    oneListing.Country
                                                )}
                                            </p>
                                            <p className="listing-preview__listing-pre-approved">
                                                <a href="/pre-approved">Get Pre-Approved</a>
                                            </p>
                                        </section>
                                        <section className="listing-preview__listing-about">
                                            <h4>About this property</h4>
                                            <div className="listing-preview__listing-about--items">
                                                {
                                                    aboutFeatures.map((feature, index) => {
                                                        // if (feature.value && feature.value !== "0") {

                                                        return (
                                                            <div className="listing-preview__listing-about--item">
                                                                <div className="listing-preview__listing-about-item--title">
                                                                    <p>{feature.title}</p>
                                                                </div>
                                                                <div className="listing-preview__listing-about-item--value">
                                                                    {feature.iconSrc}
                                                                    <p>{feature.value}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </section>
                                        <section className="listing-preview__listing--description">
                                            <h4>Description</h4>
                                            <div className="listing-preview__listing-description">
                                                <p>
                                                    {oneListing.Details}
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
                                                {/* <Table
                                                    columns={columnsFeatures}
                                                    dataSource={dataFeatures}
                                                    pagination={false}
                                                    size="middle"
                                                    rowHoverable={false}
                                                /> */}
                                                {
                                                    FeaturesTables()
                                                }

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
                                                <>
                                                    <MorePropertiesComponent
                                                        title={`More Properties For ${CapitalizeString(oneListing.SaleType)}`}
                                                        subtitle={`Discover more ${CapitalizeEachWord(oneListing.PropertyType)} options — find your dream home today!`}
                                                        propertyType={oneListing.PropertyType}
                                                        saleType={oneListing.SaleType}
                                                        filterValue={oneListing.PropertyType}
                                                        filterProperty={['PropertyType']}
                                                    />
                                                    <MorePropertiesComponent
                                                        title="More Properties Nearby"
                                                        subtitle={`Discover more ${CapitalizeEachWord(oneListing.PropertyType)} options in ${CapitalizeEachWord(oneListing.City)} — find your dream home today!`}
                                                        propertyType={oneListing.PropertyType}
                                                        saleType={oneListing.SaleType}
                                                        filterValue={oneListing.City}
                                                        filterProperty={['City']}
                                                    />
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listing-preview__modal-container">
                            <Modal
                                // loading={loadingModal}
                                open={open}
                                onCancel={() => setOpen(false)}
                                className="listing-preview__modal"
                                footer={null}
                                wrapClassName="listing-preview__modal-wrapper"
                            >
                                <ViewPhotoGallery
                                    photos={unitPhotos}
                                />
                            </Modal>
                        </div>
                        <div className="preview--footer">
                            <CustomMlFooter />
                            <FooterComponent />
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ListingPreview;