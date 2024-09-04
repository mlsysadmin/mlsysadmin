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
  Dropdown,
} from "antd";
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
import AdvanceSearch from "../asset/icons/advanceSearch.png";
import Search from "../asset/icons/Search.png";
import CustomMlFooter from "./custom/Custom.Mlfooter";
import FooterComponent from "./layout/FooterComponent";

import CustomAdvanceSearch from "./custom/customsearch/custom.advancesearch";
import CertainFeatureMenu from "./custom/customsearch/certainfeature";
import { GetAllPublicListing } from "../api/GetAllPublicListings";
import { GetPhotoFromDB, GetPhotoLength } from "../utils/GetPhoto";
import { Link } from "react-router-dom";
import {Select} from "antd";
import { GetProvince } from "../api/Public/Location.api";

const {Option} = Select;

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const [publiclisting, setPublicListing] = useState([]);
  const [isAdvanceSearchOpen, setAdvanceSearchOpen] = useState(false);
  const [iscertainFeatureOpen, setcertainFeatureOpen] = useState(false);

  const handleCertainFeatureClick = () => {
    setcertainFeatureOpen(!iscertainFeatureOpen);
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


  const [getProvince, setGetProvince] = useState([]);

  const allProvinces = async () => {
		try {
			const dataprovince = await GetProvince(); 
			setGetProvince(dataprovince);
      console.log("province", dataprovince)
		} catch (error) {
			console.error("Error fetching provinces:", error);
		}
	};

	useEffect(() => {
		allProvinces();
	}, []);

  const newListings = publiclisting.filter(
    (item) => item.listings.listing_type.listing_type === "For Sale"
  );
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
      link: "/all",
    },
    {
      key: "new",
      label: "New Listing",
      link: "/new",
    },
    {
      key: "featured",
      label: "Featured",
      link: "/featured",
    },
    {
      key: "for-sale",
      label: "For Sale",
      link: "/all",
    },
    {
      key: "for-rent",
      label: "For Rent",
      link: "/rent",
    },
    {
      key: "mortgage",
      label: "Mortgage",
      link: "/mortgage",
    },
  ];

  const Tags = () => (
    <Menu className="menu-tags" mode="horizontal" selectedKeys={["all"]}>
      {tags.map((tag) => (
        <Menu.Item key={tag.key}>
          {tag.link ? <Link to={tag.link}>{tag.label}</Link> : tag.label}
        </Menu.Item>
      ))}
    </Menu>
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
              // backgroundImage: `url(${item.image})`,
              backgroundColor: "#ffffff",
            }}
          >
            <div className="overlay-content">
              <div className="overlay-icon">
                {/* <span>
                  <Image src={item.icon} preview={false} height={30} />
                </span> */}
              </div>
              <div className="overlay-title">{item.category}</div>
              <div className="overlay-description">{item.decription}</div>
              <div className="button-card-class">{item.buttonTitle}</div>
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
						<Col className="banner-search">
							<Card>
								<Row className="search-container">
									<RoundInput
										placeholder="Enter keyword"
										size="middle"
										classname="card-item field"
									/>
									<RoundSelect
										placeholder="Location"
										size="middle"
										classname="card-item field"
										suffixIcon={<CaretDownOutlined />}
									>
										{getProvince.map((province, index) => (
											<Select.Option key={index} value={province.name}>
												{province.name}
											</Select.Option>
										))}
									</RoundSelect>
									<RoundSelect
										placeholder="Property Type"
										size="middle"
										classname="card-item field"
										suffixIcon={<CaretDownOutlined />}
									/>
									<RoundSelect
										placeholder="Listing Type"
										size="middle"
										classname="card-item field"
										suffixIcon={<CaretDownOutlined />}
									/>
									{/* <RoundSelect
                    placeholder="Features"
                    size="middle"
                    classname="card-item field"
                    suffixIcon={<CaretDownOutlined />}
                    overlay={<CertainFeatureMenu />}
                  /> */}
									<Dropdown
										classname="card-item field"
										overlay={<CertainFeatureMenu />}
										trigger={["click"]}
										visible={iscertainFeatureOpen}
										onVisibleChange={handleCertainFeatureClick}
									>
										<Button
											className="card-item field"
											onClick={handleCertainFeatureClick}
											style={{ color: "#8C9094" }}
										>
											Features <CaretDownOutlined />
										</Button>
									</Dropdown>
									<Row className="">
										{/* <RoundBtn
											label={"Advanced"}
											className="advanced round-btn"
											icon={
												<>
													<img
														src={AdvanceSearch}
														onClick={handleAdvancedSearchClick}
														className="search-icon"
														style={{ fontWeight: "900" }}
														width={27}
													/>
													
												</>
											}
											classname="card-item"
											onClick={handleAdvancedSearchClick}
										/> */}
										<RoundBtn
											label={"Search"}
											className="search round-btn"
											icon={
												<img
													src={Search}
													className="search-icon"
													style={{ fontWeight: "900" }}
													width={20}
												/>
											}
											classname="card-item"
										/>
									</Row>
								</Row>
								{isAdvanceSearchOpen && <CertainFeatureMenu />}
							</Card>
						</Col>
					</div>
				</div>
			</div>
			<div className="discover">
				{/* <Row className="discover-content">
					<Col className="discover-section--title">
						<h2>Discover Latest Properties</h2>
						<p>Newest Properties Around You</p>
					</Col>
				</Row>
				<div className="listing-carousel" style={{ cursor: "pointer" , display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
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
				</div> */}
				<Row className="discover-content">
					<Col className="discover-section--title">
						<h2>Discover Latest Properties</h2>
						<div className="section-2-title">
							{newListings.length > 0 ? (
								<p>Newest Properties Around You</p>
							) : (
								<p>No New Listings Available</p>
							)}
							<div className="see-all-new-listing-dashboard">
								<a href="/all" style={{ color: "#8C9094" }}>
									See All
								</a>
							</div>
						</div>
					</Col>
				</Row>
				{newListings.length > 0 && (
					<div className="listing-carousel-dashboard">
						{newListings.slice(0, 3).map((item, i) => {
							return (
								<CardListingComponent
									title={item.listings.title}
									price={`PHP ${item.listings.unit_details.price}`}
									status={
										item.listings.listing_type.listing_type === "For Sale"
											? "NEW"
											: item.listings.listing_type.listing_type
									}
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
					</div>
				)}
				{/* <div className="see-more--container">
					<a href="/new">
						<SemiRoundBtn
							label={"SEE MORE NEW LISTINGS"}
							size="large"
							className="see-more--btn"
						/>
					</a>
				</div> */}
				<div className="discover--section-2">
					<h3>Helping you buy, rent and sell in Real Estate</h3>
					<Row className="card--brokerage-category" gutter={[50, 50]}>
						<CardCategories />
					</Row>
					<div className="discover--section-3">
						<div className="card--brokerage-inquire">
							{/* <div className="inquire-image">
								<Image src={FuenteCircle} preview={false} />
							</div> */}
							<div className="inquire-container">
								<div className="inquire--content">
									<div className="inquire--title">
										<h3>Thinking about selling your Home?</h3>
									</div>
									<div className="inquire--description">
										<p>
											Sell your property with ease. Join our platform today for
											a convenient selling experience.
										</p>
									</div>
									<div className="inquire--sub-desc">
										<p>Sign in and start your successful sale!</p>
									</div>
									<div className="inquire--actions">
										{/* <a href="/contact-us">
											<RoundBtn
												label={"Contact us"}
												type={"default"}
												className="contact-us--action action-btn"
												size={"large"}
											/>
										</a> */}
										<RoundBtn
											label={"Sign in your ML Wallet Account"}
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
					<br />
					<br />
					<br />
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
