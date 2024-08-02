import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  Menu,
  Row,
  Space,
  Tag,
  Input,
  Select,
} from "antd";
import advSearch from "../assets/advSearch.png";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/dashboard.css";

import RoundBtn from "./custom/buttons/RoundBtn.custom";
import RoundInput from "./custom/inputs/RoundInput.custom";
import RoundSelect from "./custom/selects/RoundSelect.custom";
import CardListingComponent from "./CardListingComponent";
import FeaturedPropertiesComponent from "./FeaturedPropertiesComponent";
import RatingCarouselComponent from "./RatingCarouselComponent";
import SemiRoundBtn from "./custom/buttons/SemiRoundBtn.custom";

import { MockData } from "../utils/ListingMockData";
import CardCategory from "../utils/CardCategoryDashboard.utils";
import FuenteCircle from "../asset/banners/fuente-circle.png";
// import AdvanceSearch from "../asset/icons/advanceSearch.png";
import Search from "../asset/icons/Search.png";
import CustomMlFooter from "./custom/Custom.Mlfooter";
import FooterComponent from "./layout/FooterComponent";
import ListingSearchLoggedin from "./custom/customAdvanceSearchLoggedin/ListingSearchLoggedin";
import ListingSearch from "./custom/customsearch/custom.listingsearch";
// import CustomAdvanceSearch from "./custom/customsearch/custom.advancesearch";
import CertainFeatureMenu from "./custom/customsearch/certainfeature";
import { GetAllPublicListing } from "../api/GetAllPublicListings";
import { GetPhotoFromDB, GetPhotoLength } from "../utils/GetPhoto";
// import DashboardAdvanceSearch from

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const [publiclisting, setPublicListing] = useState([]);
  const [isAdvanceSearchOpen, setAdvanceSearchOpen] = useState(false);

  const { Option } = Select;
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [isAdvancedSearchOpenLoggedin, setAdvancedSearchOpenLoggedin] =
    useState(false);

  const handleAdvancedSearchClick = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };
  const handleAdvancedSearchCertainClick = () => {
    setAdvancedSearchOpenLoggedin(!isAdvancedSearchOpenLoggedin);
  };

  useEffect(() => {
    console.log(userLikes);
  });

  const navigate = useNavigate();
  const handleCardClick = (id) => {
    console.log("id", id);
    // window.location.href = `/previewListing/${id}`;
    navigate(`/previewListing/${id}`, { state: id });
  };
  // const handleCardClick = () => {
  //   navigate('/previewListing');
  // };

  const allPublicListing = async () => {
    const res = await GetAllPublicListing();
    const dataresp = res.data;
    setPublicListing(dataresp);
    console.log("public listing:", dataresp);
  };
  useEffect(() => {
    allPublicListing();
  }, []);

  const url_Redirect = process.env.REACT_APP_LOGIN_URL;
  const handleUserProfileClick = () => {
    if (url_Redirect) {
      window.location.href = url_Redirect;
    }
  };

  const tags = [
    {
      key: "all",
      label: "All",
      link: "",
    },
    {
      key: "new",
      label: "New Listing",
      link: "",
    },
    {
      key: "featured",
      label: "Featured",
      link: "",
    },
    {
      key: "for-sale",
      label: "For Sale",
      link: "",
    },
    {
      key: "for-rent",
      label: "For Rent",
      link: "",
    },
    {
      key: "mortgage",
      label: "Mortgage",
      link: "",
    },
  ];

  const Tags = () => (
    <Menu
      className="menu-tags"
      mode="horizontal"
      items={tags}
      selectedKeys={"all"}
    />
  );
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 480,
        min: 315,
      },
      items: 1,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 481,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  const CardCategories = () => {
    return CardCategory.map((item, i) => {
      return (
        <Col key={i}>
          <Card
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="overlay-content">
              <div className="overlay-icon">
                <span>
                  <Image src={item.icon} preview={false} height={30} />
                </span>
              </div>
              <div className="overlay-title">{item.category}</div>
              <div className="overlay-description">{item.decription}</div>
            </div>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div className="dashboard">
      <div id="dashboard">
        <div className="banner">
          <div className="banner-content">
            <Col className="banner-title">
              <h1>Find Your Dream Home</h1>
            </Col>
            <Col className="banner-tags">
              <Tags />
            </Col>

            <div className="dashboard-first-content">
              <div className="dashboard-sub-content1">
                <div className="dashboard-subcontent-inputs">
                  <Input
                    className="dashboard-input-field"
                    placeholder="Enter keyword"
                    style={{
                      padding: "5px",
                      borderBottom: "1px solid rgba(140, 144, 148, 0.52)",
                      outline: "none",
                    }}
                  />
                  <Select
                    className="dashboard-select-fields custom-select"
                    placeholder="Location"
                    dropdownClassName="ant-select-dropdown custom-dropdown"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    suffixIcon={
                      <CaretDownOutlined style={{ color: "#808080" }} />
                    } // Custom icon
                  >
                    <Option value="all-locations">All Locations</Option>
                    <Option value="Cebu City">Cebu City</Option>
                    <Option value="Manila">Manila</Option>
                  </Select>
                  <Select
                    className="dashboard-select-fields custom-select"
                    placeholder="Property Type"
                    dropdownClassName="ant-select-dropdown custom-dropdown"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    suffixIcon={
                      <CaretDownOutlined style={{ color: "#808080" }} />
                    } // Custom icon
                  >
                    <Option value="">All Types</Option>

                    <Option value="commercial" style={{ color: "red" }}>
                      COMMERCIAL
                    </Option>
                    <Option value="service-office">Service Office</Option>
                    <Option value="shop-retail-commercial">Shop/Retail</Option>
                    <Option value="commercial-land-lot">
                      Commercial Land/Lot
                    </Option>

                    <Option value="residential" style={{ color: "red" }}>
                      RESIDENTIAL
                    </Option>
                    <Option value="condominium">Condominium</Option>
                    <Option value="shop-retail-residential">Shop/Retail</Option>
                    <Option value="residential-land-lot">
                      Residential Land/Lot
                    </Option>

                    <Option value="industrial" style={{ color: "red" }}>
                      INDUSTRIAL/ETC
                    </Option>
                    <Option value="warehouse">Warehouse</Option>
                    <Option value="farm-lot">Farm Lot</Option>
                    <Option value="hotel-resort">Hotel/Resort</Option>
                  </Select>
                  <Select
                    className="dashboard-select-fields custom-select"
                    placeholder="Listing Type"
                    dropdownClassName="ant-select-dropdown custom-dropdown"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    suffixIcon={
                      <CaretDownOutlined style={{ color: "#808080" }} />
                    } // Custom icon
                  >
                      <Option >All Types</Option>
                    <Option value="for-sale">For Sale</Option>
                    <Option value="for-rent">For Rent</Option>
                    <Option >Pre-Selling</Option>
                  </Select>
                  <Select
                    className="dashboard-select-fields custom-select"
                    placeholder="Features"
                    dropdownClassName="ant-select-dropdown custom-dropdown"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    suffixIcon={
                      <CaretDownOutlined style={{ color: "#808080" }} />
                    }
                  ></Select>
                  {/* <Button
                    className="dashboard-right-button-advanced"
                    onClick={handleAdvancedSearchClick}
                  >
                    <img
                      src={advSearch}
                      alt="Advanced Search"
                      style={{ width: "30px" }}
                    />
                    <span>Advanced Search</span>
                  </Button> */}
                  <Button
                    className="dashboard-right-button"
                    icon={<SearchOutlined />}
                  >
                    <span>Search</span>
                  </Button>
                </div>
                {/* {isAdvancedSearchOpen && <DashboardAdvanceSearch />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="discover">
        <Row className="discover-content">
          <Col className="discover-section--title">
            <h2>Discover Latest Properties</h2>
            <p>Newest Properties Around You</p>
          </Col>
        </Row>
        <div className="listing-carousel" style={{ cursor: "pointer" }}>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            dotListClass=""
            draggable
            focusOnSelect={false}
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            slidesToSlide={1}
            swipeable
            responsive={responsive}
            className="card-listing--carousel"
            containerClass="container-carousel"
            infinite
            itemClass="carousel-item"
            transitionDuration={300}
            sliderClass="carousel-slider-ul"
          >
            {publiclisting.map((item, i) => {
              return (
                <CardListingComponent
                  title={item.listings.title}
                  price={`PHP ${item.listings.unit_details.price}`}
                  status={item.listings.listing_type.listing_type}
                  pics={GetPhotoLength(item.listings.photos.photo)}
                  features={item.features}
                  img={GetPhotoFromDB(item.listings.photos.photo)}
                  no_of_bathrooms={item.listings.unit_details.no_of_bathrooms}
                  lot={item.listings.unit_details.lot_area}
                  key={i}
                  listingId={item.listings.listing_id}
                  loading={loading}
                  handleClick={() => handleCardClick(item.listings.listing_id)}
                />
              );
            })}
          </Carousel>
        </div>
        <div className="see-more--container">
          <a href="/new">
            <SemiRoundBtn
              label={"SEE MORE NEW LISTINGS"}
              size="large"
              className="see-more--btn"
            />
          </a>
        </div>
        <div className="discover--section-2">
          <h3>Helping you buy, rent and sell in Real Estate</h3>
          <Row className="card--brokerage-category" gutter={[16, 16]}>
            <CardCategories />
          </Row>
        </div>
        <div className="discover--section-3">
          <div className="card--brokerage-inquire">
            <div className="inquire-image">
              <Image src={FuenteCircle} preview={false} />
            </div>
            <div className="inquire-container">
              <div className="inquire--content">
                <div className="inquire--title">
                  <h3>Thinking about selling your Home?</h3>
                </div>
                <div className="inquire--description">
                  <p>
                    Don't let selling your property become a burden. Join our
                    platform today and exprience the ease and convenience of
                    selling with us
                  </p>
                </div>
                <div className="inquire--sub-desc">
                  <p>
                    Sign up now and take the first step toward a successful
                    property sale!
                  </p>
                </div>
                <div className="inquire--actions">
                  <a href="/contact-us">
                    <RoundBtn
                      label={"Contact us"}
                      type={"default"}
                      className="contact-us--action action-btn"
                      size={"large"}
                    />
                  </a>
                  <RoundBtn
                    label={"Sign in"}
                    type={"default"}
                    className="sign-in--action action-btn"
                    size={"large"}
                    onClick={handleUserProfileClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="discover--section-4">
          <div className="card--brokerage-featured">
            <div className="featured-container">
              <div className="featured--title">
                <h3>Featured Properties</h3>
              </div>
              <div className="featured--content">
                <FeaturedPropertiesComponent />
              </div>
            </div>
          </div>
        </div>
        <div className="ratings">
          <div className="rating-container">
            <div className="rating--title">
              <h3>What Our Clients are Saying?</h3>
            </div>
            <div className="rating--content">
              <RatingCarouselComponent />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <CustomMlFooter />
      <FooterComponent />
    </div>
  );
};

export default DashboardComponent;
