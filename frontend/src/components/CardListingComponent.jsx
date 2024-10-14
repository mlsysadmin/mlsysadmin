import { Button, Card, FloatButton, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import '../styles/cardListing.css';
import CustomImage from './custom/images/Image.custom';
import Sqm from '../asset/icons/meters.png';
import Shower from '../asset/icons/showerhead.png';
import FilterIcon from '../asset/icons/slider.png';
import CustomTag from './custom/tags/Tags.custom';
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";
import {Tooltip} from "antd";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto";
import { CameraFilled, HeartFilled, HeartOutlined } from '@ant-design/icons';

const CardListingComponent = ({ 
    loading, status, pics, title, price, features, 
    listingId, no_of_bathrooms, lot, img, handleClick, subtitle 
}) => {
    const [publiclisting, setPublicListing] = useState([])
    const [checked, setIsChecked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [showTooltip, setShowTooltip] = useState(false);

    const allPublicListing = async () => {
        const res = await GetPropertiesBySaleStatus();
        const dataresp = res.data
        setPublicListing(dataresp);

    }

    const ImageTag = () => (
        <div className='image-tag'>
            <CameraFilled />
            <p>{pics}</p>
        </div>
    )

    const Filter = () => (
        <div className="image-tag">
            <img src={FilterIcon} alt="filter-icon" />
        </div>
    )

    const Features = () => {
        // return features?.map((feature, i) => {
        //     return (
        //         <div className="feature-content" key={i}>
        //             <img src={Shower} alt="sqm" className='feature-icon' />
        //             <p className='feature-detail'>{feature.value}</p>
        //         </div>
        //     )
        // })
        // return (
        //     <div className="featured">
        //       {publiclisting.map((feature, i) => {
        //         const { no_of_beds, no_of_bathrooms, lot_area } = feature.listings.unit_details;

        //         return (
        //           <div className="feature" key={i}>
        //             <div className="feature-items">
        //               {lot_area > 0 && (
        //                 <div className="feature-item">
        //                   <div className="feature-icon">
        //                     <img src={Sqm} alt="area-icon" width={27} />
        //                   </div>
        //                   <p>{lot_area}</p>
        //                 </div>
        //               )}
        //               {no_of_bathrooms > 0 && (
        //                 <div className="feature-item">
        //                   <div className="feature-icon">
        //                     <img src={Shower} alt="bathroom-icon" width={27} />
        //                   </div>
        //                   <p>{no_of_bathrooms}</p>
        //                 </div>
        //               )}
        //             </div>
        //           </div>
        //         );
        //       })}
        //     </div>
        //   );
    }

    const handleChange = (isChecked, tag, listingId) => {

        // console.log("tag", tag);
        // console.log("check", isChecked);
        // setIsChecked(isChecked);

        const id = listingId;

        const nextSelectedTags = isChecked && !likes.includes(id) ?
            [...likes, id]
            :
            likes.filter((t) => t !== id);

        setLikes(nextSelectedTags);
        setIsChecked(isChecked);
        if (isChecked) {
					setShowTooltip(true);
					setTimeout(() => setShowTooltip(false), 800);
				}

    }


    return (
			<div id="card-listing">
				<Card
					// style={{
					//     width: 350,
					// }}
					size="small"
					bordered={false}
					loading={loading}
				>
					<div className="listing-image">
						<img src={img} className="property-img" onClick={handleClick}></img>
						<div className="tags">
							<CustomTag
								tagLabel={status}
								style={{
									backgroundColor: "#d90000",
									borderColor: "#d90000",
									color: "#ffffff",
								}}
							/>
							<CustomTag tagLabel={<ImageTag />} />
						</div>
						<div
							className="tags-right"
							style={{ display: "flex", flexDirection: "column" }}
						>
							<Tooltip
								color="var(--red)"
								title="Added to favorites"
								visible={showTooltip}
								placement="top"
							></Tooltip>
							<CustomTag
								tagLabel={checked ? <HeartFilled /> : <HeartOutlined />}
								style={{ fontSize: "23px", color: "#333333" }}
								className="circle-tags heart"
								checkable={true}
								checked={checked}
								handleChange={handleChange}
								listingId={listingId}
							/>{" "}
							{/* <CustomTag tagLabel={<Filter />} className="circle-tags" /> */}
						</div>
					</div>
					<div className="card-content" onClick={handleClick}>
						<div className="card-content--title">
							<h4>{title}</h4>
						</div>
						<div className="card-content--sub">
							<h5>{subtitle}</h5>
						</div>
						<Row className="card-content--subtitle">
							<p className="price">{price}</p>
							<div className="card-features">
								{/* <Features /> */}
								<div className="feature-content">
									<img
										src={Shower}
										alt="sqm"
										className="feature-icon"
										style={{ color: "#333333" }}
									/>
									<p className="feature-detail">{no_of_bathrooms}</p>
								</div>
								<div className="feature-content">
									<img src={Sqm} alt="sqm" className="feature-icon" />
									<p className="feature-detail">{lot} SqM</p>
								</div>
							</div>
						</Row>
					</div>
				</Card>
			</div>
		);
}

export default CardListingComponent