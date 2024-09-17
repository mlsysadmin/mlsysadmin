import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Divider, Image, Row } from "antd";
import { FeaturedProperties } from "../utils/ListingMockData";
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";
import { GetPhotoFromDB, GetPhotoLength } from "../utils/GetPhoto";
import "../styles/featuredProperties.css";
import sqm from "../asset/icons/sqm2.png";
import shower from "../asset/icons/hotel-shower.png";
import bed from "../asset/icons/outlined-bed.png";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import SemiRoundBtn from "./custom/buttons/SemiRoundBtn.custom";

const FeaturedPropertiesComponent = ({ }) => {
  const navigate = useNavigate();
  const [featuredList, setFeaturedList] = useState([]);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [cardLength, setCardLength] = useState(0);

  const handleShowFeatures = useCallback(() => {
    const screen_width = window.screen.width;
    const screen_height = window.screen.height;

    console.log(window.screen);

    setScreenSize({
      width: screen_width,
      height: screen_height,
    });
  }, [setScreenSize])

  useEffect(() => {
    window.addEventListener("resize", handleShowFeatures);

    // return () => window.addEventListener("resize", handleShowNav);
  }, [])

  const handleCardClick = (id) => {
    // window.location.href = `/previewListing/${id}`;
    navigate(`/previewListing/${id}`, { state: id });
  };

  const allPublicListing = async () => {
    const res = await GetPropertiesBySaleStatus();
    const dataresp = res.data;
    setFeaturedList(dataresp);
  };

  useEffect(() => {
    // allPublicListing();
  }, []);


  const Features = ({ features }) => {
    return (
      <div className="featured">
        {features.map((feature, i) => {
          const { no_of_beds, no_of_bathrooms, lot_area } =
            feature.listings.unit_details;

          return (
            <div className="feature" key={i}>
              <div className="feature-items" key={i}>
                {lot_area > 0 && (
                  <div className="feature-item">
                    <p>{lot_area}</p>
                    <div className="feature-icon">
                      <img src={sqm} alt="area-icon" width={27} />
                    </div>
                  </div>
                )}
                {no_of_bathrooms > 0 && (
                  <div className="feature-item">
                    <p>{no_of_bathrooms}</p>
                    <div className="feature-icon">
                      <img src={shower} alt="bathroom-icon" width={27} />
                    </div>
                  </div>
                )}
                {no_of_beds > 0 && (
                  <div className="feature-item">
                    <p>{no_of_beds}</p>
                    <div className="feature-icon">
                      <img src={bed} alt="bed-icon" width={27} />
                    </div>
                  </div>
                )}
              </div>
              {features.length > 1 && i < features.length - 1 && (
                <Divider type="vertical" className="featured-divider" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const FeaturedCards = () => {
    let cardList;

    if (screenSize.width <= 600) {
      cardList = featuredList.slice(0, 1);
      setCardLength(cardList.length)
    } else {
      cardList = featuredList.slice(0, 6);
      setCardLength(cardList.length)
    }

    return (
      cardList.map((featured, i) => {
        if (!featured.isFeatured) {
          return (
            <Col className="featured-property" key={i} span={8}>
              <div className="featured-img">
                <Image
                  preview={false}
                  src={GetPhotoFromDB(featured.listings.photos.photo)}
                />
              </div>
              <div className="featured-property--content">
                <Card loading={false}>
                  <h4 className="featured-price">
                    PHP {AmountFormatterGroup(featured.listings.unit_details.price)}
                  </h4>
                  <p className="featured-title">{featured.listings.title}</p>
                  <p className="featured-listing-type">
                    {featured.listings.listing_type.listing_type}
                  </p>
                  <div className="featured-features">
                    {<Features features={[featured]} />}
                  </div>
                </Card>
              </div>
            </Col>
          );
        }
        return null;
      })
    )
  }

  return (
    <>
      <Row
        id="featured-properties"
      // gutter={[16, { xs: 8, sm: 16, md: 32, lg: 150 }]}
      >
        {
          featuredList.every((featured) => featured.isFeatured) ? (
            <div
              className="no-featured-item"
              style={{ fontSize: "18px", color: "var(--red)" }}
            >
              No Featured Properties Available
            </div>
          ) : <FeaturedCards />
        }
      </Row>
      <br />
      {
        cardLength == 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <SemiRoundBtn
              label={'See all featured properties'}
              style={{
                borderColor: '#D90000',
                color: '#D90000',
                height: '38px',
                fontWeight: '600'
              }}
              handleClick={() => navigate({
                pathname: '/featured'
              })}
            />
          </div>
        )
      }
    </>
  );
};

export default FeaturedPropertiesComponent;
