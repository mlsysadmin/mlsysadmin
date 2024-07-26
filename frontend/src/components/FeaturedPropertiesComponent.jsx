import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Divider, Image, Row } from "antd";
import { FeaturedProperties } from "../utils/ListingMockData";
import { GetAllPublicListing } from "../api/GetAllPublicListings";
import { GetPhotoFromDB, GetPhotoLength } from "../utils/GetPhoto";
import "../styles/featuredProperties.css";
import sqm from "../asset/icons/outlined-sqm.png";
import shower from "../asset/icons/hotel-shower.png";
import bed from "../asset/icons/outlined-bed.png";

const FeaturedPropertiesComponent = ({}) => {
  const navigate = useNavigate();
  const [featuredList, setFeaturedList] = useState([]);

  const handleCardClick = (id) => {
    console.log("id", id);
    // window.location.href = `/previewListing/${id}`;
    navigate(`/previewListing/${id}`, { state: id });
  };

  const allPublicListing = async () => {
    const res = await GetAllPublicListing();
    const dataresp = res.data;
    setFeaturedList(dataresp);
    console.log("public listing:", dataresp);
  };
  // console.log( GetPhotoFromDB())
  console.log("getlength", GetPhotoLength());

  useEffect(() => {
    allPublicListing();
  }, []);

  // const Features = ({ features }) => {

  //     const featureLength = features.length;

  //     console.log(featureLength);

  //     return features.map((feature, i) => {
  //         return (
  //             <div className='featured' key={i}>
  //                 <div className="feature">
  //                     {/* <div> */}
  //                         <p>{feature.listings.unit_details.lot_area}</p>
  //                         <div className="feature-icon">
  //                             <img src={feature.icon} alt="feature-icon" width={27} />
  //                         </div>
  //                     {/* </div> */}
  //                 </div>
  //                 { i < features.length - 1 && <Divider type="vertical" className='featured-divider' />}
  //             </div>
  //         )
  //     })
  // }
  // const Features = ({ features }) => {
  //     return features.map((feature, i) => {
  //       const { no_of_beds, no_of_bathrooms, lot_area } = feature.listings.unit_details;

  //       return (
  //         <div className="featured" key={i}>
  //           <div className="feature">
  //             <div className="feature-items">
  //               {lot_area > 0 && (
  //                 <div className="feature-item">
  //                   <div className="feature-icon">
  //                     <img src={sqm} alt="area-icon" width={27} />
  //                   </div>
  //                   <p>{lot_area}</p>
  //                 </div>
  //               )}
  //               {no_of_bathrooms > 0 && (
  //                 <div className="feature-item">
  //                   <div className="feature-icon">
  //                     <img src={shower} alt="bathroom-icon" width={27} />
  //                   </div>
  //                   <p>{no_of_bathrooms}</p>
  //                 </div>
  //               )}
  //               {no_of_beds > 0 && (
  //                 <div className="feature-item">
  //                   <div className="feature-icon">
  //                     <img src={bed} alt="bed-icon" width={27} />
  //                   </div>
  //                   <p>{no_of_beds}</p>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //           {i < features.length - 1 && <Divider type="vertical" className="featured-divider" />}
  //         </div>
  //       );
  //     });
  //   };
  const Features = ({ features }) => {
    return (
      <div className="featured">
        {features.map((feature, i) => {
          const { no_of_beds, no_of_bathrooms, lot_area } =
            feature.listings.unit_details;

          return (
            <div className="feature" key={i}>
              <div className="feature-items">
                {lot_area > 0 && (
                  <div className="feature-item">
                    <div className="feature-icon">
                      <img src={sqm} alt="area-icon" width={27} />
                    </div>
                    <p>{lot_area}</p>
                  </div>
                )}
                {no_of_bathrooms > 0 && (
                  <div className="feature-item">
                    <div className="feature-icon">
                      <img src={shower} alt="bathroom-icon" width={27} />
                    </div>
                    <p>{no_of_bathrooms}</p>
                  </div>
                )}
                {no_of_beds > 0 && (
                  <div className="feature-item">
                    <div className="feature-icon">
                      <img src={bed} alt="bed-icon" width={27} />
                    </div>
                    <p>{no_of_beds}</p>
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

  return (
    <Row
      id="featured-properties"
      gutter={[16, { xs: 8, sm: 16, md: 32, lg: 48 }]}
    >
      {featuredList.every((featured) => !featured.isFeatured) ? (
        <div
          className="no-featured-item"
          style={{ fontSize: "18px", color: "var(--red)" }}
        >
          No Featured Items Available
        </div>
      ) : (
        featuredList.map((featured, i) => {
          if (featured.isFeatured) {
            return (
              <Col className="featured-property" key={i}>
                <div className="featured-img">
                  <Image
                    preview={false}
                    src={GetPhotoFromDB(featured.listings.photos.photo)}
                  />
                </div>
                <div className="featured-property--content">
                  <Card loading={false}>
                    <h4 className="featured-price">
                      {featured.listings.unit_details.price}
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
      )}
    </Row>
  );
};

export default FeaturedPropertiesComponent;
